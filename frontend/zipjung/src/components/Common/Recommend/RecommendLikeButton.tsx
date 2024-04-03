import {FaRegHeart, FaHeart} from 'react-icons/fa';
import styles from '@/components/Common/Recommend/RecommendLikeButton.module.scss';

interface RecommendLikeButtonProps {
  isLiked: boolean;
  onToggleLike: () => void;
}

function RecommendLikeButton({
  isLiked,
  onToggleLike,
}: RecommendLikeButtonProps) {
  return (
    <>
      <button onClick={onToggleLike}>
        {isLiked ? (
          <FaHeart className={styles.unlike} />
        ) : (
          <FaRegHeart className={styles.like} />
        )}
      </button>
    </>
  );
}

export default RecommendLikeButton;
