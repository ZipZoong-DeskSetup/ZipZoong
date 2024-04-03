/* eslint-disable no-console */
import {useState} from 'react';
import axios from 'axios';
import {FaBookmark, FaRegBookmark} from 'react-icons/fa6';
// import {Hardware} from '@/types/Recommendation';
import styles from '@/components/Common/Recommend/ProductLikeButton.module.scss';

type PostResponse = {
  id: number;
};

function ProductLikeButton({itemId}: {itemId: number}) {
  const [isLiked, setIsLiked] = useState<boolean | null>(null);
  const [productId, setProductId] = useState<number | null>(null);

  // 좋아요 상태를 초기화하는 함수
  // TODO: 주석풀기
  // useEffect(() => {
  //   axios
  //     .get<Hardware[]>(`${process.env.NEXT_PUBLIC_BASE_URL}/favorite/product`)
  //     .then(response => {
  //       // itemId와 일치하는 항목을 찾습니다.
  //       const found = response.data.find(hardware => hardware.id === itemId);
  //       setIsLiked(!!found);
  //       if (found) {
  //         setProductId(found.id);
  //       }
  //     })
  //     .catch(error => console.error('Fetching favorites failed', error));
  // }, [itemId]);

  const handleLike = () => {
    if (isLiked) {
      // 좋아요를 취소하는 경우
      // TODO: 주석풀기
      axios
        .delete(
          `${process.env.NEXT_PUBLIC_BASE_URL}/favorite/product/${productId}`,
        )
        .then(() => {
          setIsLiked(false);
        })
        .catch(error => console.error('Unliking failed', error));
      setIsLiked(false);
    } else {
      // 좋아요를 하는 경우
      // TODO: 주석풀기
      axios
        .post<PostResponse>('/favorite/product', {itemId})
        .then(response => {
          setIsLiked(true);
          setProductId(response.data.id);
        })
        .catch(error => console.error('Liking failed', error));
      setIsLiked(true);
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
