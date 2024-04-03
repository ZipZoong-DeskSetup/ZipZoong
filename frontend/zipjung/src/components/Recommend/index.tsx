/* eslint-disable no-console */

'use client';

import {useState, useEffect} from 'react';
import {useRouter} from 'next/navigation';
import axios from 'axios';
import {TiArrowSortedDown} from 'react-icons/ti';
import {Hardware} from '@/types/Recommendation';
import RecommendImgList from '@/components/Common/Recommend/RecommendImgList';
import RecommendList from '@/components/Common/Recommend/RecommendList';
import RecommendDetailButton from '@/components/Common/Recommend/GoRecommendDetailButton';
// import RecommendLikeButton from '@/components/Common/Recommend/RecommendLikeButton';
import useUserInfoStore from '@/stores/userInfo';
import useRecommendStore from '@/stores/recommend';
import styles from '@/components/Recommend/index.module.scss';

interface RecommendResponse {
  message: string;
  data: Hardware[];
}

// 상세 정보 조회 API 응답 데이터의 타입 정의
interface CombinationDetailResponse {
  message: string;
  data: CombinationDetail;
}

interface CombinationDetail {
  combinationId: number;
  monitors: MonitorDetail[];
  keyboard: KeyboardDetail;
  mouse: MouseDetail;
  similarProduct: SimilarProduct;
  totalPrice: string;
}

interface MonitorDetail {
  id: number;
  name: string;
  price: string;
  img: string;
  brand: string;
  url: string;
  category: string;
  size: number;
  resolution: string;
  aspectRatio: string;
  refreshRate: number;
  panelType: string;
  panelFormType: string;
  // 추가적인 모니터 세부 정보
}

interface KeyboardDetail {
  id: number;
  name: string;
  price: string;
  img: string;
  brand: string;
  url: string;
  category: string;
  connect: string;
  connectInterface?: string | null;
  keySwitch: string;
  led: string;
  num: number;
  force?: string | null;
  color: string;
  form: string;
  contact: string;
  // 추가적인 키보드 세부 정보
}

interface MouseDetail {
  id: number;
  name: string;
  price: string;
  img: string;
  brand: string;
  url: string;
  category: string;
  connect: string;
  connectInterface?: string | null;
  mouseType: string;
  dpi?: string | null;
  color: string;
  weight?: string | null;
  width: number;
  length: number;
  height: number;
  isSound: boolean;
}

interface SimilarProduct {
  [key: string]: Product[];
}

interface Product {
  id: number;
  name: string;
  price: number;
  img: string;
  brand: string;
  url: string;
  category: string;
}

function Form() {
  const {
    ZustandRecommendList,
    setZustandRecommendList,
    setZustandRecommendDetail,
  } = useRecommendStore();
  const {ZustandToken} = useUserInfoStore();
  const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(
    null,
  );

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<RecommendResponse>(
          `${process.env.NEXT_PUBLIC_BASE_URL}/combination/recommend`,
          {
            headers: {
              Authorization: `Bearer ${ZustandToken}`,
              // Authorization:
              //   'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoiUk9MRV9VU0VSIiwidXNlcklkIjoiZ29vZ2xlIDExNTk4MzE4OTYyODE1NDU2MTU1NSIsImlhdCI6MTcxMjAzODU2NiwiZXhwIjoxNzEyMTI0OTY2fQ.FEYYv92apqc8S2YJ3VT9Pwo2L9KIQ_veQnDJO2BJt52gBJwozpzHZ5YPRcOSrdt8-1F12lWNtGkRbFnVYN9QXg',
            },
          },
        );
        setZustandRecommendList(response.data.data);
        // console.log(ZustandRecommendList);
      } catch (error) {
        console.error('Fetching recommend list failed:', error);
      }
    };

    fetchData().catch(err => {
      console.error(err);
    });
  }, [setZustandRecommendList, ZustandToken]);

  // 상세 페이지로 이동하는 함수를 배열 인덱스 기반으로 변경

  // 상세 정보 조회를 위한 비동기 함수
  const fetchCombinationDetail = async (index: number) => {
    const selectedCombination = ZustandRecommendList[index];
    const productIds = [
      ...selectedCombination.monitors.map(monitor => ({productId: monitor.id})),
      {productId: selectedCombination.keyboard.id},
      {productId: selectedCombination.mouse.id},
    ];

    try {
      const response = await axios.post<CombinationDetailResponse>(
        `${process.env.NEXT_PUBLIC_BASE_URL}/combination/recommend/info`,
        productIds,
      );
      setZustandRecommendDetail(response.data.data);
      router.push('/recommend/detail');
    } catch (error) {
      console.error('조합의 상세 정보 조회 실패:', error);
    }
  };

  const handleDetailClick = (index: number) => {
    const selectedCombination = ZustandRecommendList[index];
    console.log(selectedCombination);
    fetchCombinationDetail(index).catch(err => {
      console.error(err);
    }); // 비동기 로직을 처리하는 별도의 함수 호출
  };

  const toggleDropdown = (index: number) => {
    if (openDropdownIndex === index) {
      setOpenDropdownIndex(null); // 이미 열려있다면 닫기
    } else {
      setOpenDropdownIndex(index); // 닫혀있다면 열기
    }
  };

  return (
    <div className={styles.contains}>
      <div className={styles.ment}>설문 기반으로 도출된 결과입니다.</div>
      <div className={styles.simulationDiv}>
        <div className={styles.simulationDiv2}>
          <iframe
            src="https://deskspacing.com/mainApp.html"
            width="900px"
            height="400px"
            style={{
              transform: 'scale(0.7)',
              transformOrigin: '0 0',
              width: '140%',
              height: '140%',
              border: '0',
              minWidth: '900px',
            }}
          ></iframe>
        </div>
        <div className={styles.memo}>
          * 길이 입력 시 인치(inch)로 입력해주세요. *
        </div>
      </div>
      <div>
        {ZustandRecommendList.map((item, index) => [
          <div className={styles.contain} key={item.combinationId}>
            <div className={styles.recommendHead}>
              <div className={styles.recommendId}>추천</div>
              {/* 관심목록 추가 */}
              {/* <div className={styles.shareLike}>
                <RecommendLikeButton
                  key={item.combinationId}
                  item={item}
                  updateCombinationId={updateCombinationId}
                  itemIndex={index}
                />
              </div> */}
            </div>

            <div className={styles.ImgPrice}>
              <div>
                <RecommendImgList
                  key={item.combinationId}
                  monitorImg={item.monitors[0].img}
                  keyboardImg={item.keyboard.img}
                  mouseImg={item.mouse.img}
                />
              </div>
              <div className={styles.BtnPrice}>
                <RecommendDetailButton
                  onClick={() => handleDetailClick(index)}
                />
                <div className={styles.price}>{item.totalPrice} 원</div>
              </div>
            </div>
            <div className={styles.toggleButton}>
              <button onClick={() => toggleDropdown(index)} id="dropdownButton">
                <TiArrowSortedDown className={styles.toggleBtn} />
              </button>
            </div>
            {openDropdownIndex === index && <RecommendList item={item} />}
          </div>,
        ])}
      </div>
    </div>
  );
}

export default Form;
