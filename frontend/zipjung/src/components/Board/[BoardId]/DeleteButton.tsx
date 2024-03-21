import axios from 'axios';
import styles from '@/components/Board/[BoardId]/DeleteButton.module.scss';

interface DeleteButtonProps {
  boardId: number;
}

function DeleteButton({boardId}: DeleteButtonProps) {
  const handleDelete = async () => {
    try {
      await axios.delete(`/api/boards/${boardId}`);
      alert('게시글이 성공적으로 삭제되었습니다.');
      // 삭제 후 로직 (예: 목록 페이지로 리다이렉트)
      // router.push('/board');
    } catch (error) {
      console.error('게시글 삭제 중 오류가 발생했습니다.', error);
      alert('게시글 삭제에 실패했습니다.');
    }
  };

  // handleClick에서 async 함수를 호출할 때 void 연산자 사용
  const handleClick = () => {
    void handleDelete();
  };

  return (
    <div>
      <button className={styles.deleteButton} onClick={handleClick}>
        삭제
      </button>
    </div>
  );
}

export default DeleteButton;
