'use client';

// import {useState, useEffect} from 'react';
// import axios from 'axios';
import GoBackButton from '@/components/Common/GoBackButton';
import useRecommendStore from '@/stores/recommend';
// import useUserInfoStore from '@/stores/userInfo';
// import RecommendLikeButton from '@/components/Common/Recommend/RecommendLikeButton';
import RecommendTotalImgList from '@/components/Recommend/Detail/RecommendTotalImgList';
import styles from '@/components/Recommend/Detail/index.module.scss';

// interface Combination {
//   combinationId: number;
//   monitors: MonitorDetail[];
//   keyboard: KeyboardDetail;
//   mouse: MouseDetail;
//   totalPrice: string;
// }

// interface MonitorDetail {
//   id: number;
//   name: string;
//   price: string;
//   img: string;
//   brand: string;
//   url: string;
//   category: string;
//   size: number;
//   resolution: string;
//   aspectRatio: string;
//   refreshRate: number;
//   panelType: string;
//   panelFormType: string;
//   // 추가적인 모니터 세부 정보
// }

// interface KeyboardDetail {
//   id: number;
//   name: string;
//   price: string;
//   img: string;
//   brand: string;
//   url: string;
//   category: string;
//   connect: string;
//   connectInterface?: string | null;
//   keySwitch: string;
//   led: string;
//   num: number;
//   force?: string | null;
//   color: string;
//   form: string;
//   contact: string;
//   // 추가적인 키보드 세부 정보
// }

// interface MouseDetail {
//   id: number;
//   name: string;
//   price: string;
//   img: string;
//   brand: string;
//   url: string;
//   category: string;
//   connect: string;
//   connectInterface?: string | null;
//   mouseType: string;
//   dpi?: string | null;
//   color: string;
//   weight?: string | null;
//   width: number;
//   length: number;
//   height: number;
//   isSound: boolean;
// }

// interface LikeRecommendResponse {
//   message: string;
//   data: Combination;
// }

function Form() {
  const {ZustandRecommendDetail} = useRecommendStore();
  //   const [isLiked, setIsLiked] = useState<boolean>(false);
  //   const [combinationId, setCombinationId] = useState<number>(null);
  //   const {ZustandToken} = useUserInfoStore();

  //   const postCombination = () => {
  //     const productIds = [
  //       ...ZustandRecommendDetail?.monitors.map(monitor => ({productId: monitor.id})),
  //       {productId: ZustandRecommendDetail?.keyboard.id},
  //       {productId: ZustandRecommendDetail?.mouse.id},
  //     ];
  // axios.post<LikeRecommendResponse>(
  //         `${process.env.NEXT_PUBLIC_BASE_URL}/combination`,
  //         productIds,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${ZustandToken}`,
  //             // Authorization:
  //             //   'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoiUk9MRV9VU0VSIiwidXNlcklkIjoiZ29vZ2xlIDExNTk4MzE4OTYyODE1NDU2MTU1NSIsImlhdCI6MTcxMjE1MTI2MSwiZXhwIjoxNzEyMjM3NjYxfQ.vG8VqgcCYl8BnlkhZkrEvpAqgf9Pu4SCKRR4s6Wv3iDVC0bpWvVChyFbTPe5NIhzY3dkwBC8RUrv0dphorbK6g',
  //           },
  //         },
  //       );
  //     .then(response => {
  //       setCombinationId(response.data.data.combinationId);
  //         setIsLiked(true);
  //     })
  //   };

  //   const deleteCombination = async () => {
  //     if (combinationId) {
  // axios.delete(
  //           `${process.env.NEXT_PUBLIC_BASE_URL}/combination/${combinationId}`,
  //           {
  //             headers: {
  //               Authorization: `Bearer ${ZustandToken}`,
  //               // Authorization:
  //               //   'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoiUk9MRV9VU0VSIiwidXNlcklkIjoiZ29vZ2xlIDExNTk4MzE4OTYyODE1NDU2MTU1NSIsImlhdCI6MTcxMjE1MTI2MSwiZXhwIjoxNzEyMjM3NjYxfQ.vG8VqgcCYl8BnlkhZkrEvpAqgf9Pu4SCKRR4s6Wv3iDVC0bpWvVChyFbTPe5NIhzY3dkwBC8RUrv0dphorbK6g',
  //             },
  //           },
  //         );
  //         .then(() => setIsLiked(false))
  //         .catch((err) => console.error(err))

  //     }
  //   };

  //   const toggleLike = () => {
  //     if (isLiked) {
  //       deleteCombination();
  //     } else {
  //       postCombination();
  //     }
  //   };
  return (
    <div className={styles.detailContains}>
      <div className={styles.detailContain}>
        <div>
          <GoBackButton text="이전" />
        </div>
        {ZustandRecommendDetail ? (
          <div className={styles.detailDiv}>
            <div className={styles.detailHead}>
              <div className={styles.detailId}>추천 조합</div>
              <div className={styles.buttons}>
                {/* <RecommendLikeButton
                  isLiked={isCombinationLiked()}
                  onToggleLike={() => toggleLike()}
                /> */}
              </div>
            </div>
            <div>
              <RecommendTotalImgList
                key={ZustandRecommendDetail.combinationId}
                carouselList={ZustandRecommendDetail}
              />
            </div>
          </div>
        ) : (
          <div>조합을 선택하세요.</div>
        )}
      </div>
    </div>
  );
}

export default Form;
