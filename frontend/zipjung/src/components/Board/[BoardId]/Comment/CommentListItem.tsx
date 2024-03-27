import Image from 'next/image';
import DeleteButton from '@/components/Board/[BoardId]/DeleteButton';
import useUserInfoStore from '@/stores/userInfo';
import styles from '@/components/Board/[BoardId]/Comment/CommentListItem.module.scss';

interface Comment {
  commentId: number;
  commentContent: string;
  commentCreator: string;
  commentCreatorId: number;
  commentCreatorImg: string;
  commentCreatedAt: string;
}

interface CommentProps {
  comment: Comment;
  toggleModify: () => void; // 수정 버튼 클릭 이벤트 핸들러
}

function CommentListItem({comment, toggleModify}: CommentProps) {
  const {ZustandId} = useUserInfoStore();

  return (
    <div className={styles.CommentListContain}>
      <div className={styles.CommentListdiv}>
        <div className={styles.CommentCreate}>
          <div className={styles.CommentCreator}>
            <Image
              src={comment.commentCreatorImg}
              width={25}
              height={25}
              alt="프로필이미지"
            />
            <div>{comment.commentCreator}</div>
          </div>
          <div>{comment.commentCreatedAt}</div>
        </div>
        <div>{comment.commentContent}</div>
      </div>
      {comment.commentCreatorId === ZustandId ? (
        <div className={styles.commentButtons}>
          <button className={styles.GoUpdateButton} onClick={toggleModify}>
            수정
          </button>
          <DeleteButton
            key={comment.commentId}
            contentId={comment.commentId}
            contentUrl="comment"
          />
        </div>
      ) : null}
    </div>
  );
}

export default CommentListItem;
