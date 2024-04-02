/* eslint-disable no-console */

import Image from 'next/image';
import styles from '@/components/Board/BoardListItem.module.scss';

interface Board {
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
}

interface BoardListItemProps {
  boardList: Board;
  onClick: () => void;
}

function BoardListItem({boardList, onClick}: BoardListItemProps) {
  return (
    <div className={styles.ListItem} onClick={onClick}>
      <div className={styles.Head}>
        <Image
          src={boardList.boardCreatorImg || '/Images/profileImg.png'}
          width={30}
          height={30}
          alt="유저이미지"
        />
        <div className={styles.CreatorNickname}>{boardList.boardCreator}</div>
      </div>
      <div className={styles.Content}>
        <div>
          <Image
            src={boardList.boardThumbnail || '/Images/boardThumbnail.png'}
            width={180}
            height={120}
            alt="썸네일"
          />
        </div>
        <div className={styles.TilteDiv}>{boardList.boardTitle}</div>
      </div>
    </div>
  );
}

export default BoardListItem;
