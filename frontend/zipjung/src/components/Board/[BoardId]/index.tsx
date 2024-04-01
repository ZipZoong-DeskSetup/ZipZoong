'use client';

/* eslint-disable no-console */

import {useEffect, useState} from 'react';
import axios from 'axios';
import useUserInfoStore from '@/stores/userInfo';
import useBoardStore from '@/stores/board';
import DetailHead from '@/components/Board/[BoardId]/DetailHead';
import styles from '@/components/Board/[BoardId]/index.module.scss';
import DeleteButton from '@/components/Board/[BoardId]/DeleteButton';
import GoUpdateButton from '@/components/Board/[BoardId]/GoModifyButton';
import CommentInput from '@/components/Board/[BoardId]/Comment/CommentInput';
import CommentList from '@/components/Board/[BoardId]/Comment/CommentList';
import GoBackButton from '@/components/Common/GoBackButton';
import BoardSmallList from '@/components/Board/[BoardId]/BoardSmallList';
import RecommendListItem from '@/components/Board/[BoardId]/RecommendListItem';

// 게시글 디테일 타입 설정
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

// 게시글 aixos 응답 데이터 타입
interface BoardDetailResponse {
  message: string;
  data: Board;
}

// 댓글 타입
interface Comment {
  commentId: number;
  commentContent: string;
  commentCreator: string;
  commentCreatorId: string;
  commentCreatorImg: string | null;
  commentCreatedAt: string;
}

// 댓글 axios 응답 데이터 타입
interface CommentsResponse {
  message: string;
  data: Comment[];
}

// 기존 조합 데이터
interface IProducts {
  id: number;
  name: string;
  price: number;
  img: string;
  brand: null | string;
  url: null | string;
  category: 'KEYBOARD' | 'MONITOR' | 'MOUSE';
}

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

interface ICombination {
  combinationId: number;
  products: IProducts[];
  totalPrice: number;
}

function Form() {
  const {ZustandId} = useUserInfoStore();
  const {ZustandboardId, ZustandsurroundingBoards} = useBoardStore();
  const [boardDetail, setBoardDetail] = useState<Board | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentCnt, setCommentCnt] = useState<number | null>(null);
  const [combinationDetails, setCombinationDetails] = useState<ICombination[]>(
    [],
  );

  useEffect(() => {
    const fetchBoardDetail = async () => {
      if (ZustandboardId) {
        try {
          const response = await axios.get<BoardDetailResponse>(
            `${process.env.NEXT_PUBLIC_BASE_URL}/board/detail/${ZustandboardId}`,
          );
          const fetchedBoardDetail = response.data.data;

          // 바로 boardCombinations 데이터를 변환하여 저장
          const transformedCombinations =
            fetchedBoardDetail.boardCombinations.map(combination => {
              const products: IProducts[] = [];

              // Keyboard 처리
              if (combination.keyboard) {
                const {id, name, price, img, brand, url} = combination.keyboard; // 선택된 필드 추출
                products.push({
                  id,
                  name,
                  price,
                  img,
                  brand,
                  url,
                  category: 'KEYBOARD',
                });
              }

              // Mouse 처리
              if (combination.mouse) {
                const {id, name, price, img, brand, url} = combination.mouse; // 선택된 필드 추출
                products.push({
                  id,
                  name,
                  price,
                  img,
                  brand,
                  url,
                  category: 'MOUSE',
                });
              }

              // Monitors 처리
              combination.monitors?.forEach(monitor => {
                const {id, name, price, img, brand, url} = monitor; // 선택된 필드 추출
                products.push({
                  id,
                  name,
                  price,
                  img,
                  brand,
                  url,
                  category: 'MONITOR',
                });
              });

              return {
                combinationId: combination.combinationId,
                products,
                totalPrice: combination.totalPrice,
              };
            });

          setBoardDetail(fetchedBoardDetail);
          setCombinationDetails(transformedCombinations);
        } catch (error) {
          console.error('Error fetching board detail:', error);
        }

        // 댓글 정보 가져오기
        const commentsResponse = await axios.get<CommentsResponse>(
          `${process.env.NEXT_PUBLIC_BASE_URL}/comment/byBoard/${ZustandboardId}`,
        );
        const fetchedComments = commentsResponse.data.data;

        // 게시글 디테일과 댓글 정보를 상태에 저장
        setComments(fetchedComments);
        setCommentCnt(fetchedComments.length); // 댓글 수도 함께 업데이트
      }
    };

    fetchBoardDetail().catch(console.error);
  }, [ZustandboardId]);

  if (!boardDetail) return <div>Loading...</div>;

  return (
    <div className={styles.BoardDetailDiv}>
      {ZustandId === boardDetail.boardCreatorId ? (
        <div className={styles.creatorButton}>
          <GoBackButton text="뒤로" />
          <div className={styles.ButtonDiv}>
            <GoUpdateButton
              key={boardDetail.boardId}
              boardId={boardDetail.boardId}
            />
            <DeleteButton
              key={boardDetail.boardId}
              contentId={boardDetail.boardId}
              contentUrl="board"
            />
          </div>
        </div>
      ) : (
        <div className={styles.buttons}>
          <GoBackButton text="뒤로" />
        </div>
      )}
      <div className={styles.HeadDiv}>
        <DetailHead
          key={boardDetail.boardId}
          boardDetail={boardDetail}
          commentCnt={commentCnt}
        />
      </div>
      <div className={styles.recommendsDiv}>
        <div className={styles.recommendDiv}>
          {combinationDetails.map(recommend => (
            <RecommendListItem
              key={recommend.combinationId}
              combination={recommend}
            />
          ))}
        </div>
      </div>
      <div className={styles.boardContentDiv}>
        <div className={styles.boardContent}>{boardDetail.boardContent}</div>
      </div>
      <div className={styles.boardCommentInputDiv}>
        <CommentInput />
      </div>
      <div className={styles.boardCommentDiv}>
        <CommentList key={boardDetail.boardId} comments={comments} />
      </div>
      <div className={styles.boardListDiv}>
        {ZustandsurroundingBoards.map((board, index) => (
          <BoardSmallList key={index} board={board} />
        ))}
      </div>
    </div>
  );
}

export default Form;
