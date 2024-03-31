import {useRouter} from 'next/navigation';

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
  const router = useRouter();

  const handleClick = () => {
    router.push(`/board/${board.boardId}`);
  };

  return (
    <div className={styles.listDiv} onClick={handleClick}>
      <div className={styles.titleDiv}>
        <div>{board.boardId}</div>
        <div>{board.boardTitle}</div>
      </div>
      <div className={styles.createDiv}>
        <div>{board.boardCreator}</div>
        <div>{board.boardCreatedAt}</div>
        <div>조회 수 : {board.boardHit}</div>
      </div>
    </div>
  );
}

export default BoardSmallList;
