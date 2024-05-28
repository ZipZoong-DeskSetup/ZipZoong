from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
from bs4 import BeautifulSoup
import pandas as pd
from tqdm import tqdm
import time
import re

# contact (접점방식)
contact = ['기계식', '무접점(광축)', '무접점(정전용량)', '멤브레인', '펜타그래프']

# form (형태)
form = ['텐키리스', '비키스타일', '한손키보드', '인체공학']

# led(조명)
led = ['RGB 백라이트', '단색 백라이트']

# switch (축)
switch = ['저소음 적축', '적축', '갈축', '청축', '흑축']

# color (색상)
color = ['블랙', '화이트', 'White', 'Black', '그레이', '실버']

# color_exception
color_exception = ['해외 구매', '저소음', '클릭', '넌클릭', '리니어', '옵션선택구성',
                   '키스킨 미포함', '키스킨 포함', '정품', '병행수입', 'USB', '균등', 
                   '키스킨', '키스킨+손목받침대', '해외구매']

# 상품 정보 추출 함수
def get_prod_items(prod_items):
    time.sleep(0.5)
    prod_data = []

    # 마지막 데이터는 필요없는 값이므로 제외
    for prod_item in prod_items[:-1]:



        # img 데이터 추출
        img_tag = prod_item.select_one('a.thumb_link > img')
        prod_img = img_tag.get('data-original') or img_tag.get('src')
        prod_img = 'https:' + prod_img

        # spec_lists 처리
        spec_lists = prod_item.select('div.spec_list > a.view_dic')

        # price_lists 처리
        price_lists = prod_item.select('div.prod_main_info > div.prod_pricelist > ul > li')


        # 키보드와 마우스가 함께 있는 제품 or 키보드가 포함되지 않다면 제외
        if ('마우스' in spec_lists[0].text.strip()) or ('키보드' not in spec_lists[0].text.strip()):
            continue
        
        # 키보드(베어본) - 키캡이나 스위치가 없는 제품이므로 제거
        elif '베어본' in spec_lists[0].text.strip():
            continue

        # 키보드 제품이라면
        else:

            # prod_name에 제조사와 제품명이 함께 있음 -> 분리
            title = prod_item.select('p.prod_name > a')[0].text.split(" ", 1)
            company_name = title[0].strip()
            
            product_name = title[1].strip()
            
            keyboard_connect = spec_lists[1].text.strip()
            
            # default 값
            keyboard_force = 100000000000
            keyboard_num = 0
            keyboard_form = '기타'
            keyboard_led = None
            keyboard_contact = None
            keyboard_price = 0
            keyboard_options = None
            keyboard_switch = None
            

            if keyboard_connect == '유선':
                keyboard_connect = 'WIRE'
                try:
                    keyboard_num = int(spec_lists[2].text.strip().split('키')[0])
                    # 104키 이상이라면 풀배열
                    if keyboard_num >= 10:
                        keyboard_form = '풀배열'
                except:
                    # 만약 int형으로 변형이 불가하다면 공백처리
                    keyboard_num = 0

                keyborad_interface = None

                for i in range(1, len(spec_lists)):
                    # print(spec_lists[i].text.strip())
                    if 'g' in spec_lists[i].text.strip():
                        try:
                            x = float(spec_lists[i].text.strip().split('g')[0])
                            # 키압이 100 이상인 경우는 없으므로 100이상은 무게로 취급
                            if x < 100:
                                keyboard_force = min(float(spec_lists[i].text.strip().split('g')[0]), keyboard_force)
                        except:
                            keyboard_force = None
                    elif spec_lists[i].text.strip() in contact:
                        keyboard_contact = spec_lists[i].text.strip()
                    
                    # 
                    elif spec_lists[i].text.strip() in form:
                        keyboard_form = spec_lists[i].text.strip()

                    elif spec_lists[i].text.strip() in led:
                        keyboard_led = spec_lists[i].text.strip()

            else:
                # 추가한 부분
                if keyboard_connect == '무선':
                    keyboard_connect = 'WIRELESS'
                elif keyboard_connect =='유선+무선':
                    keyboard_connect = 'BOTH'
                else:
                    continue
                     # keyboard_connect == '유선+무선' or '무선':
                    
                keyborad_interface = spec_lists[2].text.strip()

                for i in range(len(spec_lists)):
                    # 아직 몇 키인지 할당받지 않았다면 -> 할당 / 그렇지 않다면 continue
                    if keyboard_num == 0 and '키' in spec_lists[i].text.strip():
                        try:
                            keyboard_num = int(spec_lists[i].text.strip().split('키')[0])
                            # 104키 이상이라면 풀배열
                            if keyboard_num >= 104:
                                keyboard_form = '풀배열'
                        except:
                            # 만약 int형으로 변형이 불가하다면 공백처리
                            keyboard_num = 0
                    

                        
                    elif 'g' in spec_lists[i].text.strip():
                        try:
                            x = float(spec_lists[i].text.strip().split('g')[0])
                            # 키압이 100 이상인 경우는 없으므로 100이상은 무게로 취급
                            if x < 100:
                                keyboard_force = min(float(spec_lists[i].text.strip().split('g')[0]), keyboard_force)
                        except:
                            keyboard_force = None
                    elif spec_lists[i].text.strip() in contact:
                        keyboard_contact = spec_lists[i].text.strip()
                    
                    elif spec_lists[i].text.strip() in form:
                        keyboard_form = spec_lists[i].text.strip()

                    elif spec_lists[i].text.strip() in led:
                        keyboard_led = spec_lists[i].text.strip()
                            
                if keyborad_interface == '리시버':
                    keyborad_interface = 'RECEIVER'
                elif keyborad_interface == '블루투스':
                    keyborad_interface = 'BLUETOOTH'
                else:
                    keyborad_interface = 'BOTH'
                
        try:
            keyboard_force = float(keyboard_force)
            if keyboard_force > 100:
                keyboard_force = None
        except:
            keyboard_force = None

        p_len = len(price_lists)
        for j in range(p_len):
            keyboard_color = None
            keyboard_price = price_lists[j].select_one('p.price_sect > a > strong').text.strip()

            # 제품 구매 url 추출
            prod_url = price_lists[j].select_one('p.price_sect > a')['href']
            
            # 키보드 가격이 숫자로 변환되지 않는다면 일시품절과 같은 이유이기 때문에 -> 이에 대한 전처리 과정
            # 만약 일시품절이라면 가격을 0으로 변환하고, DB에 저장하지 않음
            try:
                keyboard_price = int(keyboard_price.replace(',',''))
            except:
                keyboard_price = 0

            keyboard_options = price_lists[j].select_one('div.over_preview > p.memory_sect').text.strip()
            options = keyboard_options.split(',')

            for op in options:
                
                # '위' 이후의 첫 번째 단어/문구 찾기
                word_match = re.search(r"\d+위\s*(\S+)", op)
                # '위' 이후의 단어가 존재한다면
                if word_match:
                    matched_word = word_match.group(1)
                    if 'g' in matched_word:
                        try:
                            keyboard_force = int(matched_word.split('g')[0].strip()) 
                        except:
                            pass
                    elif '축' in matched_word:
                        keyboard_switch = matched_word.strip()
                    else:
                        keyboard_color = matched_word.strip()
                        
                # 위 이후의 단어가 존재하지 않는다면? 
                else:
                    if 'g' in op:
                        try:
                            keyboard_force = int(op.split('g')[0].strip()) 
                        except:
                            pass
                    elif '축' in op:
                        keyboard_switch = op.strip()
                    else:
                        keyboard_color = op.strip()
            

            if keyboard_price == 0:
                continue
            if keyboard_switch not in switch:
                if keyboard_contact == '기계식':
                    continue
                else:
                    keyboard_switch = None

            if keyboard_num == 0:
                continue

            if keyboard_color in color_exception:
                keyboard_color = '기본'
            elif keyboard_color == None:
                keyboard_color = '기본'

            # 키보드 컬러가 color에 포함된다면
            elif keyboard_color in color:
                if keyboard_color == 'Black':
                    keyboard_color = '블랙'
                elif keyboard_color == 'White':
                    keyboard_color = '화이트'
                
            # 아무데도 해당하지 않는다면
            else:
                keyboard_color = '기타'
            prod_data.append(['KEYBOARD', product_name, company_name, prod_url, prod_img, 
                                keyboard_price, keyboard_connect, keyborad_interface, keyboard_contact,keyboard_num, 
                                keyboard_force, keyboard_form, keyboard_led, keyboard_switch, keyboard_color])

    return prod_data


# url 설정
keyword = '키보드'

url = f'https://prod.danawa.com/list/?cate=112782&searchOption=/innerSearchKeyword={keyword}'
total_page = 40
prod_data_total = []

# 웹 드라이버 설정 및 URL 접속
service = Service(executable_path=ChromeDriverManager().install())
driver = webdriver.Chrome(service = service)
driver.get(url)
driver.maximize_window()    # 화면 최대화 

# 페이지가 완전히 로드될 때까지 잠시 대기
time.sleep(2)

# 각 페이지 별로 상품 정보를 수집
for page in tqdm(range(1, total_page + 1)):
    # 현재 페이지의 HTML을 가져옴
    html = driver.page_source
    soup = BeautifulSoup(html, 'html.parser')

    prod_items = soup.select("div.main_prodlist > ul.product_list > li.prod_item ")
    prod_item_list = get_prod_items(prod_items)
    # print(prod_item_list)

    prod_data_total += prod_item_list

    # 마지막 페이지가 아니라면 다음 페이지로 이동
    if page < total_page:
        move_script = f"movePage({page+1})"
        driver.execute_script(move_script)
        time.sleep(2)


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

query = "INSERT INTO product (product_type, product_name, product_brand, product_url, product_img, product_price, keyboard_connect, keyboard_interface, keyboard_contact,keyboard_num, keyboard_force, keyboard_form, keyboard_led, keyboard_switch, keyboard_color) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"

# 쿼리 실행
for data in prod_data_total:
    cursor.execute(query, data)

# 변경 사항 커밋
conn.commit()

# 연결 종료
conn.close()
