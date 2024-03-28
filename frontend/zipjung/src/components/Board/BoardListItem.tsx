/* eslint-disable no-console */

import Image from 'next/image';
import styles from '@/components/Board/BoardListItem.module.scss';

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
  onClick: () => void;
}

function BoardListItem({boardList, onClick}: BoardListItemProps) {
  // const router = useRouter();
  // const {setZustandBoardId} = useBoardStore();

  // const moveToDetail = async () => {
  //   try {
  //     await axios.post(
  //       `${process.env.NEXT_PUBLIC_BASE_URL}/board/hit/${boardList.boardId}`,
  //     );

  //     console.log('POST 요청 성공');
  //   } catch (error) {
  //     console.error('POST 요청 실패:', error);
  //   }
  //   setZustandBoardId(boardList.boardId);
  //   router.push(`/board/${boardList.boardId}`);
  // };

  // const handleClick = () => {
  //   moveToDetail().catch(err => {
  //     console.log(err);
  //   });
  // };

  return (
    <div className={styles.ListItem} onClick={onClick}>
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
