from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
from bs4 import BeautifulSoup
import pandas as pd
from tqdm import tqdm
import time
import re

# 화면 크기에서 인치 값 추출 (68.5cm(27인치) -> 27)
size_pattern = r"\((\d+)인치\)"
# 화면 비율에서 비율만 추출 (와이드(16:9) -> 16:9)
aspect_ratio_pattern = r"(\d+:\d+)"

# 패널 형태
def panel_form_kor_to_eng(panel):
    # 패널 형태 값에 따라 'FLAT' 또는 'CURVED'로 변환
    if panel == '평면':
        return('FLAT')
    elif panel == '커브드':
        return('CURVED')

# 패널 종류 
def panel_fommating(panel):
    if 'IPS' in panel:
        return 'IPS'
    elif 'VA' in panel:
        return 'VA'
    elif 'TN' in panel:
        return 'TN'
    elif 'OLED' in panel:
        return 'OLED'

# 주사율
refresh_rate_pattern = r"\((\d+)Hz\)"

# 상품 정보 추출 함수
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

            # spec_list 중 span.cm_mark 처리된 데이터만 필요
            spec_list = prod_item.select('div.spec_list > span.cm_mark')
            
            # 주사율에 Hz문자가 없는 경우(이전의 데이터가 제외된 경우) 제외
            size = text_to_value(size_pattern, spec_list[0].text) # 화면 크기
            if size == 0 : 
                continue

            aspect_ratio = text_to_value(aspect_ratio_pattern, spec_list[1].text) # 화면 비율
           
            panel_type = panel_fommating(spec_list[2].text) # 패널 종류
            
            panel_form = panel_form_kor_to_eng(spec_list[3].text) # 패널 형태

            resolution = spec_list[4].text # 해상도
            
            refresh_rate = spec_list[5].text # 주사율
            
            price_temp = re.findall(r'\d+', prod_item.select('p.price_sect > a')[0].text)
            price = ''.join(price_temp)
        except:
            continue

        if 'Hz' in refresh_rate:
            try:
                refresh_rate_value = re.findall(r'\d+', refresh_rate)[0] # 주사율
                prod_data.append(['MONITOR', product_name, company_name, prod_url, prod_img, int(price), int(size), aspect_ratio, panel_form, panel_type, int(refresh_rate_value), resolution])
            except:
                continue
    return prod_data



def text_to_value(pattern, text):
    match = re.search(pattern, text)
    if match:
        # 괄호 안의 숫자 출력
        return(match.group(1))
    else: 
        return (0)
    


# url 설정
url = 'https://prod.danawa.com/list/?cate=112757&shortcutKeyword=%EB%AA%A8%EB%8B%88%ED%84%B0'
total_page = 20
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

# DataFrame 생성 및 Excel 파일로 저장
# data = pd.DataFrame(prod_data_total, columns=['제품 타입', '상품명', '제조사', '구매링크', '이미지', '가격', '크기', '비율', '패널형태', '패널종류', '주사율', '해상도'])
# data.to_excel('./danawa_monitor_crawling_result.xlsx', index=False)
        
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
query = "INSERT INTO product (product_type, product_name, product_brand, product_url, product_img, product_price, monitor_size, monitor_aspect_ratio, monitor_panel_form, monitor_panel_type, monitor_refresh_rate, monitor_resolution) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"

# 쿼리 실행
for data in prod_data_total:
    cursor.execute(query, data)

# 변경 사항 커밋
conn.commit()

# 연결 종료
conn.close()