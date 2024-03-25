/* eslint-disable no-console */
import axios from 'axios';
import {useRouter} from 'next/navigation';
import styles from '@/components/Board/[BoardId]/DeleteButton.module.scss';

interface DeleteButtonProps {
  contentId: number;
  contentUrl: string;
}

function DeleteButton({contentId, contentUrl}: DeleteButtonProps) {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      await axios.delete(`${contentUrl}/${contentId}`);
      // eslint-disable-next-line no-alert
      alert('게시글이 성공적으로 삭제되었습니다.');
      // 삭제 후 로직 (예: 목록 페이지로 리다이렉트)
      router.push('/board');
    } catch (error) {
      console.error('게시글 삭제 중 오류가 발생했습니다.', error);
      // eslint-disable-next-line no-alert
      alert('게시글 삭제에 실패했습니다.');
    }
  };

  const handleClick = () => {
    handleDelete().catch(error => {
      // eslint-disable-next-line no-console
      console.error('Error deleting the post', error);
    });
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
