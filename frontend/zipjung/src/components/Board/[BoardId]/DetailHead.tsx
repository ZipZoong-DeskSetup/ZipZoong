import {IoEyeOutline} from 'react-icons/io5';
import {TfiCommentAlt} from 'react-icons/tfi';
import Image from 'next/image';
import styles from '@/components/Board/[BoardId]/DetailHead.module.scss';

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

interface DetailHeadProps {
  boardDetail: Board;
  commentCnt: number | null;
}

function DetailHead({boardDetail, commentCnt}: DetailHeadProps) {
  return (
    <div className={styles.BoardHeadContain}>
      <div className={styles.BoardDetailHead}>
        <div className={styles.TitleDiv}>
          <div className={styles.Title}>{boardDetail.boardTitle}</div>
          <div className={styles.createInfo}>
            <Image
              src={boardDetail.boardCreatorImg || '/Images/profileImg.png'}
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
          <div className={styles.boardInfoDiv}>
            <TfiCommentAlt className={styles.CommentImg} />
            <div className={styles.boardHit}>{commentCnt}</div>
          </div>
          <div className={styles.boardInfoDiv}>
            <IoEyeOutline className={styles.HitImg} />
            <div className={styles.boardHit}>{boardDetail.boardHit}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailHead;
