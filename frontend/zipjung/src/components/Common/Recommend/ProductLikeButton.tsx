/* eslint-disable no-console */
import {useState} from 'react';
import axios from 'axios';
import {FaBookmark, FaRegBookmark} from 'react-icons/fa6';
import useUserInfoStore from '@/stores/userInfo';
import styles from '@/components/Common/Recommend/ProductLikeButton.module.scss';

function ProductLikeButton({itemId}: {itemId: number}) {
  const [isLiked, setIsLiked] = useState<boolean | null>(null);
  const {ZustandToken} = useUserInfoStore();

  const handleLike = () => {
    if (isLiked) {
      // 좋아요를 취소하는 경우
      axios
        .delete(`${process.env.NEXT_PUBLIC_BASE_URL}/product-like/${itemId}`, {
          headers: {
            Authorization: `Bearer ${ZustandToken}`,
            // Authorization:
            //   'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoiUk9MRV9VU0VSIiwidXNlcklkIjoiZ29vZ2xlIDExNTk4MzE4OTYyODE1NDU2MTU1NSIsImlhdCI6MTcxMjE1MTI2MSwiZXhwIjoxNzEyMjM3NjYxfQ.vG8VqgcCYl8BnlkhZkrEvpAqgf9Pu4SCKRR4s6Wv3iDVC0bpWvVChyFbTPe5NIhzY3dkwBC8RUrv0dphorbK6g',
          },
        })
        .then(() => {
          // console.log('삭제됨');
          setIsLiked(false);
        })
        .catch(error => console.error('Unliking failed', error));
    } else {
      // 좋아요를 하는 경우
      console.log(itemId);
      axios
        .post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/product-like/${itemId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${ZustandToken}`,
              // Authorization:
              //   'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoiUk9MRV9VU0VSIiwidXNlcklkIjoiZ29vZ2xlIDExNTk4MzE4OTYyODE1NDU2MTU1NSIsImlhdCI6MTcxMjE1MTI2MSwiZXhwIjoxNzEyMjM3NjYxfQ.vG8VqgcCYl8BnlkhZkrEvpAqgf9Pu4SCKRR4s6Wv3iDVC0bpWvVChyFbTPe5NIhzY3dkwBC8RUrv0dphorbK6g',
            },
          },
        )
        .then(() => {
          // console.log('추가됨');
          setIsLiked(true);
        })
        .catch(error => console.error('Liking failed', error));
    }
  };

  return (
    <>
      {isLiked ? (
        <button onClick={handleLike}>
          <FaBookmark className={styles.like} />
        </button>
      ) : (
        <button onClick={handleLike}>
          <FaRegBookmark className={styles.unlike} />
        </button>
      )}
    </>
  );
}

export default ProductLikeButton;
