/* eslint-disable no-console */
import {useState} from 'react';
import axios from 'axios';
import CreateButton from '@/components/Board/Create/CreateButton';
import useUserInfoStore from '@/stores/userInfo';
import styles from '@/components/Board/[BoardId]/Comment/CommentInput.module.scss';

interface CommentInputProps {
  boardId: number | null;
}

function CommentInput({boardId}: CommentInputProps) {
  const [comment, setComment] = useState<string>('');
  const {ZustandToken} = useUserInfoStore();

  const postComment = async () => {
    try {
      await axios.post<string>(
        `${process.env.NEXT_PUBLIC_BASE_URL}/comment`,
        {
          commentContent: comment,
          boardId,
        },
        {
          headers: {
            Authorization: `Bearer ${ZustandToken}`,
          },
        },
      );
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
