'use client';

import {useState} from 'react';
import ModifyButton from '@/components/Board/[BoardId]/ModifyButton';
import styles from '@/components/Board/[BoardId]/Comment/CommentModifyInput.module.scss';

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
}

function CommentModifyInput({comment}: CommentProps) {
  const [newComment, setNewComment] = useState(comment);

  return (
    <div className={styles.commentInputDiv}>
      <input type="text" className={styles.commentInput} />
      <ModifyButton />
    </div>
  );
}

export default CommentModifyInput;
