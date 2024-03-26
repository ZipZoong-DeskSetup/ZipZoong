/* eslint-disable no-console */
import axios from 'axios';
import Image from 'next/image';
import {useRouter} from 'next/navigation';
import styles from '@/components/Board/BoardListItem.module.scss';
import useBoardStore from '@/stores/board';
import useUserInfoStore from '@/stores/userInfo';


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

  const moveToDetail = async () => {
    try {
      await axios.post('/api/some-endpoint', {
        boardId: boardList.boardId,
      });

      console.log('POST 요청 성공');
    } catch (error) {
      console.error('POST 요청 실패:', error);
    }
    setZustandBoardId(boardList.boardId);
    router.push(`/board/${boardList.boardId}`);
  };

  const handleClick = () => {
    moveToDetail().catch(err => {
      console.log(err);
    });
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
