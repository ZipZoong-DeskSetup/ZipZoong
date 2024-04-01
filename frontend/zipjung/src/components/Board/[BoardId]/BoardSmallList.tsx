import {useRouter} from 'next/navigation';
import useBoardStore from '@/stores/board';
import {IoEyeOutline} from 'react-icons/io5';

import styles from '@/components/Board/[BoardId]/BoardSmallList.module.scss';

interface BoardSmallListProps {
  board: {
    boardId: number;
    boardTitle: string | null;
    boardContent: string | null;
    boardHit: number;
    boardThumbnail: string | null;
    boardCreator: string | null;
    boardCreatorId: string;
    boardCreatorImg: string | null;
    boardCreatedAt: string;
    boardCombinations: [];
  };
}

function BoardSmallList({board}: BoardSmallListProps) {
  const {setZustandBoardId} = useBoardStore();
  const router = useRouter();

  const handleClick = () => {
    setZustandBoardId(board.boardId);
    router.push(`/board/${board.boardId}`);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };

  return (
    <div className={styles.listDiv} onClick={handleClick}>
      <div className={styles.titleDiv}>
        <div>{board.boardId}</div>
        <div>{board.boardTitle}</div>
      </div>
      <div className={styles.createDiv}>
        <div className={styles.boardCreator}>{board.boardCreator}</div>
        <div className={styles.boardCreatedAt}>
          {formatDate(board.boardCreatedAt)}
        </div>
        <div className={styles.HitImg}>
          <IoEyeOutline /> {board.boardHit}
        </div>
      </div>
    </div>
  );
}

export default BoardSmallList;
