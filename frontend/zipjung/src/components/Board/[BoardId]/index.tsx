/* eslint-disable no-console */

'use client';

import {useEffect, useState} from 'react';
import axios from 'axios';
import useBoardStore from '@/stores/board';
import DetailHead from '@/components/Board/[BoardId]/DetailHead';
import styles from '@/components/Board/[BoardId]/index.module.scss';
import DeleteButton from '@/components/Board/[BoardId]/DeleteButton';
import GoUpdateButton from '@/components/Board/[BoardId]/GoModifyButton';
import CommentInput from '@/components/Board/[BoardId]/CommentInput';
import CommentList from '@/components/Board/[BoardId]/CommentList';

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

interface Comment {
  commentId: number;
  commentContent: string;
  commentCreator: string;
  commentCreatorId: number;
  commentCreatorImg: string;
  commentCreatedAt: string;
}
interface CommentsResponse {
  comments: Comment[];
}
function Form() {
  const {ZustandboardId} = useBoardStore();
  // const [boardDetail, setBoardDetail] = useState<Board | null>(null);
  // const [comments, setComments] = useState<Comment[]>([]);
  const [commentCnt, setCommentCnt] = useState<number | null>(null);

  const boardDetail = {
    boardId: 1,
    boardTitle: '제목',
    boardContent: '내용',
    boardHit: 10,
    boardCreator: '김싸피',
    boardCreatorId: 2,
    boardCreatorImg: '/Images/profileImg.png',
    boardCreatedAt: '20240321',
  };

  const comments = [
    {
      commentId: 1,
      commentContent: '댓글 내용',
      commentCreator: '김싸피',
      commentCreatorId: 1,
      commentCreatorImg: '/Images/profileImg.png',
      commentCreatedAt: 'yyyyMMddHHmmss',
    },
    {
      commentId: 2,
      commentContent: '댓글 내용',
      commentCreator: '박싸피',
      commentCreatorId: 2,
      commentCreatorImg: '/Images/profileImg.png',
      commentCreatedAt: 'yyyyMMddHHmmss',
    },
    {
      commentId: 3,
      commentContent: '댓글 내용',
      commentCreator: '이싸피',
      commentCreatorId: 3,
      commentCreatorImg: '/Images/profileImg.png',
      commentCreatedAt: 'yyyyMMddHHmmss',
    },
    {
      commentId: 4,
      commentContent: '댓글 내용',
      commentCreator: '김싸피',
      commentCreatorId: 1,
      commentCreatorImg: '/Images/profileImg.png',
      commentCreatedAt: 'yyyyMMddHHmmss',
    },
    {
      commentId: 5,
      commentContent: '댓글 내용',
      commentCreator: '박싸피',
      commentCreatorId: 2,
      commentCreatorImg: '/Images/profileImg.png',
      commentCreatedAt: 'yyyyMMddHHmmss',
    },
    {
      commentId: 6,
      commentContent: '댓글 내용',
      commentCreator: '이싸피',
      commentCreatorId: 3,
      commentCreatorImg: '/Images/profileImg.png',
      commentCreatedAt: 'yyyyMMddHHmmss',
    },
    {
      commentId: 7,
      commentContent: '댓글 내용',
      commentCreator: '김싸피',
      commentCreatorId: 1,
      commentCreatorImg: '/Images/profileImg.png',
      commentCreatedAt: 'yyyyMMddHHmmss',
    },
    {
      commentId: 8,
      commentContent: '댓글 내용',
      commentCreator: '박싸피',
      commentCreatorId: 2,
      commentCreatorImg: '/Images/profileImg.png',
      commentCreatedAt: 'yyyyMMddHHmmss',
    },
    {
      commentId: 9,
      commentContent: '댓글 내용',
      commentCreator: '이싸피',
      commentCreatorId: 3,
      commentCreatorImg: '/Images/profileImg.png',
      commentCreatedAt: 'yyyyMMddHHmmss',
    },
  ];

  useEffect(() => {
    // 게시글 상세 정보 가져오기
    const fetchBoardDetail = async () => {
      if (ZustandboardId) {
        try {
          const response = await axios.get<Board>(
            `/api/boards/${ZustandboardId}`,
          );
          setBoardDetail(response.data);
        } catch (error) {
          console.error('Error fetching board detail:', error);
        }
      }
    };

    // 댓글 데이터 가져오기
    const fetchComments = async () => {
      if (ZustandboardId) {
        try {
          const response = await axios.get<CommentsResponse>(
            `/api/comments/${ZustandboardId}`,
          );
          setComments(response.data.comments);
          setCommentCnt(response.data.comments.length);
        } catch (error) {
          console.error('댓글을 불러오는 중 오류가 발생했습니다.', error);
        }
      }
      setCommentCnt(comments.length);
    };

    fetchBoardDetail().catch(err => {
      console.log(err);
    });
    fetchComments().catch(err => {
      console.log(err);
    });
  }, [ZustandboardId]);

  if (!boardDetail) return <div>Loading...</div>;

  return (
    <div className={styles.BoardDetailDiv}>
      <div className={styles.ButtonDiv}>
        <GoUpdateButton
          key={boardDetail.boardId}
          boardId={boardDetail.boardId}
        />
        <DeleteButton
          key={boardDetail.boardId}
          contentId={boardDetail.boardId}
          contentUrl="api/board"
        />
      </div>
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
    </div>
  );
}

export default Form;
