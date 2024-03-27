import {useRouter} from 'next/navigation';

import styles from '@/components/Board/[BoardId]/BoardSmallList.module.scss';

interface BoardSmallListProps {
  board: {
    boardId: number;
    boardTitle: string;
    boardContent: string;
    boardHit: number;
    boardIsDraft: boolean;
    boardCreator: string;
    boardCreatorId: number;
    boardCreatorImg: string;
    boardCreatedAt: string;
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
