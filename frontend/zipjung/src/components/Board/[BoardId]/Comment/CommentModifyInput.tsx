/* eslint-disable no-console */

'use client';

import {useState} from 'react';
import axios from 'axios';
import ModifyButton from '@/components/Board/[BoardId]/ModifyButton';
import styles from '@/components/Board/[BoardId]/Comment/CommentModifyInput.module.scss';

interface Comment {
  commentId: number;
  commentContent: string;
  commentCreator: string;
  commentCreatorId: string;
  commentCreatorImg: string;
  commentCreatedAt: string;
}

interface CommentProps {
  comment: Comment;
  cancelEditing: () => void;
}

function CommentModifyInput({comment, cancelEditing}: CommentProps) {
  const [newCommentContent, setNewCommentContent] = useState(
    comment.commentContent,
  );

  const updateComment = async () => {
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_URL}/comments/${comment.commentId}`,
        {
          commentContent: newCommentContent,
        },
      );
      console.log('Update success:', response.data);
      window.location.reload();
    } catch (error) {
      console.error('Update failed:', error);
    }
    window.location.reload();
  };

  const handleClick = () => {
    updateComment().catch(err => {
      console.log(err);
    });
  };

  return (
    <div className={styles.commentInputDiv}>
      <input
        type="text"
        className={styles.commentInput}
        value={newCommentContent}
        onChange={e => setNewCommentContent(e.target.value)}
      />
      <div className={styles.commentButtons}>
        <button onClick={cancelEditing} className={styles.cancelButton}>
          취소
        </button>
        <ModifyButton onClick={handleClick} />
      </div>
    </div>
  );
}

export default CommentModifyInput;
