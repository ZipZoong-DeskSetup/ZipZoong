import Image from 'next/image';
import {useRouter} from 'next/navigation';
import styles from '@/components/Board/BoardListItem.module.scss';
import useBoardStore from '@/stores/board';

interface Board {
  boardId: number;
  boardTitle: string;
  boardContent: string;
  boardHit: number;
  boardIsDraft: boolean;
  boardCreator: string;
  boardCreatorId: number;
  boardCreatorImg: string;
  boardCreatedAt: string;
}

interface BoardListItemProps {
  boardList: Board;
}

function BoardListItem({boardList}: BoardListItemProps) {
  const router = useRouter();
  const {setZustandBoardId} = useBoardStore();

  const handleClick = () => {
    setZustandBoardId(boardList.boardId);
    router.push(`/board/${boardList.boardId}`);
  };

  return (
    <div className={styles.ListItem} onClick={handleClick}>
      <div className={styles.Head}>
        <Image
          src={boardList.boardCreatorImg}
          width={30}
          height={30}
          alt="유저이미지"
        />
        {boardList.boardCreator}
      </div>
      <div className={styles.Content}>
        <div>{boardList.boardContent}</div>
        <div>{boardList.boardTitle}</div>
      </div>
    </div>
  );
}

export default BoardListItem;
