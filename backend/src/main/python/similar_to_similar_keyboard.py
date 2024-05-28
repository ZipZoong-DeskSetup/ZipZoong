import mysql.connector
import pandas as pd
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.preprocessing import StandardScaler
import warnings
import argparse

# 경고 메시지를 무시하도록 설정
warnings.filterwarnings("ignore")

# 명령줄 인수 파서 생성 및 인수 정의
parser = argparse.ArgumentParser(description="Find similar products for a given product ID.")
parser.add_argument("--host", required=True, help="MySQL server address")
parser.add_argument("--user", required=True, help="MySQL user name")
parser.add_argument("--password", required=True, help="MySQL user password")
parser.add_argument("--database", required=True, help="Database name")
parser.add_argument("--port", type=int, default=3306, help="Database port")
parser.add_argument("--product_id", required=True, type=int, help="Product ID to find similar products for")

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
    
    # 컬럼 이름을 조회하는 쿼리 실행
    column_query = """
    SELECT COLUMN_NAME
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_SCHEMA = 'a204_db'
    AND TABLE_NAME = 'product'
    AND (COLUMN_NAME LIKE '%product%' OR COLUMN_NAME LIKE '%keyboard%')
    """
    cursor.execute(column_query)
    
    # 조회된 컬럼 이름들을 리스트에 저장
    columns = [column[0] for column in cursor.fetchall()]
    
    # 데이터를 조회하는 쿼리 작성
    query = f"SELECT {', '.join(columns)} FROM a204_db.product WHERE product_type='KEYBOARD'"
    
    # 데이터 조회
    cursor.execute(query)
    rows = cursor.fetchall()
    
finally:
    cursor.close()
    conn.close()  # 연결 종료


# 데이터프레임으로 변환
df = pd.DataFrame(rows, columns=columns)


df = df.drop([ 'product_img', 'product_type', 'product_url'], axis=1)

df['keyboard_usage'] = ''

# 취미용(hobby)은 0 0 0 0 
for i in range(len(df)):
    if ("게이밍" or "게임") in df['product_name'][i]:
        df['keyboard_usage'][i] = 'game'
    elif df['keyboard_contact'][i] == '멤브레인':
        df['keyboard_usage'][i] = 'work'
    elif df['keyboard_contact'][i] == '기계식':
        df['keyboard_usage'][i] = 'prog'
    else:
        df['keyboard_usage'][i] = 'edit'

# 키보드 배열 전처리 수치형 변수로 저장됐긴 하나, 하나의 속성값.... -> 라벨인코딩 진행?
# 키 배열 수 범주화 함수
def categorize_keyboard_num(row):
    if row >= 104:
        return 4
    elif 88 <= row <= 103:
        return 3
    elif 80 <= row <= 87:
        return 2
    elif 51 <= row <= 79:
        return 1
    else:
        return 0
    
# 키보드 배열 전처리 
df['keyboard_num_category'] = df['keyboard_num'].apply(categorize_keyboard_num)

# 건강 전처리
df['keyboard_health'] = 0

for i in range(len(df)):
    if df['keyboard_form'][i] == '인체공학':
        df['keyboard_health'][i] = 1
    elif df['keyboard_force'][i] <= 35:
        df['keyboard_health'][i] = 1

df['keyboard_switch'] = df['keyboard_switch'].fillna('기타')

df['keyboard_noise'] = 4

for i in range(len(df)):
    if df['keyboard_switch'][i] == '저소음 적축' or df['keyboard_switch'][i] == '적축':
        df['keyboard_noise'][i] = 0
        
    elif df['keyboard_switch'][i] == '흑축':
        df['keyboard_noise'][i] = 1
        
    elif df['keyboard_switch'][i] == '갈축':
        df['keyboard_noise'][i] = 2
        
    elif df['keyboard_switch'][i] == '청축':
        df['keyboard_noise'][i] = 3


# NaN값 전처리
df.isnull().sum()
# 키압 존재하지 않는 데이터 임의로 100으로 처리
df['keyboard_force'] = df['keyboard_force'].fillna(100)

# 빈 값 '기타'로 전처리
df['keyboard_contact'] = df['keyboard_contact'].fillna('기타')

# 무접점(광축), 무접점(정전용량) '기타'로 전처리
for i in range(len(df)):
    if '무접점' in df['keyboard_contact'][i]:
        df['keyboard_contact'][i] = '기타'

for i in range(len(df)):
    if df['keyboard_color'][i] == '블랙':
        df['keyboard_color'][i] = 'BLACK'
    elif df['keyboard_color'][i] == '화이트':
        df['keyboard_color'][i] = 'WHITE'
    elif df['keyboard_color'][i] == '기타':
        df['keyboard_color'][i] = 'COLOR'
    else:
        df['keyboard_color'][i] = 'BASIC'

df = pd.get_dummies(df, columns = ['keyboard_usage', 'keyboard_color', 'keyboard_contact', 'keyboard_connect'])
df['keyboard_price'] = df['product_price']
test_df = df[['product_id', 'product_name', 'keyboard_price', 'keyboard_connect_BOTH', 'keyboard_connect_WIRE', 'keyboard_connect_WIRELESS', 'keyboard_usage_prog', 'keyboard_usage_game', 'keyboard_usage_work', 'keyboard_usage_edit', 
              'keyboard_color_BASIC', 'keyboard_color_COLOR', 'keyboard_color_BLACK', 'keyboard_color_WHITE', 'keyboard_num_category',
             'keyboard_contact_기계식', 'keyboard_contact_기타', 'keyboard_contact_멤브레인','keyboard_contact_펜타그래프', 'keyboard_noise', 'keyboard_health']]


# find_similar_products 함수 수정
def find_similar_products(product_id, df, top_n=5):
    if 'product_id' not in df.columns:
        raise ValueError("DataFrame does not contain column 'product_id'.")
    
    if product_id not in df['product_id'].values:
        raise ValueError(f"Product ID {product_id} not found in DataFrame.")
    
    index = df.index[df['product_id'] == product_id].tolist()[0]
    return _find_similar_products_by_index(index, df, top_n)

def _find_similar_products_by_index(index, df, top_n=5):
    # 가격 유사도 계산
    prices = df['keyboard_price'].to_numpy()
    price_diff = np.abs(prices.reshape(-1, 1) - prices.reshape(1, -1))
    small_value = 1
    price_similarity = 1 / (price_diff + small_value)
    
    # 제품명, 상품 가격, 상품 ID를 제외한 속성만 선택하여 코사인 유사도 계산
    features = df.drop(columns=['product_name', 'keyboard_price', 'product_id'])
    scaler = StandardScaler()
    features_scaled = scaler.fit_transform(features)
    cosine_sim = cosine_similarity(features_scaled, features_scaled)
    
    # 총 유사도 계산: 가격 유사도 * 가중치(0.6) + 코사인 유사도 * (1 - 가중치)
    total_sim = price_similarity * 0.6 + cosine_sim * 0.4
    
    # 자기 자신을 제외한 유사 제품 찾기
    similarity_scores = total_sim[index]
    similar_indices = np.argsort(similarity_scores)[-top_n-1:-1][::-1]  # 자기 자신을 포함해 상위 N+1개 선택
    similar_indices = similar_indices[similar_indices != index]  # 자기 자신 제외
    
    # 상위 N개 선택
    if len(similar_indices) > top_n:
        similar_indices = similar_indices[:top_n]
    
    # 유사 제품 반환
    result_df = df.iloc[similar_indices].copy()
    result_df['similarity'] = similarity_scores[similar_indices]
    result_df = result_df.sort_values(by='similarity', ascending=False)
    
    return result_df


# 명령줄 인자로 받은 product_id를 사용하여 유사한 상품 찾기
similar_products = find_similar_products(args.product_id, test_df)
print(similar_products['product_id'])