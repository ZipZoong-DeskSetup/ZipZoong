/* eslint-disable no-console */
// import {useState, useEffect} from 'react';
// import axios from 'axios';
// import {FaRegHeart, FaHeart} from 'react-icons/fa';
import {Hardware} from '@/types/Recommendation';
// import styles from '@/components/Common/Recommend/RecommendLikeButton.module.scss';
// import useUserInfoStore from '@/stores/userInfo';

interface RecommendProps {
  item: Hardware;
  updateCombinationId: (newCombinationId: number, itemIndex: number) => void;
  itemIndex: number;
}

// interface RecommendLikeResponse {
//   message: string;
//   data: Hardware[];
// }

function RecommendLikeButton({item}: RecommendProps) {
  console.log(item);
  // const [isLiked, setIsLiked] = useState<boolean | null>(null);
  // const [combinationId, setCombinationId] = useState<number | null>(null);
  // const {ZustandToken} = useUserInfoStore();

  // 좋아요 상태를 초기화하는 함수
  // TODO: 주석 풀기
  // useEffect(() => {
  //   axios
  //     .get<RecommendLikeResponse>(
  //       `${process.env.NEXT_PUBLIC_BASE_URL}/combination`,
  //       {
  //         headers: {
  //           // TODO: 주석 풀기
  //           Authorization: `Bearer ${ZustandToken}`,
  //           // Authorization:
  //           //   'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoiUk9MRV9VU0VSIiwidXNlcklkIjoiZ29vZ2xlIDExNTk4MzE4OTYyODE1NDU2MTU1NSIsImlhdCI6MTcxMjAzODU2NiwiZXhwIjoxNzEyMTI0OTY2fQ.FEYYv92apqc8S2YJ3VT9Pwo2L9KIQ_veQnDJO2BJt52gBJwozpzHZ5YPRcOSrdt8-1F12lWNtGkRbFnVYN9QXg',
  //         },
  //       },
  //     )
  //     .then(response => {
  //       const favorites = response.data.data;
  //       const found = favorites.find(
  //         favorite => favorite.combinationId === combinationId,
  //       );
  //       setIsLiked(!!found);
  //       if (found) {
  //         setCombinationId(found.combinationId);
  //       }
  //     })
  //     .catch(error => console.error('Fetching favorites failed', error));
  // }, []);

  // // 제품 id로 배열만들기
  // const monitorsProducts = item.monitors.map(monitor => ({
  //   productId: monitor.id,
  // }));

  // const keyboardProduct = {
  //   productId: item.keyboard.id,
  // };

  // const mouseProduct = {
  //   productId: item.mouse.id,
  // };

  // const allProducts = [...monitorsProducts, keyboardProduct, mouseProduct];

  // const handleLike = async () => {
  //   try{
  //   if (isLiked) {
  //     // 좋아요를 취소하는 경우(제품 조합으로 조합 상세 정보 조회 후 얻은 combinationId로 취소)
  //     axios
  //       .post(
  //         `${process.env.NEXT_PUBLIC_BASE_URL}/combination/${item.combinationId}`,
  //         allProducts,
  //         {
  //           headers: {
  //             // TODO: 주석 풀기
  //             Authorization: `Bearer ${ZustandToken}`,
  //             // Authorization:
  //             //   'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoiUk9MRV9VU0VSIiwidXNlcklkIjoiZ29vZ2xlIDExNTk4MzE4OTYyODE1NDU2MTU1NSIsImlhdCI6MTcxMjAzODU2NiwiZXhwIjoxNzEyMTI0OTY2fQ.FEYYv92apqc8S2YJ3VT9Pwo2L9KIQ_veQnDJO2BJt52gBJwozpzHZ5YPRcOSrdt8-1F12lWNtGkRbFnVYN9QXg',
  //           },
  //         },
  //       )
  //       .then(response => {
  //         const {combinationId} = response.data.data;
  //         axios.delete(
  //           `${process.env.NEXT_PUBLIC_BASE_URL}/combination/${item.combinationId}`,
  //           {
  //             headers: {
  //               // TODO: 주석 풀기
  //               Authorization: `Bearer ${ZustandToken}`,
  //               // Authorization:
  //               //   'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoiUk9MRV9VU0VSIiwidXNlcklkIjoiZ29vZ2xlIDExNTk4MzE4OTYyODE1NDU2MTU1NSIsImlhdCI6MTcxMjAzODU2NiwiZXhwIjoxNzEyMTI0OTY2fQ.FEYYv92apqc8S2YJ3VT9Pwo2L9KIQ_veQnDJO2BJt52gBJwozpzHZ5YPRcOSrdt8-1F12lWNtGkRbFnVYN9QXg',
  //             },
  //           },
  //         );
  //       });
  //     await axios
  //       .delete(
  //         `${process.env.NEXT_PUBLIC_BASE_URL}/combination/${item.combinationId}`,
  //         {
  //           headers: {
  //             // TODO: 주석 풀기
  //             Authorization: `Bearer ${ZustandToken}`,
  //             // Authorization:
  //             //   'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoiUk9MRV9VU0VSIiwidXNlcklkIjoiZ29vZ2xlIDExNTk4MzE4OTYyODE1NDU2MTU1NSIsImlhdCI6MTcxMjAzODU2NiwiZXhwIjoxNzEyMTI0OTY2fQ.FEYYv92apqc8S2YJ3VT9Pwo2L9KIQ_veQnDJO2BJt52gBJwozpzHZ5YPRcOSrdt8-1F12lWNtGkRbFnVYN9QXg',
  //           },
  //         },
  //       )
  //       .then(() => {
  //         console.log('좋아요취소됨');
  //         setIsLiked(false);
  //       })
  //       .catch(error => console.error('Unliking failed', error));
  //     setIsLiked(false);
  //   } else {
  //     // 좋아요를 하는 경우
  //     await axios
  //       .post<RecommendLikeResponse>(
  //         `${process.env.NEXT_PUBLIC_BASE_URL}/combination`,
  //         allProducts,
  //         {
  //           headers: {
  //             // TODO: 주석 풀기
  //             // Authorization: `Bearer ${ZustandRFToken}`,
  //             Authorization:
  //               'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoiUk9MRV9VU0VSIiwidXNlcklkIjoiZ29vZ2xlIDExNTk4MzE4OTYyODE1NDU2MTU1NSIsImlhdCI6MTcxMjAzODU2NiwiZXhwIjoxNzEyMTI0OTY2fQ.FEYYv92apqc8S2YJ3VT9Pwo2L9KIQ_veQnDJO2BJt52gBJwozpzHZ5YPRcOSrdt8-1F12lWNtGkRbFnVYN9QXg',
  //           },
  //         },
  //       )

  //         console.log('좋아요됨');
  //         setIsLiked(true);
  //       }
  //     }
  //       catch(err) {
  //         console.error(err)
  //       }
  //     // setIsLiked(true);
  //   }
  // };

  return (
    <>
      {/* {isLiked ? (
        <button onClick={handleLike}>
          <FaHeart className={styles.like} />
        </button>
      ) : (
        <button onClick={handleLike}>
          <FaRegHeart className={styles.unlike} />
        </button>
      )} */}
    </>
  );
}

export default RecommendLikeButton;
