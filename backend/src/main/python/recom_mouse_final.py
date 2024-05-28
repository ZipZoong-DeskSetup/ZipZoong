import mysql.connector
import pandas as pd
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.preprocessing import StandardScaler
from sklearn.preprocessing import MinMaxScaler
from sklearn.metrics.pairwise import euclidean_distances
import warnings
from survey import mouse_testdf
import argparse


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
    
    # 컬럼 이름을 조회하는 쿼리 실행
    column_query = """
    SELECT COLUMN_NAME
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_SCHEMA = 'a204_db'
    AND TABLE_NAME = 'product'
    AND (COLUMN_NAME LIKE '%product%' OR COLUMN_NAME LIKE '%mouse%')
    """
    cursor.execute(column_query)
    
    # 조회된 컬럼 이름들을 리스트에 저장
    columns = [column[0] for column in cursor.fetchall()]
    
    # 데이터를 조회하는 쿼리 작성
    query = f"SELECT {', '.join(columns)} FROM a204_db.product WHERE product_type='MOUSE'"
    
    # 데이터 조회
    cursor.execute(query)
    rows = cursor.fetchall()
    
finally:
    cursor.close()
    conn.close()  # 연결 종료



# 데이터프레임으로 변환
df = pd.DataFrame(rows, columns=columns)
# print(df['mouse_type'])
'''
Index(['mouse_color', 'mouse_connect', 'mouse_dpi', 'mouse_height',
       'mouse_interface', 'mouse_is_sound', 'mouse_length', 'mouse_type',
       'mouse_weight', 'mouse_width', 'product_brand', 'product_id',
       'product_img', 'product_name', 'product_price', 'product_type',
       'product_url'],

'''
df = df.drop(['product_img', 'product_type', 'product_url'], axis=1)

# 마우스 용도 전처리
df['mouse_usage'] = ''
for i in range(len(df)):
    if df['mouse_type'][i] == '게이밍':
        df['mouse_usage'][i] = 'game'
    elif 1000 < df['mouse_dpi'][i] < 3000 and df['mouse_connect'][i] != 'BLUETOOTH' and df['mouse_is_sound'][i]==False:
        df['mouse_usage'][i] = 'work'
    elif df['mouse_type'][i] == '버티컬':
        df['mouse_usage'][i] = 'prog'
    elif df['mouse_dpi'][i] >= 3000:
        df['mouse_usage'][i] = 'edit'
    else:
        df['mouse_usage'][i] = 'hobby'
    
# 마우스 색상 전처리
for i in range(len(df)):
    if df['mouse_color'][i] == '기타':
        df['mouse_color'][i] = 'BASIC'
    elif df['mouse_color'][i] not in ('블랙', '화이트'):
        df['mouse_color'][i] = 'COLOR'
    elif df['mouse_color'][i] == '블랙':
        df['mouse_color'][i] = 'BLACK'
    elif df['mouse_color'][i] == '화이트':
        df['mouse_color'][i] = 'WHITE'
        
df['mouse_health'] = 0

for i in range(len(df)):
    if df['mouse_type'][i] == '버티컬':
        df['mouse_health'][i] = 1

# NaN값 전처리
df.dropna(subset=['mouse_connect'], inplace=True)

# 나머지는 fillna(0) 처리
df = df.fillna(0)

df = pd.get_dummies(df, columns = ['mouse_connect', 'mouse_usage', 'mouse_color'])
df['mouse_price'] = df['product_price']
# print(df.columns)
test_df = df[['product_id','product_name', 'mouse_price', 'mouse_is_sound', 
       'mouse_health', 'mouse_connect_BOTH', 'mouse_connect_WIRE',
       'mouse_connect_WIRELESS', 'mouse_usage_edit', 'mouse_usage_game',
       'mouse_usage_hobby', 'mouse_usage_prog', 'mouse_usage_work',
       'mouse_color_BASIC', 'mouse_color_BLACK', 'mouse_color_COLOR',
       'mouse_color_WHITE']]

# 가격 유사도 계산 함수
def calculate_price_similarity(price_test, price_survey, small_value=1):
    price_diff = np.abs(price_test - price_survey)
    price_similarity = 1 / (price_diff + small_value)
    return price_similarity

def find_similar_products(survey_row, test_df, top_n=4, price_weight=0.5):
    # survey_row는 단일 행 데이터프레임이고, test_df는 비교 대상인 데이터프레임입니다.
    
    # 공통 컬럼 선택
    common_columns = test_df.columns.intersection(survey_row.columns).tolist()
    common_columns = [col for col in common_columns if col not in ['product_name', 'mouse_price']]
    
    # 가격 유사도 계산
    price_survey = survey_row['mouse_price'].values[0]
    prices_test = test_df['mouse_price'].to_numpy()
    price_sim = calculate_price_similarity(prices_test, price_survey)
    
    # 특성 유사도 계산을 위한 준비
    scaler = StandardScaler()
    survey_features_scaled = scaler.fit_transform(survey_row[common_columns])
    test_features_scaled = scaler.transform(test_df[common_columns])
    
    # 코사인 유사도 계산
    feature_sim = cosine_similarity(survey_features_scaled, test_features_scaled).flatten()
    
    # 가격 유사도와 특성 유사도 결합
    combined_sim = price_sim * price_weight + feature_sim * (1 - price_weight)
    
    # 유사도가 가장 높은 상위 top_n개의 인덱스 찾기
    top_indices = np.argsort(combined_sim)[-top_n:][::-1]
    
    similar_products = test_df.iloc[top_indices].copy()
    similar_products['similarity'] = combined_sim[top_indices]
    
    return similar_products

# 예시 사용
# survey_row는 mouse_testdf로부터 가져온 단일 행 데이터프레임입니다.
# test_df는 비교 대상인 전체 제품 데이터 프레임입니다.
similar_products = find_similar_products(mouse_testdf, test_df, top_n=4, price_weight=0.5)

print(similar_products['product_id'])

# # 1단계 특정 product_id에 해당하는 상품 조회
# def get_product_by_id(product_id, df):
#     return df[df['product_id'] == product_id]


# # 조회된 상품을 기준으로 유사한 상품 찾기
# # similar_products에서 각 상품의 product_id를 사용하여 유사한 상품 찾기
# for product_id in similar_products['product_id']:
#     # 해당 product_id에 해당하는 상품 조회
#     product_row = get_product_by_id(product_id, test_df)

#     # 해당 상품과 유사한 상품 찾기 (자기 자신은 제외)
#     similar_to_similar = find_similar_products(product_row, test_df.drop(product_row.index), top_n=3, price_weight=0.5)
    
#     print(f"Similar products to Product ID {product_id}:")
#     print(similar_to_similar[['product_id', 'product_name', 'similarity']])
#     print("\n")

# print(similar_products)
# # for문 돌면서 유사 상품과 유사한 상품 추천해줌
# def calculate_price_similarity2(prices, small_value=1):
#     # 가격 차이 계산
#     price_diff = np.abs(prices.reshape(-1, 1) - prices.reshape(1, -1))
#     # 가격 차이의 역수를 유사도로 사용 (0으로 나누는 것을 방지하기 위해 small_value 추가)
#     price_similarity = 1 / (price_diff + small_value)
#     return price_similarity

# def find_similar_products2(product_id, df, top_n=3):
#     # 가격 유사도 계산
#     prices = df['mouse_price'].to_numpy()
#     price_sim = calculate_price_similarity2(prices)
    
#     # 제품명을 제외한 속성만 선택하고, 'prod_price'도 제외, 'product_id'도 제외
#     features = df.drop(columns=['product_name', 'mouse_price', 'product_id'])
#     scaler = StandardScaler()
#     features_scaled = scaler.fit_transform(features)
    
#     # 코사인 유사도 계산
#     cosine_sim = cosine_similarity(features_scaled, features_scaled)
    
#     # 총 유사도 = 가격 유사도 * 가중치 + 코사인 유사도 * (1 - 가중치)
#     # 여기서는 가격 유사도의 중요도를 높이기 위해 가중치를 조절합니다.
#     total_sim = price_sim * 0.5 + cosine_sim * 0.5
    
#     # 자기 자신을 제외한 유사 제품 찾기
#     similarity_scores = total_sim[product_id]
    
#     # 자기 자신을 제외하고 유사도가 높은 순으로 정렬하여 상위 N개 선택
#     similar_indices = np.argsort(similarity_scores)[-top_n-1:-1][::-1]
#     similar_indices = similar_indices[similar_indices != product_id]  # 자기 자신 제외
    
#     if len(similar_indices) > top_n:  # 만약 자기 자신을 제외하고도 N개보다 많다면, 상위 N개만 선택
#         similar_indices = similar_indices[:top_n]
    
#     # 유사 제품 반환
#     result_df = df.iloc[similar_indices].copy()
#     result_df['similarity'] = similarity_scores[similar_indices]
#     result_df = result_df.sort_values(by='similarity', ascending=False)
    
#     return result_df


# for i in range(len(similar_products)):
#     # similar_products DataFrame에서 i번째 행의 'product_id' 값을 가져옵니다.
#     product_id = similar_products.iloc[i]['product_id']
#     # 수정된 product_id를 사용하여 함수를 호출합니다.
#     print(find_similar_products2(product_id, test_df, top_n=3))
# # index = 400
# # similar_products = find_similar_products(index, test_df)

# # print(similar_products)
