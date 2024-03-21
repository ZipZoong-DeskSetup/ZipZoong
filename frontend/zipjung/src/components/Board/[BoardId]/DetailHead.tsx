import {IoEyeOutline} from 'react-icons/io5';
import Image from 'next/image';
import styles from '@/components/Board/[BoardId]/DetailHead.module.scss';

interface Board {
  boardId: number;
  boardTitle: string;
  boardContent: string;
  boardHit: number;
  boardCreator: string;
  boardCreatorId: number;
  boardCreatorImg: string;
  boardCreatedAt: string;
}

interface DetailHeadProps {
  boardDetail: Board;
}

function DetailHead({boardDetail}: DetailHeadProps) {
  return (
    <div className={styles.BoardHeadContain}>
      <div className={styles.BoardDetailHead}>
        <div className={styles.TitleDiv}>
          <div className={styles.Title}>{boardDetail.boardTitle}</div>
          <div className={styles.createInfo}>
            <Image
              src={boardDetail.boardCreatorImg}
              width={30}
              height={30}
              alt="프로필이미지"
              className={styles.profieImg}
            />
            <div className={styles.CreatorNickname}>
              {boardDetail.boardCreator}
            </div>
            <div className={styles.CreateAt}>{boardDetail.boardCreatedAt}</div>
          </div>
        </div>
        <div className={styles.boardInfo}>
          <div>
            <IoEyeOutline className={styles.HitImg} />
          </div>
          <div className={styles.boardHit}>{boardDetail.boardHit}</div>
        </div>
      </div>
    </div>
  );
}

export default DetailHead;
