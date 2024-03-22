'use client';

import {useEffect, useState} from 'react';
import axios from 'axios';
import useBoardStore from '@/stores/board';
import DetailHead from '@/components/Board/[BoardId]/DetailHead';
import styles from '@/components/Board/[BoardId]/index.module.scss';
import DeleteButton from '@/components/Board/[BoardId]/DeleteButton';
import GoUpdateButton from '@/components/Board/[BoardId]/GoModifyButton';

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

function Form() {
  const {ZustandboardId} = useBoardStore();
  // const [boardDetail, setBoardDetail] = useState<Board | null>(null);

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

  useEffect(() => {
    if (ZustandboardId) {
      axios
        .get<Board>(`/api/boards/${ZustandboardId}`)
        .then(response => {
          setBoardDetail(response.data);
        })
        .catch(error => {
          // eslint-disable-next-line no-console
          console.error('Error fetching board detail:', error);
        });
    }
  }, [ZustandboardId]);

  if (!boardDetail) return <div>Loading...</div>;

  return (
    <div className={styles.BoardDetailDiv}>
      <div className={styles.ButtonDiv}>
        <GoUpdateButton
          key={boardDetail.boardId}
          boardId={boardDetail.boardId}
        />
        <DeleteButton key={boardDetail.boardId} boardId={boardDetail.boardId} />
      </div>
      <div className={styles.HeadDiv}>
        <DetailHead key={boardDetail.boardId} boardDetail={boardDetail} />
      </div>
      <div className={styles.boardContentDiv}>
        <div className={styles.boardContent}>{boardDetail.boardContent}</div>
      </div>
      <div></div>
    </div>
  );
}

export default Form;
