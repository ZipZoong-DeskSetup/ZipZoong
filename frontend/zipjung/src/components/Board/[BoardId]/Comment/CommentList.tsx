/* eslint-disable no-console */
import {useState} from 'react';
// import ModifyButton from '@/components/Board/[BoardId]/ModifyButton';
import CommentModifyInput from '@/components/Board/[BoardId]/Comment/CommentModifyInput';
import CommentListItem from '@/components/Board/[BoardId]/Comment/CommentListitem';

import styles from '@/components/Board/[BoardId]/Comment/CommentList.module.scss';

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
  const [modifyStates, setModifyStates] = useState<Record<number, boolean>>({});

  const showMoreComments = () => {
    setVisibleCount(prevCount => prevCount + COMMENTS_PER_PAGE);
  };

  const toggleModify = (commentId: number) => {
    setModify(prevModify => ({
      ...prevModify,
      [commentId]: !prevModify[commentId],
    }));
  };

  const visibleComments = comments.slice(0, visibleCount);
  return (
    <div>
      <div>
        {/* {visibleComments.map(comment => (
          <CommentListItem
            key={comment.commentId}
            comment={comment}
            className={styles.CommentListContain}
          />
        ))} */}
        {visibleComments.map(comment =>
          modifyStates[comment.commentId] ? (
            <CommentModifyInput key={comment.commentId} comment={comment} />
          ) : (
            <CommentListItem
              key={comment.commentId}
              comment={comment}
              toggleModify={() => toggleModify(comment.commentId)}
            />
          ),
        )}
        {visibleCount < comments.length && (
          <button onClick={showMoreComments}>더보기</button>
        )}
      </div>
    </div>
  );
}

export default CommentList;
