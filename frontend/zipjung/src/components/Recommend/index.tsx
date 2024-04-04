/* eslint-disable no-alert */
/* eslint-disable no-console */

'use client';

import {useState, useEffect} from 'react';
import {useRouter} from 'next/navigation';
import axios from 'axios';
import {TiArrowSortedDown} from 'react-icons/ti';
import {GrPowerCycle} from 'react-icons/gr';
import {Hardware} from '@/types/Recommendation';
import RecommendImgList from '@/components/Common/Recommend/RecommendImgList';
import RecommendList from '@/components/Common/Recommend/RecommendList';
import RecommendDetailButton from '@/components/Common/Recommend/GoRecommendDetailButton';
import RecommendLikeButton from '@/components/Common/Recommend/RecommendLikeButton';
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

interface Combination {
  combinationId: number;
  monitors: MonitorDetail[];
  keyboard: KeyboardDetail;
  mouse: MouseDetail;
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

interface LikedCombinations {
  [index: number]: {combinationId: number; isLiked: boolean};
}

interface LikeRecommendResponse {
  message: string;
  data: Combination;
}

function Form() {
  const {
    ZustandRecommendList,
    setZustandRecommendList,
    setZustandRecommendDetail,
  } = useRecommendStore();
  const {ZustandToken} = useUserInfoStore();
  const [token, setToken] = useState<string>('');
  const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(
    null,
  );
  const [likedCombinations, setLikedCombinations] = useState<LikedCombinations>(
    {},
  );
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가
  const router = useRouter();

  useEffect(() => {
    setIsLoading(true);
    setToken(ZustandToken);

    axios
      .get<RecommendResponse>(
        `${process.env.NEXT_PUBLIC_BASE_URL}/combination/recommend`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            // Authorization:
            //   'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoiUk9MRV9VU0VSIiwidXNlcklkIjoiZ29vZ2xlIDExNTk4MzE4OTYyODE1NDU2MTU1NSIsImlhdCI6MTcxMjE1MTI2MSwiZXhwIjoxNzEyMjM3NjYxfQ.vG8VqgcCYl8BnlkhZkrEvpAqgf9Pu4SCKRR4s6Wv3iDVC0bpWvVChyFbTPe5NIhzY3dkwBC8RUrv0dphorbK6g',
          },
        },
      )
      .then(response => {
        if (response !== null) {
          setZustandRecommendList(response.data.data);
          setIsLoading(false);
        }
      })
      .catch(error => console.error('Fetching recommend list failed:', error));
  }, [setZustandRecommendList, ZustandToken, token]);

  if (isLoading) {
    return (
      <div className={styles.waitingMent}>
        추천을 받고 있습니다. 잠시만 기다려주세요...
      </div>
    );
  }

  if (ZustandRecommendList?.length === 0 && !isLoading) {
    return (
      <div className={styles.waitingMent}>추천 정보를 받고 있습니다...</div>
    );
  }
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
    // const selectedCombination = ZustandRecommendList[index];
    // console.log(selectedCombination);
    fetchCombinationDetail(index).catch(err => {
      console.error(err);
    });
  };

  const toggleDropdown = (index: number) => {
    if (openDropdownIndex === index) {
      setOpenDropdownIndex(null); // 이미 열려있다면 닫기
    } else {
      setOpenDropdownIndex(index); // 닫혀있다면 열기
    }
  };

  // 관심조합 추가/삭제
  // 관심조합 추가(axios요청)
  const addCombinationToLikes = async (index: number) => {
    const combination = ZustandRecommendList[index];
    const productIds = [
      ...combination.monitors.map(monitor => ({productId: monitor.id})),
      {productId: combination.keyboard.id},
      {productId: combination.mouse.id},
    ];

    try {
      const response = await axios.post<LikeRecommendResponse>(
        `${process.env.NEXT_PUBLIC_BASE_URL}/combination`,
        productIds,
        {
          headers: {
            Authorization: `Bearer ${ZustandToken}`,
            // Authorization:
            //   'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoiUk9MRV9VU0VSIiwidXNlcklkIjoiZ29vZ2xlIDExNTk4MzE4OTYyODE1NDU2MTU1NSIsImlhdCI6MTcxMjE1MTI2MSwiZXhwIjoxNzEyMjM3NjYxfQ.vG8VqgcCYl8BnlkhZkrEvpAqgf9Pu4SCKRR4s6Wv3iDVC0bpWvVChyFbTPe5NIhzY3dkwBC8RUrv0dphorbK6g',
          },
        },
      );

      // 응답에서 combinationId 받기
      const {combinationId} = response.data.data;
      // 상태 업데이트
      setLikedCombinations(prevState => ({
        ...prevState,
        [index]: {combinationId, isLiked: true},
      }));
    } catch (error) {
      console.error('Error adding combination to likes:', error);
    }
  };

  // 관심조합 삭제
  const removeCombinationFromLikes = async (index: number) => {
    const {combinationId} = likedCombinations[index];
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_BASE_URL}/combination/${combinationId}`,
        {
          headers: {
            Authorization: `Bearer ${ZustandToken}`,
            // Authorization:
            //   'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoiUk9MRV9VU0VSIiwidXNlcklkIjoiZ29vZ2xlIDExNTk4MzE4OTYyODE1NDU2MTU1NSIsImlhdCI6MTcxMjE1MTI2MSwiZXhwIjoxNzEyMjM3NjYxfQ.vG8VqgcCYl8BnlkhZkrEvpAqgf9Pu4SCKRR4s6Wv3iDVC0bpWvVChyFbTPe5NIhzY3dkwBC8RUrv0dphorbK6g',
          },
        },
      );

      // 상태 업데이트
      setLikedCombinations(prevState => {
        const newState = {...prevState};
        delete newState[index];
        return newState;
      });
    } catch (error) {
      console.error('Error removing combination from likes:', error);
    }
  };

  // `isLiked` 상태를 결정하는 로직 변경
  const isCombinationLiked = (index: number): boolean => {
    return !!likedCombinations[index]?.isLiked;
  };

  const toggleLike = (index: number) => {
    if (!ZustandToken) {
      // 경고 메시지 표시
      alert('로그인이 필요한 기능입니다.');
      // 로그인 페이지로 리다이렉트
      router.push('/user/login');
      return;
    }

    const isCurrentlyLiked = isCombinationLiked(index);
    if (isCurrentlyLiked) {
      removeCombinationFromLikes(index).catch(error => {
        console.error(error);
      });
    } else {
      addCombinationToLikes(index).catch(error => {
        console.error(error);
      });
    }
  };

  const handleRestartRecommendation = () => {
    router.push('/survey');
  };

  return (
    <div className={styles.contains}>
      <div className={styles.ment}>설문 기반으로 도출된 결과입니다.</div>
      <div
        onClick={handleRestartRecommendation}
        className={styles.restartButton}
      >
        <GrPowerCycle />
        <div>다시 추천받기</div>
      </div>
      <div className={styles.simulationDiv}>
        <div className={styles.simulationDiv2}>
          <iframe
            src="https://deskspacing.com/mainApp.html"
            width="900px"
            height="450px"
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
        {ZustandRecommendList &&
          ZustandRecommendList?.map((item, index) => [
            <div className={styles.contain} key={item.combinationId}>
              <div className={styles.recommendHead}>
                <div className={styles.recommendId}>추천 {index + 1}</div>
                {/* 관심목록 추가 */}
                <div className={styles.shareLike}>
                  <RecommendLikeButton
                    isLiked={isCombinationLiked(index)}
                    onToggleLike={() => toggleLike(index)}
                  />
                </div>
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
                  <div className={styles.totalPrice}>{item.totalPrice} 원</div>
                </div>
              </div>
              <div className={styles.toggleButton}>
                <button
                  onClick={() => toggleDropdown(index)}
                  id="dropdownButton"
                >
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
