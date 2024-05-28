from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
from bs4 import BeautifulSoup
import pandas as pd
from tqdm import tqdm
import time
import re

# 연결 방식
def get_connect(text):
    if "유선+무선" in text:
        return "BOTH"
    elif "유선" in text:
        return "WIRE"
    elif "무선" in text:
        return "WIRELESS"
    
# DPI 값을 찾기 위한 정규 표현식 패턴 (DPI 앞의 숫자)
dpi_pattern = re.compile(r'\b\d+DPI\b')

# 규격 값을 찾기위한 정규 표현식 패턴 (mm 앞의 숫자)
size_pattern = re.compile(r'\b\d+mm\b')

# 무게 값을 찾기 위한 정규 표현식 패턴 (g 앞의 숫자)
weight_pattern = re.compile(r'\b\d+g\b')

# 상품 정보 추출 함수 (제품명, 가격, 이미지, 제조사, 주소, 연결 방식, 연결 인터페이스, 종류, dpi, 색상, 무게, 가로길이, 세로길이, 높이)
def get_prod_items(prod_items):
    prod_data = []
    # 마지막 데이터는 필요없는 값으로 제외
    for prod_item in prod_items[:-1]:
        try:
            # 제품 구매 url 추출
            prod_url = prod_item.select_one('a.thumb_link')['href']

            # # img 데이터 추출
            img_tag = prod_item.select_one('a.thumb_link > img')
            prod_img = img_tag.get('data-original') or img_tag.get('src')
            prod_img = 'https:' + prod_img

            # prod_name에 제조사와 제품명이 함께있음 -> 분리
            title = prod_item.select('p.prod_name > a')[0].text.split(" ", 1)
            company_name = re.sub(r'[\n\t]+', '', title[0])
            product_name = re.sub(r'[\n\t]+', '', title[1])
            # print("product_name : ", product_name)

            # spec 정보 가져오기
            spec_text = prod_item.select('div.spec_list')[0].text
            spec_list = spec_text.split('/')
            is_bluetooth = False
            is_receiver = False
            size = []
            mouse_type = '일반'
            connect=None
            weight = None
            dpi_value = None
            is_sound = True
            for spec in spec_list:
                if '연결 방식:' in spec : 
                    connect = get_connect(spec)
                elif '버티컬' in spec:
                    mouse_type = '버티컬'
                elif '게이밍' in spec:
                    mouse_type = '게이밍'
                elif '블루투스' in spec:
                    is_bluetooth = True
                elif '리시버' in spec:
                    is_receiver = True
                elif '무소음' in spec:
                    is_sound=False
                elif 'DPI' in spec:
                    if not isinstance(dpi_value, int):
                        dpi_value = re.search(r'\b(\d+)DPI\b', spec)
                        if dpi_value:
                            dpi_value = int(dpi_value.group(1))
                        else:
                            dpi_value = None
                elif 'mm' in spec:
                    size_value = re.search(r'\b(\d+(\.\d+)?)mm\b', spec)
                    if size_value:
                        size.append(size_value.group(1))
                elif 'g' in spec:
                    if weight is None:
                        weight = re.search(r'\b(\d+(\.\d+)?)g\b', spec)
                        if weight:
                            weight = weight.group(1)
                        else:
                            weight = None

            if len(size) < 3:
                continue
            
            interface = None
            if is_bluetooth and is_receiver:
                interface = 'BOTH'
            elif is_bluetooth:
                interface = 'BLUETOOTH'
            elif is_receiver:
                interface = 'RECEIVER'
            else :
                interface = None

            
            price_list = prod_item.select('div.prod_pricelist')
            product_info = []
            is_saved = False
            for item in price_list:
                for li in item.find_all('li'):
                    if is_saved : continue
                    color = li.find('p', class_='memory_sect').get_text(strip=True)
                    if '화이트' in color:
                        color = '화이트'
                    elif '핑크' in color:
                        color = '핑크'
                    elif '레드' in color:
                        color = '레드'
                    elif '블루' in color:
                        color = '블루'   
                    elif '그레이' in color:
                        color = '그레이'   
                    elif '블랙' in color:
                        color = '블랙'
                    else:
                        color = '기타'
                        is_saved = True
                    price = li.find('p', class_='price_sect').strong.get_text(strip=True)
                    price = int(price.replace(',', ''))
                    product_info.append({'color': color, 'price': price})

                    prod_data.append(['MOUSE', product_name, company_name, prod_url, prod_img, price, mouse_type, connect, interface, dpi_value, size[1], size[0], size[2], weight, color, is_sound])
        except:
            continue

        
        # print(product_info)

        # print("spec : ", connect, " / ", mouse_type, " / ", interface, " / ", dpi_value, " / ", size, " / ", weight)
        

    return prod_data

def text_to_value(pattern, text):
    match = re.search(pattern, text)
    if match:
        # 괄호 안의 숫자 출력
        return(match.group(1))
    else: 
        return (0)

# url 설정
url = 'https://prod.danawa.com/list/?cate=112787&15main_11_02='
total_page = 40
prod_data_total = []

# 웹드라이버 설정 및 URL 접속
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
driver.get(url)
time.sleep(2)  # 페이지가 완전히 로드될 때까지 잠시 대기

# 각 페이지별로 상품 정보를 수집
for page in tqdm(range(1, total_page + 1)):
    # 현재 페이지의 HTML을 가져옴
    html = driver.page_source
    soup = BeautifulSoup(html, 'html.parser')

    prod_items = soup.select('div.main_prodlist > ul.product_list > li.prod_item')
    prod_item_list = get_prod_items(prod_items)

    prod_data_total += prod_item_list

    # 마지막 페이지가 아니라면 다음 페이지로 이동
    if page < total_page:
        move_script = f"movePage({page+1})"
        driver.execute_script(move_script)
        time.sleep(2)  # 페이지 이동 후 잠시 대기

# # DataFrame 생성 및 Excel 파일로 저장
# data = pd.DataFrame(prod_data_total, columns=['제품 타입', '상품명', '제조사', '구매링크', '이미지', '가격', '종류', '연결 방식', '연결 인터페이스', 'dpi', '가로길이', '세로길이', '높이', '무게', '색상', '소음'])
# data.to_excel('./mouse_final.xlsx', index=False)

driver.close() # 브라우저 닫기

# MySQL에 저장
import mysql.connector


#MySQL 서버 연결 정보
config = {
    'user': 'username',
    'password': 'password',
    'host': 'url',
    'port': 3306,
    'database': 'database',
}

# MySQL 서버에 연결
conn = mysql.connector.connect(**config)

# 커서 생성
cursor = conn.cursor()

# 데이터 삽입 쿼리
query = "INSERT INTO product (product_type, product_name, product_brand, product_url, product_img, product_price, mouse_type, mouse_connect, mouse_interface, mouse_dpi, mouse_width, mouse_length, mouse_height, mouse_weight, mouse_color, mouse_is_sound) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"

# 쿼리 실행
for data in prod_data_total:
    # print(data)
    cursor.execute(query, data)

# 변경 사항 커밋
conn.commit()

# 연결 종료
conn.close()