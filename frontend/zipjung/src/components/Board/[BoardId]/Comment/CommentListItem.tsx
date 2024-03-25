import Image from 'next/image';
import GoCommentModifyButton from '@/components/Board/[BoardId]/Comment/GoCommentModifyButton';
import CommentModifyInput from '@/components/Board/[BoardId]/Comment/CommentModifyInput';
import DeleteButton from '@/components/Board/[BoardId]/DeleteButton';
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
      <div className={styles.commentButtons}>
        {/* <GoCommentModifyButton onClick={}/> */}
        <button className={styles.GoUpdateButton} onClick={toggleModify}>
        수정
      </button>
        <CommentModifyInput comment={comment}/>
        <DeleteButton
          key={comment.commentId}
          contentId={comment.commentId}
          contentUrl="/api/comment"
        />
      </div>
    </div>
  );
}

export default CommentListItem;
