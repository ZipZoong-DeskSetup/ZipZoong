/* eslint-disable no-console */
import {useEffect, useState} from 'react';
import axios from 'axios';
import useBoardProductStore from '@/stores/boardRecommend';
import useUserInfoStore from '@/stores/userInfo';
import ChooseRecommendList from '@/components/Board/Create/ChooseRecommendList';
import styles from '@/components/Board/ChooseRecommendModal.module.scss';

interface IProducts {
  id: number;
  name: string;
  price: number;
  img: string;
  brand: null | string;
  url: null | string;
  category: 'KEYBOARD' | 'MONITOR' | 'MOUSE';
}

interface ICombination {
  combinationId: number;
  products: IProducts[];
  totalPrice: number;
}

interface ICombinationResponse {
  message: string;
  data: ICombination[];
}

interface ChooseRecommendListProps {
  onClick: () => void; // 모달을 닫는 함수
}

function ChooseRecommendModal({onClick}: ChooseRecommendListProps) {
  const [likeRecommend, setLikeRecommend] = useState<ICombination[]>([]);
  const {zustandLikedCombination, setZustandLikedCombination} =
    useBoardProductStore();
  const {ZustandToken} = useUserInfoStore();

  useEffect(() => {
    // 조합 데이터 요청
    const fetchCombinations = async () => {
      try {
        const response = await axios.get<ICombinationResponse>(
          `${process.env.NEXT_PUBLIC_BASE_URL}/combination`,
          {
            headers: {
              Authorization: `Bearer ${ZustandToken}`,
            },
          },
        );
        setLikeRecommend(response.data.data); // 데이터 설정
      } catch (error) {
        console.error('Error fetching combinations', error);
      }
    };

    fetchCombinations().catch(error => {
      console.error(error);
    });
  }, [ZustandToken]);

  // 조합 선택 함수 수정
  const onSelectCombination = (combinationId: number) => {
    setZustandLikedCombination(combinationId);
    console.log(zustandLikedCombination);
  };

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        <h2>추천 상품 목록</h2>
        {likeRecommend.length > 0 ? (
          likeRecommend.map(combination => (
            // 각 조합을 ChooseRecommendList 컴포넌트로 렌더링
            <ChooseRecommendList
              key={combination.combinationId}
              combination={combination}
              onSelectCombination={onSelectCombination}
            />
          ))
        ) : (
          <p>관심있는 제품이 없습니다.</p>
        )}
        {/* TODO: LikeRecommend 지우기 */}
        {/* {LikeRecommend.length > 0 ? (
          LikeRecommend.map(combination => (
            // 각 조합을 ChooseRecommendList 컴포넌트로 렌더링
            <ChooseRecommendList
              key={combination.combinationId}
              combination={combination}
              onSelectCombination={onSelectCombination}
            />
          ))
        ) : (
          <p>관심있는 제품이 없습니다.</p>
        )} */}
        <button className={styles.closeButton} onClick={onClick}>
          닫기
        </button>
      </div>
    </div>
  );
}

export default ChooseRecommendModal;
