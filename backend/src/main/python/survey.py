'''
1. 연결 종료하기 전에 DF만들기

'''


'''
2. 연결 종료 후 DF만들기

'''
import mysql.connector
import pandas as pd
import sys
import argparse


import warnings

# 경고 메시지를 무시하도록 설정
warnings.filterwarnings("ignore")

# 명령줄 인수 파서 생성 및 인수 정의
parser = argparse.ArgumentParser(description="Connect to MySQL database and fetch data.")
parser.add_argument("--host", required=True, help="MySQL server address")
parser.add_argument("--user", required=True, help="MySQL user name")
parser.add_argument("--password", required=True, help="MySQL user password")
parser.add_argument("--database", required=True, help="Database name")
parser.add_argument("--port", type=int, default=3306, help="Database port")
parser.add_argument("--user_id", required=True, help="User ID to query")

# 인수 파싱
args = parser.parse_args()

# MySQL 서버에 연결
conn = mysql.connector.connect(
    host=args.host,
    user=args.user,
    password=args.password,
    database=args.database,
    port=args.port
)

try:
    # 커서 생성
    cursor = conn.cursor()
    
    # SQL 쿼리 실행 - 파라미터를 사용하여 SQL 인젝션 방지
    query = "SELECT * FROM survey WHERE user_id = %s LIMIT 1"
    cursor.execute(query, (args.user_id,))
    
    # 결과 가져오기
    row = cursor.fetchall()  # 하나 행 가져오기
    
    # 컬럼 이름 가져오기
    columns = cursor.column_names

finally:
    cursor.close()
    conn.close()  # 연결 종료

# 데이터프레임으로 변환 - 연결 종료 후
# df = pd.DataFrame([row], columns=columns)
# # 데이터프레임으로 변환
if row:
    df = pd.DataFrame(row, columns=columns)

    # 컬럼명을 기반으로 각 항목별 데이터프레임 생성
    keyboard_columns = [col for col in df if 'keyboard' in col]
    keyboard_df = df[keyboard_columns].copy()

    monitor_columns = [col for col in df if 'monitor' in col]
    monitor_df = df[monitor_columns].copy()

    mouse_columns = [col for col in df if 'mouse' in col]
    mouse_df = df[mouse_columns].copy()

    # 가격 컬럼에 대한 계산 수행
    keyboard_df['keyboard_price'] *= 10000
    monitor_df['monitor_price'] *= 10000
    mouse_df['mouse_price'] *= 10000

    # 키보드와 마우스는 그대로 진행하고, 모니터의 경우 갯수로 나눠서 가격 계산 하기...
    '''
    모니터
    - 가격
    - 용도
    - 수
    - 사이즈
    - 비율
    - 패널 형태

    키보드
    - 가격 (keyboard_price)
    - 용도 (keybaord_usage)
    - 색상 (keyboard_color)
    - 키배열 (keyboard_layout)
    - 유/무선 (keyboard_connection)
    - 건강 (keyboard_health)
    - 종류 (keyboard_type)
    - 소음 (keyboard_sound)

    마우스
    - 가격
    - 용도
    - 색상
    - 유/무선
    - 건강
    - 소음
    '''


    '''

    '''
    # print(keyboard_df.columns)

    ########################################################################
    # 키보드 전처리
    # 키보드 용도 전처리
    # 디폴트 = 취미용
    keyboard_df['keyboard_usage_work'] = 0
    keyboard_df['keyboard_usage_game'] = 0
    keyboard_df['keyboard_usage_prog'] = 0
    keyboard_df['keyboard_usage_edit'] = 0
    # 사무 = 1, 게임 = 2, 개발 = 4, 영상 = 8, 취미 = 16
    # 사무용이 들어간 경우
    if keyboard_df['keyboard_usage'].iloc[0] >= 16:
        keyboard_df['keyboard_usage'].iloc[0] = keyboard_df['keyboard_usage'].iloc[0] - 16

    if keyboard_df['keyboard_usage'].iloc[0] % 2 == 1:
        if keyboard_df['keyboard_usage'].iloc[0] == 1:
            keyboard_df['keyboard_usage_work'].iloc[0] = 1

        elif keyboard_df['keyboard_usage'].iloc[0] == 3:
            keyboard_df['keyboard_usage_work'].iloc[0] = 1
            keyboard_df['keyboard_usage_game'].iloc[0] = 1

        elif keyboard_df['keyboard_usage'].iloc[0] == 5:
            keyboard_df['keyboard_usage_work'].iloc[0] = 1
            keyboard_df['keyboard_usage_prog'].iloc[0] = 1

        elif keyboard_df['keyboard_usage'].iloc[0] == 7:
            keyboard_df['keyboard_usage_work'].iloc[0] = 1
            keyboard_df['keyboard_usage_game'].iloc[0] = 1
            keyboard_df['keyboard_usage_prog'].iloc[0] = 1

        elif keyboard_df['keyboard_usage'].iloc[0] == 9:
            keyboard_df['keyboard_usage_work'].iloc[0] = 1
            keyboard_df['keyboard_usage_edit'].iloc[0] = 1

        elif keyboard_df['keyboard_usage'].iloc[0] == 11:
            keyboard_df['keyboard_usage_work'].iloc[0] = 1
            keyboard_df['keyboard_usage_game'].iloc[0] = 1
            keyboard_df['keyboard_usage_edit'].iloc[0] = 1

        elif keyboard_df['keyboard_usage'].iloc[0] == 13:
            keyboard_df['keyboard_usage_work'].iloc[0] = 1
            keyboard_df['keyboard_usage_prog'].iloc[0] = 1
            keyboard_df['keyboard_usage_edit'].iloc[0] = 1

        elif keyboard_df['keyboard_usage'].iloc[0] == 15:
            keyboard_df['keyboard_usage_work'].iloc[0] = 1
            keyboard_df['keyboard_usage_game'].iloc[0] = 1
            keyboard_df['keyboard_usage_prog'].iloc[0] = 1
            keyboard_df['keyboard_usage_edit'].iloc[0] = 1

    # 사무용이 들어가지 않은 경우
    else:
        if keyboard_df['keyboard_usage'].iloc[0] == 2:
            keyboard_df['keyboard_usage_game'].iloc[0] = 1

        elif keyboard_df['keyboard_usage'].iloc[0] == 4:
            keyboard_df['keyboard_usage_prog'].iloc[0] = 1

        elif keyboard_df['keyboard_usage'].iloc[0] == 6:
            keyboard_df['keyboard_usage_game'].iloc[0] = 1
            keyboard_df['keyboard_usage_prog'].iloc[0] = 1

        elif keyboard_df['keyboard_usage'].iloc[0] == 8:
            keyboard_df['keyboard_usage_edit'].iloc[0] = 1

        elif keyboard_df['keyboard_usage'].iloc[0] == 10:
            keyboard_df['keyboard_usage_game'].iloc[0] = 1
            keyboard_df['keyboard_usage_edit'].iloc[0] = 1

        elif keyboard_df['keyboard_usage'].iloc[0] == 12:
            keyboard_df['keyboard_usage_prog'].iloc[0] = 1
            keyboard_df['keyboard_usage_edit'].iloc[0] = 1

        elif keyboard_df['keyboard_usage'].iloc[0] == 14:
            keyboard_df['keyboard_usage_game'].iloc[0] = 1
            keyboard_df['keyboard_usage_prog'].iloc[0] = 1
            keyboard_df['keyboard_usage_edit'].iloc[0] = 1

    # 키보드 색상 전처리
    keyboard_df['keyboard_color_WHITE'] = 0
    keyboard_df['keyboard_color_BLACK'] = 0
    keyboard_df['keyboard_color_COLOR'] = 0
    keyboard_df['keyboard_color_BASIC'] = 0
    # print(keyboard_df.columns)

    if keyboard_df['keyboard_color'].iloc[0] == 'NONE':
        keyboard_df['keyboard_color_WHITE'].iloc[0] = 1
        keyboard_df['keyboard_color_BLACK'].iloc[0] = 1
        keyboard_df['keyboard_color_COLOR'].iloc[0] = 1
        keyboard_df['keyboard_color_BASIC'].iloc[0] = 1
    elif keyboard_df['keyboard_color'].iloc[0] == 'BLACK':
        keyboard_df['keyboard_color_BLACK'].iloc[0] = 1
    elif keyboard_df['keyboard_color'].iloc[0] == 'WHITE':
        keyboard_df['keyboard_color_WHITE'].iloc[0] = 1
    else:
        keyboard_df['keyboard_color_COLOR'].iloc[0] = 1

    # 키보드 배열 전처리
    keyboard_df['keyboard_num_category'] = keyboard_df['keyboard_layout']

    keyboard_df['keyboard_connect'] = keyboard_df['keyboard_connection']


    keyboard_df['keyboard_contact_기계식'] = 0
    keyboard_df['keyboard_contact_기타'] = 0
    keyboard_df['keyboard_contact_멤브레인'] = 0
    keyboard_df['keyboard_contact_펜타그래프'] = 0

    if keyboard_df['keyboard_type'].iloc[0] == 'MEMBRANE':
        keyboard_df['keyboard_contact_멤브레인'].iloc[0] = 1
    elif keyboard_df['keyboard_type'].iloc[0] == 'PANTOGRAPH':
        keyboard_df['keyboard_contact_펜타그래프'].iloc[0] = 1
    else:
        keyboard_df['keyboard_contact_기계식'].iloc[0] = 1

    keyboard_df['keyboard_noise'] = 4
    if keyboard_df['keyboard_sound'].iloc[0] == 'RED':
        keyboard_df['keyboard_noise'].iloc[0] = 0
    elif keyboard_df['keyboard_sound'].iloc[0] == 'BLACK':
        keyboard_df['keyboard_noise'].iloc[0] = 1
    elif keyboard_df['keyboard_sound'].iloc[0] == 'BROWN':
        keyboard_df['keyboard_noise'].iloc[0] = 2
    elif keyboard_df['keyboard_sound'].iloc[0] == 'BLUE':
        keyboard_df['keyboard_noise'].iloc[0] = 3

    '''
    ['keyboard_color', 'keyboard_connection', 'keyboard_health',
        'keyboard_layout', 'keyboard_price', 'keyboard_sound', 'keyboard_type',  
        'keyboard_usage', 'keyboard_usage_work', 'keyboard_usage_game',
        'keyboard_usage_prog', 'keyboard_usage_edit', 'keyboard_color_WHITE',    
        'keyboard_color_BLACK', 'keyboard_color_COLOR', 'keyboard_color_BASIC',  
        'keyboard_num_category', 'keyboard_connect', 'keyboard_contact_기계식',  
        'keyboard_contact_기타', 'keyboard_contact_멤브레인',
        'keyboard_contact_펜타그래프', 'keyboard_noise', 'keyboard_connect_WIRE',
        'keyboard_connect_WIRELESS', 'keyboard_connect_BOTH']

    '''
    # 다 if문으로 해야함
    keyboard_df['keyboard_connect_WIRE'] = 0
    keyboard_df['keyboard_connect_WIRELESS'] = 0
    keyboard_df['keyboard_connect_BOTH'] = 0

    if keyboard_df['keyboard_connect'].iloc[0] == 'WIRE':
        keyboard_df['keyboard_connect_WIRE'].iloc[0] = 1
    elif keyboard_df['keyboard_connect'].iloc[0] == 'WIRELESS':
        keyboard_df['keyboard_connect_WIRELESS'].iloc[0] = 1
    elif keyboard_df['keyboard_connect'].iloc[0] == 'BOTH':
        keyboard_df['keyboard_connect_BOTH'].iloc[0] = 1

    keyboard_testdf = keyboard_df[['keyboard_price', 'keyboard_connect_BOTH', 'keyboard_connect_WIRE', 'keyboard_connect_WIRELESS', 'keyboard_usage_prog', 'keyboard_usage_game', 'keyboard_usage_work', 'keyboard_usage_edit', 
                'keyboard_color_BASIC', 'keyboard_color_COLOR', 'keyboard_color_BLACK', 'keyboard_color_WHITE', 'keyboard_num_category',
                'keyboard_contact_기계식', 'keyboard_contact_기타', 'keyboard_contact_멤브레인','keyboard_contact_펜타그래프', 'keyboard_noise', 'keyboard_health']]

    # print(keyboard_testdf)
    # 최종 변수 : 
    # ['product_name', 'keyboard_price', 'keyboard_connect_BOTH', 'keyboard_connect_WIRE', 'keyboard_connect_WIRELESS', 'keyboard_usage_prog', 'keyboard_usage_game', 'keyboard_usage_work', 'keyboard_usage_edit', 
    #               'keyboard_color_BASIC', 'keyboard_color_COLOR', 'keyboard_color_BLACK', 'keyboard_color_WHITE', 'keyboard_num_category',
    #              'keyboard_contact_기계식', 'keyboard_contact_기타', 'keyboard_contact_멤브레인','keyboard_contact_펜타그래프', 'keyboard_noise', 'keyboard_health']

    ########################################################################
    # 마우스 전처리

    # 마우스 용도 전처리

    mouse_df['mouse_usage_edit'] = 0
    mouse_df['mouse_usage_game'] = 0
    mouse_df['mouse_usage_hobby'] = 0
    mouse_df['mouse_usage_prog'] = 0
    mouse_df['mouse_usage_work'] = 0

    # work =1 , game = 2, prog = 4, edit = 8, hobby = 16
    if mouse_df['mouse_usage'].iloc[0] % 2 == 1:
        if mouse_df['mouse_usage'].iloc[0] == 1:
            mouse_df['mouse_usage_work'].iloc[0] = 1

        elif mouse_df['mouse_usage'].iloc[0] == 3:
            mouse_df['mouse_usage_work'].iloc[0] = 1
            mouse_df['mouse_usage_game'].iloc[0] = 1

        elif mouse_df['mouse_usage'].iloc[0] == 5:
            mouse_df['mouse_usage_work'].iloc[0] = 1
            mouse_df['mouse_usage_prog'].iloc[0] = 1

        elif mouse_df['mouse_usage'].iloc[0] == 7:
            mouse_df['mouse_usage_work'].iloc[0] = 1
            mouse_df['mouse_usage_game'].iloc[0] = 1
            mouse_df['mouse_usage_prog'].iloc[0] = 1

        elif mouse_df['mouse_usage'].iloc[0] == 9:
            mouse_df['mouse_usage_work'].iloc[0] = 1
            mouse_df['mouse_usage_eidt'].iloc[0] = 1

        elif mouse_df['mouse_usage'].iloc[0] == 11:
            mouse_df['mouse_usage_work'].iloc[0] = 1
            mouse_df['mouse_usage_game'].iloc[0] = 1
            mouse_df['mouse_usage_eidt'].iloc[0] = 1

        elif mouse_df['mouse_usage'].iloc[0] == 13:
            mouse_df['mouse_usage_work'].iloc[0] = 1
            mouse_df['mouse_usage_eidt'].iloc[0] = 1
            mouse_df['mouse_usage_prog'].iloc[0] = 1

        elif mouse_df['mouse_usage'].iloc[0] == 15:
            mouse_df['mouse_usage_work'].iloc[0] = 1
            mouse_df['mouse_usage_eidt'].iloc[0] = 1
            mouse_df['mouse_usage_prog'].iloc[0] = 1
            mouse_df['mouse_usage_game'].iloc[0] = 1

        elif mouse_df['mouse_usage'].iloc[0] == 17:
            mouse_df['mouse_usage_work'].iloc[0] = 1
            mouse_df['mouse_usage_hobby'].iloc[0] = 1

        elif mouse_df['mouse_usage'].iloc[0] == 19:
            mouse_df['mouse_usage_work'].iloc[0] = 1
            mouse_df['mouse_usage_game'].iloc[0] = 1
            mouse_df['mouse_usage_hobby'].iloc[0] = 1

        elif mouse_df['mouse_usage'].iloc[0] == 21:
            mouse_df['mouse_usage_work'].iloc[0] = 1
            mouse_df['mouse_usage_prog'].iloc[0] = 1
            mouse_df['mouse_usage_hobby'].iloc[0] = 1

        elif mouse_df['mouse_usage'].iloc[0] == 23:
            mouse_df['mouse_usage_work'].iloc[0] = 1
            mouse_df['mouse_usage_game'].iloc[0] = 1
            mouse_df['mouse_usage_prog'].iloc[0] = 1
            mouse_df['mouse_usage_hobby'].iloc[0] = 1

        elif mouse_df['mouse_usage'].iloc[0] == 25:
            mouse_df['mouse_usage_work'].iloc[0] = 1
            mouse_df['mouse_usage_eidt'].iloc[0] = 1
            mouse_df['mouse_usage_hobby'].iloc[0] = 1

        elif mouse_df['mouse_usage'].iloc[0] == 27:
            mouse_df['mouse_usage_work'].iloc[0] = 1
            mouse_df['mouse_usage_game'].iloc[0] = 1
            mouse_df['mouse_usage_edit'].iloc[0] = 1
            mouse_df['mouse_usage_hobby'].iloc[0] = 1

        elif mouse_df['mouse_usage'].iloc[0] == 29:
            mouse_df['mouse_usage_work'].iloc[0] = 1
            mouse_df['mouse_usage_prog'].iloc[0] = 1
            mouse_df['mouse_usage_edit'].iloc[0] = 1
            mouse_df['mouse_usage_hobby'].iloc[0] = 1

        elif mouse_df['mouse_usage'].iloc[0] == 31:
            mouse_df['mouse_usage_work'].iloc[0] = 1
            mouse_df['mouse_usage_game'].iloc[0] = 1
            mouse_df['mouse_usage_prog'].iloc[0] = 1
            mouse_df['mouse_usage_edit'].iloc[0] = 1
            mouse_df['mouse_usage_hobby'].iloc[0] = 1
    else:
        if mouse_df['mouse_usage'].iloc[0] == 2:
            mouse_df['mouse_usage_game'].iloc[0] = 1

        elif mouse_df['mouse_usage'].iloc[0] == 4:
            mouse_df['mouse_usage_prog'].iloc[0] = 1

        elif mouse_df['mouse_usage'].iloc[0] == 6:
            mouse_df['mouse_usage_game'].iloc[0] = 1
            mouse_df['mouse_usage_prog'].iloc[0] = 1

        elif mouse_df['mouse_usage'].iloc[0] == 8:
            mouse_df['mouse_usage_eidt'].iloc[0] = 1

        elif mouse_df['mouse_usage'].iloc[0] == 10:
            mouse_df['mouse_usage_game'].iloc[0] = 1
            mouse_df['mouse_usage_eidt'].iloc[0] = 1

        elif mouse_df['mouse_usage'].iloc[0] == 12:
            mouse_df['mouse_usage_eidt'].iloc[0] = 1
            mouse_df['mouse_usage_prog'].iloc[0] = 1

        elif mouse_df['mouse_usage'].iloc[0] == 14:
            mouse_df['mouse_usage_eidt'].iloc[0] = 1
            mouse_df['mouse_usage_prog'].iloc[0] = 1
            mouse_df['mouse_usage_game'].iloc[0] = 1

        elif mouse_df['mouse_usage'].iloc[0] == 16:
            mouse_df['mouse_usage_hobby'].iloc[0] = 1

        elif mouse_df['mouse_usage'].iloc[0] == 18:
            mouse_df['mouse_usage_game'].iloc[0] = 1
            mouse_df['mouse_usage_hobby'].iloc[0] = 1

        elif mouse_df['mouse_usage'].iloc[0] == 20:
            mouse_df['mouse_usage_prog'].iloc[0] = 1
            mouse_df['mouse_usage_hobby'].iloc[0] = 1

        elif mouse_df['mouse_usage'].iloc[0] == 22:
            mouse_df['mouse_usage_game'].iloc[0] = 1
            mouse_df['mouse_usage_prog'].iloc[0] = 1
            mouse_df['mouse_usage_hobby'].iloc[0] = 1

        elif mouse_df['mouse_usage'].iloc[0] == 24:
            mouse_df['mouse_usage_eidt'].iloc[0] = 1
            mouse_df['mouse_usage_hobby'].iloc[0] = 1

        elif mouse_df['mouse_usage'].iloc[0] == 26:
            mouse_df['mouse_usage_game'].iloc[0] = 1
            mouse_df['mouse_usage_edit'].iloc[0] = 1
            mouse_df['mouse_usage_hobby'].iloc[0] = 1

        elif mouse_df['mouse_usage'].iloc[0] == 28:
            mouse_df['mouse_usage_prog'].iloc[0] = 1
            mouse_df['mouse_usage_edit'].iloc[0] = 1
            mouse_df['mouse_usage_hobby'].iloc[0] = 1

        elif mouse_df['mouse_usage'].iloc[0] == 30:
            mouse_df['mouse_usage_game'].iloc[0] = 1
            mouse_df['mouse_usage_prog'].iloc[0] = 1
            mouse_df['mouse_usage_edit'].iloc[0] = 1
            mouse_df['mouse_usage_hobby'].iloc[0] = 1

    # 마우스 색상 전처리
    mouse_df['mouse_color_BLACK'] = 0
    mouse_df['mouse_color_WHITE'] = 0
    mouse_df['mouse_color_COLOR'] = 0
    mouse_df['mouse_color_BASIC'] = 0

    if mouse_df['mouse_color'].iloc[0] == 'BLACK':
        mouse_df['mouse_color_BLACK'].iloc[0] = 1
    elif mouse_df['mouse_color'].iloc[0] == 'WHITE':
        mouse_df['mouse_color_WHITE'].iloc[0] = 1
    elif mouse_df['mouse_color'].iloc[0] == 'COLOR':
        mouse_df['mouse_color_COLOR'].iloc[0] = 1
    elif mouse_df['mouse_color'].iloc[0] == 'NONE':
        mouse_df['mouse_color_WHITE'].iloc[0] = 1
        mouse_df['mouse_color_BLACK'].iloc[0] = 1
        mouse_df['mouse_color_COLOR'].iloc[0] = 1
        mouse_df['mouse_color_BASIC'].iloc[0] = 1

    # 마우스 유무선 전처리
    mouse_df['mouse_connect'] = mouse_df['mouse_connection']

    # 마우스 소음 전처리
    mouse_df['mouse_is_sound'] = mouse_df['mouse_sound']


    # 마우스 원핫 인코딩 진행해야 하는 변수 : 마우스 유/무선(mouse_connect)
    mouse_df['mouse_connect_WIRE'] = 0
    mouse_df['mouse_connect_WIRELESS'] = 0
    mouse_df['mouse_connect_BOTH'] = 0

    if mouse_df['mouse_connect'].iloc[0] == 'WIRE':
        mouse_df['mouse_connect_WIRE'].iloc[0] = 1
    elif mouse_df['mouse_connect'].iloc[0] == 'WIRELESS':
        mouse_df['mouse_connect_WIRELESS'].iloc[0] = 1
    elif mouse_df['mouse_connect'].iloc[0] == 'BOTH':
        mouse_df['mouse_connect_BOTH'].iloc[0] = 1
    # 최종 변수
    '''
    ['product_name', 'product_price', 'mouse_is_sound', 
        'mouse_health', 'mouse_connect_BOTH', 'mouse_connect_WIRE',
        'mouse_connect_WIRELESS', 'mouse_usage_edit', 'mouse_usage_game',
        'mouse_usage_hobby', 'mouse_usage_prog', 'mouse_usage_work',
        'mouse_color_BASIC', 'mouse_color_BLACK', 'mouse_color_COLOR',
        'mouse_color_WHITE']
    '''
    mouse_testdf = mouse_df[['mouse_price', 'mouse_is_sound', 
        'mouse_health', 'mouse_connect_BOTH', 'mouse_connect_WIRE',
        'mouse_connect_WIRELESS', 'mouse_usage_edit', 'mouse_usage_game',
        'mouse_usage_hobby', 'mouse_usage_prog', 'mouse_usage_work',
        'mouse_color_BASIC', 'mouse_color_BLACK', 'mouse_color_COLOR',
        'mouse_color_WHITE']]
    ###########################################################################
    # 모니터

    # 모니터 용도 전처리
    monitor_df['monitor_usage_work'] = 0
    monitor_df['monitor_usage_game'] = 0
    monitor_df['monitor_usage_prog'] = 0
    monitor_df['monitor_usage_edit'] = 0
    monitor_df['monitor_usage_hobby'] = 0

    if monitor_df['monitor_usage'].iloc[0] % 2 == 1:
        if monitor_df['monitor_usage'].iloc[0] == 1:
            monitor_df['monitor_usage_work'].iloc[0] = 1

        elif monitor_df['monitor_usage'].iloc[0] == 3:
            monitor_df['monitor_usage_work'].iloc[0] = 1
            monitor_df['monitor_usage_game'].iloc[0] = 1

        elif monitor_df['monitor_usage'].iloc[0] == 5:
            monitor_df['monitor_usage_work'].iloc[0] = 1
            monitor_df['monitor_usage_prog'].iloc[0] = 1

        elif monitor_df['monitor_usage'].iloc[0] == 7:
            monitor_df['monitor_usage_work'].iloc[0] = 1
            monitor_df['monitor_usage_game'].iloc[0] = 1
            monitor_df['monitor_usage_prog'].iloc[0] = 1

        elif monitor_df['monitor_usage'].iloc[0] == 9:
            monitor_df['monitor_usage_work'].iloc[0] = 1
            monitor_df['monitor_usage_eidt'].iloc[0] = 1

        elif monitor_df['monitor_usage'].iloc[0] == 11:
            monitor_df['monitor_usage_work'].iloc[0] = 1
            monitor_df['monitor_usage_game'].iloc[0] = 1
            monitor_df['monitor_usage_eidt'].iloc[0] = 1

        elif monitor_df['monitor_usage'].iloc[0] == 13:
            monitor_df['monitor_usage_work'].iloc[0] = 1
            monitor_df['monitor_usage_eidt'].iloc[0] = 1
            monitor_df['monitor_usage_prog'].iloc[0] = 1

        elif monitor_df['monitor_usage'].iloc[0] == 15:
            monitor_df['monitor_usage_work'].iloc[0] = 1
            monitor_df['monitor_usage_eidt'].iloc[0] = 1
            monitor_df['monitor_usage_prog'].iloc[0] = 1
            monitor_df['monitor_usage_game'].iloc[0] = 1

        elif monitor_df['monitor_usage'].iloc[0] == 17:
            monitor_df['monitor_usage_work'].iloc[0] = 1
            monitor_df['monitor_usage_hobby'].iloc[0] = 1

        elif monitor_df['monitor_usage'].iloc[0] == 19:
            monitor_df['monitor_usage_work'].iloc[0] = 1
            monitor_df['monitor_usage_game'].iloc[0] = 1
            monitor_df['monitor_usage_hobby'].iloc[0] = 1

        elif monitor_df['monitor_usage'].iloc[0] == 21:
            monitor_df['monitor_usage_work'].iloc[0] = 1
            monitor_df['monitor_usage_prog'].iloc[0] = 1
            monitor_df['monitor_usage_hobby'].iloc[0] = 1

        elif monitor_df['monitor_usage'].iloc[0] == 23:
            monitor_df['monitor_usage_work'].iloc[0] = 1
            monitor_df['monitor_usage_game'].iloc[0] = 1
            monitor_df['monitor_usage_prog'].iloc[0] = 1
            monitor_df['monitor_usage_hobby'].iloc[0] = 1

        elif monitor_df['monitor_usage'].iloc[0] == 25:
            monitor_df['monitor_usage_work'].iloc[0] = 1
            monitor_df['monitor_usage_eidt'].iloc[0] = 1
            monitor_df['monitor_usage_hobby'].iloc[0] = 1

        elif monitor_df['monitor_usage'].iloc[0] == 27:
            monitor_df['monitor_usage_work'].iloc[0] = 1
            monitor_df['monitor_usage_game'].iloc[0] = 1
            monitor_df['monitor_usage_edit'].iloc[0] = 1
            monitor_df['monitor_usage_hobby'].iloc[0] = 1

        elif monitor_df['monitor_usage'].iloc[0] == 29:
            monitor_df['monitor_usage_work'].iloc[0] = 1
            monitor_df['monitor_usage_prog'].iloc[0] = 1
            monitor_df['monitor_usage_edit'].iloc[0] = 1
            monitor_df['monitor_usage_hobby'].iloc[0] = 1

        elif monitor_df['monitor_usage'].iloc[0] == 31:
            monitor_df['monitor_usage_work'].iloc[0] = 1
            monitor_df['monitor_usage_game'].iloc[0] = 1
            monitor_df['monitor_usage_prog'].iloc[0] = 1
            monitor_df['monitor_usage_edit'].iloc[0] = 1
            monitor_df['monitor_usage_hobby'].iloc[0] = 1
    else:
        if monitor_df['monitor_usage'].iloc[0] == 2:
            monitor_df['monitor_usage_game'].iloc[0] = 1

        elif monitor_df['monitor_usage'].iloc[0] == 4:
            monitor_df['monitor_usage_prog'].iloc[0] = 1

        elif monitor_df['monitor_usage'].iloc[0] == 6:
            monitor_df['monitor_usage_game'].iloc[0] = 1
            monitor_df['monitor_usage_prog'].iloc[0] = 1

        elif monitor_df['monitor_usage'].iloc[0] == 8:
            monitor_df['monitor_usage_eidt'].iloc[0] = 1

        elif monitor_df['monitor_usage'].iloc[0] == 10:
            monitor_df['monitor_usage_game'].iloc[0] = 1
            monitor_df['monitor_usage_eidt'].iloc[0] = 1

        elif monitor_df['monitor_usage'].iloc[0] == 12:
            monitor_df['monitor_usage_eidt'].iloc[0] = 1
            monitor_df['monitor_usage_prog'].iloc[0] = 1

        elif monitor_df['monitor_usage'].iloc[0] == 14:
            monitor_df['monitor_usage_eidt'].iloc[0] = 1
            monitor_df['monitor_usage_prog'].iloc[0] = 1
            monitor_df['monitor_usage_game'].iloc[0] = 1

        elif monitor_df['monitor_usage'].iloc[0] == 16:
            monitor_df['monitor_usage_hobby'].iloc[0] = 1

        elif monitor_df['monitor_usage'].iloc[0] == 18:
            monitor_df['monitor_usage_game'].iloc[0] = 1
            monitor_df['monitor_usage_hobby'].iloc[0] = 1

        elif monitor_df['monitor_usage'].iloc[0] == 20:
            monitor_df['monitor_usage_prog'].iloc[0] = 1
            monitor_df['monitor_usage_hobby'].iloc[0] = 1

        elif monitor_df['monitor_usage'].iloc[0] == 22:
            monitor_df['monitor_usage_game'].iloc[0] = 1
            monitor_df['monitor_usage_prog'].iloc[0] = 1
            monitor_df['monitor_usage_hobby'].iloc[0] = 1

        elif monitor_df['monitor_usage'].iloc[0] == 24:
            monitor_df['monitor_usage_eidt'].iloc[0] = 1
            monitor_df['monitor_usage_hobby'].iloc[0] = 1

        elif monitor_df['monitor_usage'].iloc[0] == 26:
            monitor_df['monitor_usage_game'].iloc[0] = 1
            monitor_df['monitor_usage_edit'].iloc[0] = 1
            monitor_df['monitor_usage_hobby'].iloc[0] = 1

        elif monitor_df['monitor_usage'].iloc[0] == 28:
            monitor_df['monitor_usage_prog'].iloc[0] = 1
            monitor_df['monitor_usage_edit'].iloc[0] = 1
            monitor_df['monitor_usage_hobby'].iloc[0] = 1

        elif monitor_df['monitor_usage'].iloc[0] == 30:
            monitor_df['monitor_usage_game'].iloc[0] = 1
            monitor_df['monitor_usage_prog'].iloc[0] = 1
            monitor_df['monitor_usage_edit'].iloc[0] = 1
            monitor_df['monitor_usage_hobby'].iloc[0] = 1


    # 모니터 사이즈 전처리
    '''
    중복 선택 최대 2개
    1 2 4 8 16(5)
    3 5 9 17(4)
    6 10 18(3)
    12 20(2)
    24(1)

    1 3 5 9 17 
    2 4 6 8 10 12 16 18 20 24 
    '''
    # 원핫인코딩 진행
    '''
    'monitor_size_24인치', 'monitor_size_24인치미만',
    'monitor_size_27인치', 'monitor_size_32인치', 'monitor_size_32인치이상',


    '''
    monitor_df['monitor_size_24인치미만'] = 0
    monitor_df['monitor_size_24인치'] = 0
    monitor_df['monitor_size_27인치'] = 0
    monitor_df['monitor_size_32인치'] = 0
    monitor_df['monitor_size_32인치이상'] = 0

    # 모니터 사이즈 전처리
    if monitor_df['monitor_size'].iloc[0] % 2 == 1:
        if monitor_df['monitor_size'].iloc[0] == 1:
            monitor_df['monitor_size_24인치미만'].iloc[0] = 1

        elif monitor_df['monitor_size'].iloc[0] == 3:
            monitor_df['monitor_size_24인치미만'].iloc[0] = 1
            monitor_df['monitor_size_24인치'].iloc[0] = 1

        elif monitor_df['monitor_size'].iloc[0] == 5:
            monitor_df['monitor_size_24인치미만'].iloc[0] = 1
            monitor_df['monitor_size_27인치'].iloc[0] = 1
            
        elif monitor_df['monitor_size'].iloc[0] == 9:
            monitor_df['monitor_size_24인치미만'].iloc[0] = 1
            monitor_df['monitor_size_32인치'].iloc[0] = 1

        elif monitor_df['monitor_size'].iloc[0] == 17:
            monitor_df['monitor_size_24인치미만'].iloc[0] = 1
            monitor_df['monitor_size_32인치이상'].iloc[0] = 1
    else:
        if monitor_df['monitor_size'].iloc[0] == 2:
            monitor_df['monitor_size_24인치'].iloc[0] = 1

        elif monitor_df['monitor_size'].iloc[0] == 4:
            monitor_df['monitor_size_27인치'].iloc[0] = 1

        elif monitor_df['monitor_size'].iloc[0] == 6:
            monitor_df['monitor_size_24인치'].iloc[0] = 1
            monitor_df['monitor_size_27인치'].iloc[0] = 1

        elif monitor_df['monitor_size'].iloc[0] == 8:
            monitor_df['monitor_size_32인치'].iloc[0] = 1

        elif monitor_df['monitor_size'].iloc[0] == 10:
            monitor_df['monitor_size_24인치'].iloc[0] = 1
            monitor_df['monitor_size_32인치'].iloc[0] = 1

        elif monitor_df['monitor_size'].iloc[0] == 12:
            monitor_df['monitor_size_27인치'].iloc[0] = 1
            monitor_df['monitor_size_32인치'].iloc[0] = 1

        elif monitor_df['monitor_size'].iloc[0] == 16:
            monitor_df['monitor_size_32인치이상'].iloc[0] = 1

        elif monitor_df['monitor_size'].iloc[0] == 18:
            monitor_df['monitor_size_24인치'].iloc[0] = 1
            monitor_df['monitor_size_32인치이상'].iloc[0] = 1

        elif monitor_df['monitor_size'].iloc[0] == 20:
            monitor_df['monitor_size_27인치'].iloc[0] = 1
            monitor_df['monitor_size_32인치이상'].iloc[0] = 1

        elif monitor_df['monitor_size'].iloc[0] == 24:
            monitor_df['monitor_size_32인치'].iloc[0] = 1
            monitor_df['monitor_size_32인치이상'].iloc[0] = 1

    # 모니터 비율 전처리
    '''
    중복 최대 2개
    1 2 4 8
    3 5 9 
    6 10
    12

    1 3 5 9
    2 4 6 8 10 12



    'monitor_aspect_ratio_16:9', 'monitor_aspect_ratio_21:9',
        'monitor_aspect_ratio_32:9', 'monitor_aspect_ratio_기타' 
    '''
    monitor_df['monitor_aspect_ratio_16:9'] = 0
    monitor_df['monitor_aspect_ratio_21:9'] = 0
    monitor_df['monitor_aspect_ratio_32:9'] = 0
    monitor_df['monitor_aspect_ratio_기타'] = 0

    if monitor_df['monitor_ratio'].iloc[0] % 2 == 1:
        if monitor_df['monitor_ratio'].iloc[0] == 1:
            monitor_df['monitor_aspect_ratio_16:9'].iloc[0] = 1

        elif monitor_df['monitor_ratio'].iloc[0] == 3:
            monitor_df['monitor_aspect_ratio_16:9'].iloc[0] = 1
            monitor_df['monitor_aspect_ratio_21:9'].iloc[0] = 1

        elif monitor_df['monitor_ratio'].iloc[0] == 5:
            monitor_df['monitor_aspect_ratio_16:9'].iloc[0] = 1
            monitor_df['monitor_aspect_ratio_32:9'].iloc[0] = 1

        elif monitor_df['monitor_ratio'].iloc[0] == 9:
            monitor_df['monitor_aspect_ratio_16:9'].iloc[0] = 1
            monitor_df['monitor_aspect_ratio_기타'].iloc[0] = 1

    # 16:9=1, 21:9=2, 32:9=4, 기타=8 (중복선택 최대 2개)

    else:
        if monitor_df['monitor_ratio'].iloc[0] == 2:
            monitor_df['monitor_aspect_ratio_21:9'].iloc[0] = 1

        elif monitor_df['monitor_ratio'].iloc[0] == 4:
            monitor_df['monitor_aspect_ratio_32:9'].iloc[0] = 1

        elif monitor_df['monitor_ratio'].iloc[0] == 6:
            monitor_df['monitor_aspect_ratio_21:9'].iloc[0] = 1
            monitor_df['monitor_aspect_ratio_32:9'].iloc[0] = 1

        elif monitor_df['monitor_ratio'].iloc[0] == 8:
            monitor_df['monitor_aspect_ratio_기타'].iloc[0] = 1

        elif monitor_df['monitor_ratio'].iloc[0] == 10:
            monitor_df['monitor_aspect_ratio_21:9'].iloc[0] = 1
            monitor_df['monitor_aspect_ratio_기타'].iloc[0] = 1

        elif monitor_df['monitor_ratio'].iloc[0] == 12:
            monitor_df['monitor_aspect_ratio_32:9'].iloc[0] = 1
            monitor_df['monitor_aspect_ratio_기타'].iloc[0] = 1

    # 원핫 인코딩 : 모니터 패널 형태
    # 변수 : 
    '''
    ['product_id', 'product_name', 'monitor_refresh_rate',
        'monitor_panel_form_CURVED', 'monitor_panel_form_FLAT',
        'monitor_panel_type_IPS', 'monitor_panel_type_OLED',
        'monitor_panel_type_TN', 'monitor_panel_type_VA', 'monitor_usage_edit',
        'monitor_usage_game', 'monitor_usage_hobby', 'monitor_usage_prog',
        'monitor_usage_work', 'monitor_aspect_ratio_16:9',
        'monitor_aspect_ratio_21:9', 'monitor_aspect_ratio_32:9',
        'monitor_aspect_ratio_기타', 'monitor_size_24인치', 'monitor_size_24인치 미만',
        'monitor_size_27인치', 'monitor_size_32인치', 'monitor_size_32인치이상',
        'monitor_price']
    '''
    monitor_testdf = monitor_df[[
        'monitor_usage_edit',
        'monitor_usage_game', 'monitor_usage_hobby', 'monitor_usage_prog',
        'monitor_usage_work', 'monitor_aspect_ratio_16:9',
        'monitor_aspect_ratio_21:9', 'monitor_aspect_ratio_32:9',
        'monitor_aspect_ratio_기타', 'monitor_size_24인치', 'monitor_size_24인치미만',
        'monitor_size_27인치', 'monitor_size_32인치', 'monitor_size_32인치이상',
        'monitor_price']]

else:
    print("No data found for user_id")

'''
컬럼명에 키보드, 모니터, 마우스 별로 구분하기
구분해서 더미변수.. 만들고.. 
total_price
'''
