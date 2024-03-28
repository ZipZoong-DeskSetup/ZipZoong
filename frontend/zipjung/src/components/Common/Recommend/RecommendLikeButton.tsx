/* eslint-disable no-console */
import {useState, useEffect} from 'react';
import axios from 'axios';
import {FaRegHeart, FaHeart} from 'react-icons/fa';
import {Hardware} from '@/types/Recommendation';
import styles from '@/components/Common/Recommend/RecommendLikeButton.module.scss';

type PostResponse = {
  id: number;
};

function RecommendLikeButton({itemId}: {itemId: number | undefined}) {
  const [isLiked, setIsLiked] = useState<boolean | null>(null);
  const [combinationId, setCombinationId] = useState<number | null>(null);

  // 좋아요 상태를 초기화하는 함수
  // TODO: 주석 풀기
  useEffect(() => {
    axios
      .get<Hardware[]>(
        `${process.env.NEXT_PUBLIC_BASE_URL}/favorite/combination`,
      )
      .then(response => {
        const favorites = response.data;
        const found = favorites.find(favorite => favorite.id === itemId);
        setIsLiked(!!found);
        if (found) {
          setCombinationId(found.id);
        }
      })
      .catch(error => console.error('Fetching favorites failed', error));
  }, [itemId]);

  const handleLike = () => {
    if (isLiked && combinationId !== null) {
      // 좋아요를 취소하는 경우
      // TODO: 주석 풀기
      axios
        .delete(
          `${process.env.NEXT_PUBLIC_BASE_URL}/favorite/combination/${combinationId}`,
        )
        .then(() => {
          setIsLiked(false);
        })
        // eslint-disable-next-line no-console
        .catch(error => console.error('Unliking failed', error));
      setIsLiked(false);
    } else {
      // 좋아요를 하는 경우
      // TODO: 주석 풀기
      axios
        .post<PostResponse>(
          `${process.env.NEXT_PUBLIC_BASE_URL}/favorite/combination`,
          {itemId},
        )
        .then(response => {
          setIsLiked(true);
          setCombinationId(response.data.id);
        })
        .catch(error => console.error('Liking failed', error));
      setIsLiked(true);
    }
  };

  return (
    <>
      {isLiked ? (
        <button onClick={handleLike}>
          <FaHeart className={styles.like} />
        </button>
      ) : (
        <button onClick={handleLike}>
          <FaRegHeart className={styles.unlike} />
        </button>
      )}
    </>
  );
}

export default RecommendLikeButton;
