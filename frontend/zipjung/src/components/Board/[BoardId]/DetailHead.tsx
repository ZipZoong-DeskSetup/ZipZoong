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
  boardCombinations: ICombinationData[];
}

interface DetailHeadProps {
  boardDetail: Board;
  commentCnt: number | null;
}

// 기존 조합 데이터
interface IProductBase {
  id: number;
  name: string;
  price: number;
  img: string;
  brand: string | null;
  url: string;
  category: 'KEYBOARD' | 'MONITOR' | 'MOUSE';
}

interface IMonitor extends IProductBase {
  size: number;
  resolution: string;
  aspectRatio: string;
  refreshRate: number;
  panelType: string;
  panelFormType: string;
}

interface IKeyboard extends IProductBase {
  connect: string;
  connectInterface: string | null;
  keySwitch: string | null;
  led: string | null;
  num: number;
  force: number;
  color: string;
  form: string;
  contact: string;
}

interface IMouse extends IProductBase {
  connect: string;
  connectInterface: string;
  mouseType: string;
  dpi: number;
  color: string;
  weight: number;
  width: number;
  length: number;
  height: number;
  isSound: boolean;
}

interface ICombinationData {
  combinationId: number;
  monitors: IMonitor[] | null;
  keyboard: IKeyboard | null;
  mouse: IMouse | null;
  totalPrice: number;
}

function DetailHead({boardDetail, commentCnt}: DetailHeadProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };

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
            <div className={styles.CreateAt}>
              {formatDate(boardDetail.boardCreatedAt)}
            </div>
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
