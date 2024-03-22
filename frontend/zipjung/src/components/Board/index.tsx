'use client';

import axios from 'axios';
// import Link from 'next/link';
import {useState, useEffect} from 'react';
import BoardHead from '@/components/Board/BoardHead';
import BoardListItem from '@/components/Board/BoardListItem';
import useUserInfoStore from '@/stores/userInfo';

import styles from '@/components/Board/index.module.scss';

type TabName = 'all' | 'mine';

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

function Form() {
  const BoardList = [
    {
      boardId: 1,
      boardTitle: '제목1',
      boardContent: '내용1',
      boardHit: 2,
      boardIsDraft: false,
      boardCreator: '김싸피',
      boardCreatorId: 1,
      boardCreatorImg: '/Images/person.png',
      boardCreatedAt: '20240319',
    },
    {
      boardId: 2,
      boardTitle: '제목2',
      boardContent: '내용2',
      boardHit: 2,
      boardIsDraft: false,
      boardCreator: '닉네임',
      boardCreatorId: 2,
      boardCreatorImg: '/Images/person.png',
      boardCreatedAt: '20240320',
    },
    {
      boardId: 2,
      boardTitle: '제목2',
      boardContent: '내용2',
      boardHit: 2,
      boardIsDraft: false,
      boardCreator: '닉네임',
      boardCreatorId: 2,
      boardCreatorImg: '/Images/person.png',
      boardCreatedAt: '20240320',
    },
    {
      boardId: 2,
      boardTitle: '제목2',
      boardContent: '내용2',
      boardHit: 2,
      boardIsDraft: false,
      boardCreator: '닉네임',
      boardCreatorId: 2,
      boardCreatorImg: '/Images/person.png',
      boardCreatedAt: '20240320',
    },
    {
      boardId: 2,
      boardTitle: '제목2',
      boardContent: '내용2',
      boardHit: 2,
      boardIsDraft: false,
      boardCreator: '닉네임',
      boardCreatorId: 2,
      boardCreatorImg: '/Images/person.png',
      boardCreatedAt: '20240320',
    },
    {
      boardId: 2,
      boardTitle: '제목2',
      boardContent: '내용2',
      boardHit: 2,
      boardIsDraft: false,
      boardCreator: '닉네임',
      boardCreatorId: 2,
      boardCreatorImg: '/Images/person.png',
      boardCreatedAt: '20240320',
    },
  ];

  const [selectedTab, setSelectedTab] = useState<TabName>('all');
  const [boardList, setBoardList] = useState<Board[]>([]);
  const {ZustandId} = useUserInfoStore();

  const handleTabChange = (tabName: TabName) => {
    setSelectedTab(tabName);
  };

  useEffect(() => {
    const apiUrl =
      selectedTab === 'all' ? '/api/boards' : `/api/boards/${ZustandId}`;

    const fetchBoardList = async () => {
      try {
        const response = await axios.get<Board[]>(apiUrl);
        setBoardList(response.data);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error fetching board list:', error);
      }
    };

    fetchBoardList().catch(error =>
      // eslint-disable-next-line no-console
      console.error('fetchBoardList failed:', error),
    );
  }, [selectedTab, ZustandId]);

  return (
    <div className={styles.BoardDiv}>
      <div className={styles.BoardTitle}>DESK SETUP 자유 게시판</div>
      <div className={styles.BoardHead}>
        <BoardHead selectedTab={selectedTab} onTabChange={handleTabChange} />
      </div>
      <div className={styles.BoardContent}>
        <div className={styles.BoardContentItem}>
          {boardList.map((board, index) => (
            <BoardListItem key={index} boardList={board} />
          ))}
          {BoardList.map(board => (
            <BoardListItem key={board.boardId} boardList={board} />
            // <BoardListItem boardList={board} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Form;
