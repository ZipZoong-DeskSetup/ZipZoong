import mysql.connector
import pandas as pd
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.preprocessing import StandardScaler
from sklearn.preprocessing import MinMaxScaler
from sklearn.metrics.pairwise import euclidean_distances
from survey import monitor_testdf
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
    
    # 컬럼 이름을 조회하는 쿼리 실행
    column_query = """
    SELECT COLUMN_NAME
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_SCHEMA = 'a204_db'
    AND TABLE_NAME = 'product'
    AND (COLUMN_NAME LIKE '%product%' OR COLUMN_NAME LIKE '%monitor%')
    """
    cursor.execute(column_query)
    
    # 조회된 컬럼 이름들을 리스트에 저장
    columns = [column[0] for column in cursor.fetchall()]
    
    # 데이터를 조회하는 쿼리 작성
    query = f"SELECT {', '.join(columns)} FROM a204_db.product WHERE product_type='MONITOR'"
    
    # 데이터 조회
    cursor.execute(query)
    rows = cursor.fetchall()
    
finally:
    cursor.close()
    conn.close()  # 연결 종료



# 데이터프레임으로 변환
df = pd.DataFrame(rows, columns=columns)

'''
print(df.columns)
Index(['product_type', 'product_id', 'product_brand', 'product_img',
       'product_name', 'product_price', 'product_url', 'monitor_aspect_ratio',
       'monitor_panel_form', 'monitor_panel_type', 'monitor_refresh_rate',
       'monitor_resolution', 'monitor_size'],

'''
df = df.drop(['product_type', 'product_img', 'product_url', 'product_brand'], axis=1)

# 해상도부터 계산
df['monitor_res_width'] = 0
df['monitor_res_height'] = 0

df['monitor_resolution'] 
for i in range(len(df)):
    df['monitor_res_width'][i] = int(df['monitor_resolution'][i].split(' ')[0])
    df['monitor_res_height'][i] = int(df['monitor_resolution'][i].split('x')[1].strip()[:4])

df['monitor_usage'] = ''

for i in range(len(df)):
    if df['monitor_res_width'][i] >= 3840 and df['monitor_res_height'][i] >= 2160 and (df['monitor_panel_type'][i]=='OLED' or df['monitor_panel_type'][i] == 'IPS'):
#         if df['패널종류'][i] == 'OLED':
        df['monitor_usage'][i] = 'edit'
    elif df['monitor_res_width'][i] >= 1920 and df['monitor_res_height'][i] >= 1080 and df['monitor_refresh_rate'][i] >= 144:
#         if df['주사율'][i] >= 144:
        df['monitor_usage'][i] = 'game'
    elif df['monitor_res_width'][i] >= 1920 and df['monitor_res_height'][i] >= 1080 and df['monitor_aspect_ratio'][i] == '16:9':
        df['monitor_usage'][i] = 'work'
    elif df['monitor_res_width'][i] >= 2560 and df['monitor_res_height'][i] >= 1440:
        df['monitor_usage'][i] = 'prog'
    else:
        df['monitor_usage'][i] = 'hobby'

# 비율 전처리
for i in range(len(df)):
    if df['monitor_aspect_ratio'][i] not in ("16:9", "21:9", "32:9"):
        df['monitor_aspect_ratio'][i] = '기타'

for i in range(len(df)):
    if df['monitor_size'][i] > 32:
        df['monitor_size'][i] = '32인치이상'
    elif df['monitor_size'][i] == 32:
        df['monitor_size'][i] = '32인치'
    elif df['monitor_size'][i] == 27:
        df['monitor_size'][i] = '27인치'
    elif df['monitor_size'][i]==24:
        df['monitor_size'][i] = '24인치'
    elif df['monitor_size'][i] < 24:
        df['monitor_size'][i] = '24인치미만'
    else:
        df['monitor_size'][i] = None
    
# print(df)


# 원핫인코딩
df = pd.get_dummies(df, columns = ['monitor_panel_form', 'monitor_panel_type', 'monitor_usage', 'monitor_aspect_ratio', 'monitor_size'])

# print(df.isnull().sum())
# NaN값 포함했으면 drop
df = df.dropna(axis=0)
# print(df.columns)
df['monitor_price'] = df['product_price']
# print(df.columns)
'''
# print(df.columns)
Index(['product_id', 'product_brand', 'product_name', 'product_price',
       'monitor_refresh_rate', 'monitor_resolution', 'monitor_size',
       'monitor_res_width', 'monitor_res_height', 'monitor_panel_form_CURVED',
       'monitor_panel_form_FLAT', 'monitor_panel_type_IPS',
       'monitor_panel_type_OLED', 'monitor_panel_type_TN',
       'monitor_panel_type_VA', 'monitor_usage_edit', 'monitor_usage_game',
       'monitor_usage_hobby', 'monitor_usage_prog', 'monitor_usage_work',
       'monitor_aspect_ratio_16:9', 'monitor_aspect_ratio_21:9',
       'monitor_aspect_ratio_32:9', 'monitor_aspect_ratio_기타'],
      dtype='object')


'''
test_df = df[['product_id', 'product_name', 'monitor_usage_edit',
       'monitor_usage_game', 'monitor_usage_hobby', 'monitor_usage_prog',
       'monitor_usage_work', 'monitor_aspect_ratio_16:9',
       'monitor_aspect_ratio_21:9', 'monitor_aspect_ratio_32:9',
       'monitor_aspect_ratio_기타', 'monitor_size_24인치', 'monitor_size_24인치미만',
       'monitor_size_27인치', 'monitor_size_32인치', 'monitor_size_32인치이상',
       'monitor_price']]

# print(test_df.columns)


'''
['product_id', 'product_name', 'monitor_refresh_rate',
       'monitor_panel_form_CURVED', 'monitor_panel_form_FLAT',
       'monitor_panel_type_IPS', 'monitor_panel_type_OLED',
       'monitor_panel_type_TN', 'monitor_panel_type_VA', 'monitor_usage_edit',
       'monitor_usage_game', 'monitor_usage_hobby', 'monitor_usage_prog',
       'monitor_usage_work', 'monitor_aspect_ratio_16:9',
       'monitor_aspect_ratio_21:9', 'monitor_aspect_ratio_32:9',
       'monitor_aspect_ratio_기타', 'monitor_size_24인치', 'monitor_size_24인치미만',
       'monitor_size_27인치', 'monitor_size_32인치', 'monitor_size_32인치이상',
       'monitor_price'],



'''

# 가격 유사도 계산 함수
def calculate_price_similarity(price_test, price_survey, small_value=1):
    price_diff = np.abs(price_test - price_survey)
    price_similarity = 1 / (price_diff + small_value)
    return price_similarity

def find_similar_products(survey_row, test_df, top_n=4, price_weight=0.5):
    # survey_row는 단일 행 데이터프레임이고, test_df는 비교 대상인 데이터프레임입니다.
    
    # 공통 컬럼 선택
    common_columns = test_df.columns.intersection(survey_row.columns).tolist()
    common_columns = [col for col in common_columns if col not in ['product_name', 'monitor_price']]
    
    # 가격 유사도 계산
    price_survey = survey_row['monitor_price'].values[0]
    prices_test = test_df['monitor_price'].to_numpy()
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

similar_products = find_similar_products(monitor_testdf, test_df, top_n=4, price_weight=0.5)

print(similar_products['product_id'])

