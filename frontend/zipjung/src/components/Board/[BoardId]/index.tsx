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
import BoardSmallList from './BoardSmallList';

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

interface Comment {
  commentId: number;
  commentContent: string;
  commentCreator: string;
  commentCreatorId: string;
  commentCreatorImg: string;
  commentCreatedAt: string;
}
interface CommentsResponse {
  comments: Comment[];
}
function Form() {
  const {ZustandId} = useUserInfoStore();
  const {ZustandboardId, ZustandsurroundingBoards} = useBoardStore();
  // TODO: 주석풀고 더미데이터 지우기
  const [boardDetail, setBoardDetail] = useState<Board | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentCnt, setCommentCnt] = useState<number | null>(null);

  useEffect(() => {
    const fetchBoardDetail = async () => {
      if (ZustandboardId) {
        try {
          const response = await axios.get<Board>(
            `${process.env.NEXT_PUBLIC_BASE_URL}/boards/${ZustandboardId}`,
          );
          setBoardDetail(response.data);
        } catch (error) {
          console.error('Error fetching board detail:', error);
        }
      }
    };

    const fetchComments = async () => {
      if (ZustandboardId) {
        try {
          const response = await axios.get<CommentsResponse>(
            `${process.env.NEXT_PUBLIC_BASE_URL}/comments/${ZustandboardId}`,
          );
          setComments(response.data.comments);
          // 댓글 배열이 업데이트될 때마다 commentCnt 상태 업데이트
          setCommentCnt(response.data.comments.length);
        } catch (error) {
          console.error('댓글을 불러오는 중 오류가 발생했습니다.', error);
        }
      }
    };

    fetchBoardDetail().catch(err => {
      console.error(err);
    });
    fetchComments().catch(err => {
      console.error(err);
    });
    // comments.length를 의존성 배열에서 제거
  }, [ZustandboardId]);

  if (!boardDetail) return <div>Loading...</div>;

  return (
    <div className={styles.BoardDetailDiv}>
      {ZustandId !== boardDetail.boardCreatorId ? (
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
