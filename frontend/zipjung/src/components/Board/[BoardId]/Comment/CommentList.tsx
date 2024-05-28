/* eslint-disable no-console */
import {useState} from 'react';
import CommentModifyInput from '@/components/Board/[BoardId]/Comment/CommentModifyInput';
import CommentListItem from '@/components/Board/[BoardId]/Comment/CommentListItem';
import styles from '@/components/Board/[BoardId]/Comment/CommentList.module.scss';

interface Comment {
  commentId: number;
  commentContent: string;
  commentCreator: string;
  commentCreatorId: string;
  commentCreatorImg: string | null;
  commentCreatedAt: string;
}

interface CommentsResponse {
  comments: Comment[];
}

// 댓글 5개씩 더 보여주기
const COMMENTS_PER_PAGE = 5;
function CommentList({comments}: CommentsResponse) {
  const [visibleCount, setVisibleCount] = useState(COMMENTS_PER_PAGE);
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [commentContent, setCommentContent] = useState<string>();

  const showMoreComments = () => {
    setVisibleCount(prevCount => prevCount + COMMENTS_PER_PAGE);
  };

  const toggleModify = (commentId: number, comment: string) => {
    // 현재 선택된 댓글만 수정 상태로 전환하고, 나머지는 모두 false로 설정
    setEditingCommentId(prevId => (prevId === commentId ? null : commentId));
    setCommentContent(comment);
    console.log(commentContent);
  };

  const cancelEditing = () => {
    setEditingCommentId(null);
  };

  const visibleComments = comments?.slice(0, visibleCount) || [];
  return (
    <div>
      <div>
        {visibleComments.map(comment =>
          editingCommentId === comment.commentId ? (
            <CommentModifyInput
              key={comment.commentId}
              comment={comment}
              cancelEditing={cancelEditing}
            />
          ) : (
            <CommentListItem
              key={comment.commentId}
              comment={comment}
              toggleModify={() =>
                toggleModify(comment.commentId, comment.commentContent)
              }
            />
          ),
        )}
        {visibleCount < (comments?.length || 0) && (
          <button onClick={showMoreComments} className={styles.plusButton}>
            +더보기
          </button>
        )}
      </div>
    </div>
  );
}

export default CommentList;
