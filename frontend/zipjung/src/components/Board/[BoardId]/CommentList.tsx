/* eslint-disable no-console */
import Image from 'next/image';
import {useState} from 'react';
// import ModifyButton from '@/components/Board/[BoardId]/ModifyButton';
import DeleteButton from '@/components/Board/[BoardId]/DeleteButton';
import styles from '@/components/Board/[BoardId]/CommentList.module.scss';

interface Comment {
  commentId: number;
  commentContent: string;
  commentCreator: string;
  commentCreatorId: number;
  commentCreatorImg: string;
  commentCreatedAt: string;
}

interface CommentsResponse {
  comments: Comment[];
}

const COMMENTS_PER_PAGE = 5;
function CommentList({comments}: CommentsResponse) {
  const [visibleCount, setVisibleCount] = useState(COMMENTS_PER_PAGE);

  const showMoreComments = () => {
    setVisibleCount(prevCount => prevCount + COMMENTS_PER_PAGE);
  };

  const visibleComments = comments.slice(0, visibleCount);
  return (
    <div>
      <div>
        {visibleComments.map(comment => (
          <div key={comment.commentId} className={styles.CommentListContain}>
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
              <button>수정</button>
              <DeleteButton
                key={comment.commentId}
                contentId={comment.commentId}
                contentUrl="/api/comment"
              />
            </div>
          </div>
        ))}
        {visibleCount < comments.length && (
          <button onClick={showMoreComments}>더보기</button>
        )}
      </div>
    </div>
  );
}

export default CommentList;
