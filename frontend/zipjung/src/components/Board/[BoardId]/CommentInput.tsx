/* eslint-disable no-console */
import {useState} from 'react';
import axios from 'axios';
import CreateButton from '@/components/Board/Create/CreateButton';
import styles from '@/components/Board/[BoardId]/CommentInput.module.scss';

function CommentInput() {
  const [comment, setComment] = useState<string>('');

  const postComment = async () => {
    try {
      await axios.post<string>('/api/comment', {comment});
      window.location.reload();
    } catch (error) {
      console.error('등록 실패:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const handleClick = () => {
    postComment().catch(err => {
      console.log(err);
    });
  };
  return (
    <div className={styles.commentInputDiv}>
      <input
        id="commentInput"
        type="text"
        placeholder="댓글을 입력하세요"
        value={comment}
        onChange={handleChange}
        className={styles.commentInput}
      />
      <CreateButton onClick={handleClick} />
    </div>
  );
}

export default CommentInput;
