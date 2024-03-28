import {useRouter} from 'next/navigation';
import useBoardStore from '@/stores/board';
import styles from '@/components/Board/[BoardId]/GoModifyButton.module.scss';

interface ModifyButtonProps {
  boardId: number;
}

function GoModifyButton({boardId}: ModifyButtonProps) {
  const router = useRouter();
  const {setZustandboardModifyId} = useBoardStore();

  const handleClick = () => {
    setZustandboardModifyId(boardId);
    router.push('/board/modify');
  };

  return (
    <div>
      <button className={styles.GoUpdateButton} onClick={handleClick}>
        수정
      </button>
    </div>
  );
}

export default GoModifyButton;
