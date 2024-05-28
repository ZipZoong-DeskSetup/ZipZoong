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
    cursor = conn.cursor()
    
    # 컬럼 이름과 데이터 조회 쿼리 실행
    column_query = """
    SELECT COLUMN_NAME
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_SCHEMA = %s
    AND TABLE_NAME = 'product'
    AND (COLUMN_NAME LIKE '%%product%%' OR COLUMN_NAME LIKE '%%mouse%%')
    """
    cursor.execute(column_query, (args.database,))
    columns = [column[0] for column in cursor.fetchall()]
    
    query = f"SELECT {', '.join(columns)} FROM product WHERE product_type='MOUSE'"
    cursor.execute(query)
    rows = cursor.fetchall()
    
finally:
    cursor.close()
    conn.close()

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
    prices = df['mouse_price'].to_numpy()
    price_diff = np.abs(prices.reshape(-1, 1) - prices.reshape(1, -1))
    small_value = 1
    price_similarity = 1 / (price_diff + small_value)
    
    # 제품명, 상품 가격, 상품 ID를 제외한 속성만 선택하여 코사인 유사도 계산
    features = df.drop(columns=['product_name', 'mouse_price', 'product_id'])
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