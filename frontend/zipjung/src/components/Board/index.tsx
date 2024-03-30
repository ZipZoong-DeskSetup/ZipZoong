'use client';

/* eslint-disable no-console */

import axios from 'axios';
// import Link from 'next/link';
import {useState, useEffect} from 'react';
import {useRouter} from 'next/navigation';
import BoardHead from '@/components/Board/BoardHead';
import BoardListItem from '@/components/Board/BoardListItem';
import useUserInfoStore from '@/stores/userInfo';
import useBoardStore from '@/stores/board';
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
      boardTitle: '제목23',
      boardContent: '내용2',
      boardHit: 2,
      boardIsDraft: false,
      boardCreator: '닉네임',
      boardCreatorId: 2,
      boardCreatorImg: '/Images/person.png',
      boardCreatedAt: '20240320',
    },
    {
      boardId: 3,
      boardTitle: '제목233',
      boardContent: '내용2',
      boardHit: 2,
      boardIsDraft: false,
      boardCreator: '닉네임',
      boardCreatorId: 2,
      boardCreatorImg: '/Images/person.png',
      boardCreatedAt: '20240320',
    },
    {
      boardId: 4,
      boardTitle: '제목2333',
      boardContent: '내용2',
      boardHit: 2,
      boardIsDraft: false,
      boardCreator: '닉네임',
      boardCreatorId: 2,
      boardCreatorImg: '/Images/person.png',
      boardCreatedAt: '20240320',
    },
    {
      boardId: 5,
      boardTitle: '제목23333',
      boardContent: '내용2',
      boardHit: 2,
      boardIsDraft: false,
      boardCreator: '닉네임',
      boardCreatorId: 2,
      boardCreatorImg: '/Images/person.png',
      boardCreatedAt: '20240320',
    },
    {
      boardId: 6,
      boardTitle: '제목2333333',
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
  const [searchText, setSearchText] = useState<string>('');
  const {ZustandId} = useUserInfoStore();
  const {setZustandBoardId, setZustandsurroundingBoards} = useBoardStore();
  const router = useRouter();

  const handleTabChange = (tabName: TabName) => {
    setSelectedTab(tabName);
  };

  useEffect(() => {
    const apiUrl =
      selectedTab === 'all'
        ? `${process.env.NEXT_PUBLIC_BASE_URL}/boards`
        : `${process.env.NEXT_PUBLIC_BASE_URL}/boards/${ZustandId}`;

    const fetchBoardList = async () => {
      try {
        const response = await axios.get<Board[]>(apiUrl);
        setBoardList(response.data);
      } catch (error) {
        console.error('Error fetching board list:', error);
      }
    };

    fetchBoardList().catch(error =>
      console.error('fetchBoardList failed:', error),
    );
  }, [selectedTab, ZustandId]);

  const searchBoard = async (): Promise<void> => {
    // 검색 요청 로직
    try {
      const response = await axios.get<Board[]>(
        `${process.env.NEXT_PUBLIC_BASE_URL}/board/search/${searchText}`,
      );
      // 여기서 response를 사용하여 BoardList를 업데이트
      setBoardList(response.data);
    } catch (error) {
      console.error('Search failed:', error);
    }
  };

  const handleSearch = () => {
    searchBoard().catch(err => {
      console.log(err);
    });
  };

  const moveToDetail = async (boardId: number) => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/board/hit/${boardId}`,
      );

      console.log('POST 요청 성공');
    } catch (error) {
      console.error('POST 요청 실패:', error);
    }
    setZustandBoardId(boardId);
    router.push(`/board/${boardId}`);

    const selectedBoardIndex = BoardList.findIndex(
      board => board.boardId === boardId,
    );
    let surroundingBoards = [];

    const start = Math.max(selectedBoardIndex - 2, 0);
    const end = Math.min(start + 5, BoardList.length); // 최대 5개까지만 선택
    surroundingBoards = BoardList.slice(start, end);
    setZustandsurroundingBoards(surroundingBoards);
  };

  const handleClick = (boardId: number) => {
    moveToDetail(boardId).catch(err => {
      console.log(err);
    });
  };

  return (
    <div className={styles.BoardDiv}>
      <div className={styles.BoardTitle}>DESK SETUP 자유 게시판</div>
      <div className={styles.BoardHead}>
        <BoardHead
          selectedTab={selectedTab}
          onTabChange={handleTabChange}
          searchText={searchText}
          setSearchText={setSearchText}
          onSearch={handleSearch}
        />
      </div>
      <div className={styles.BoardContent}>
        <div className={styles.BoardContentItem}>
          {BoardList.map(board => (
            <BoardListItem
              key={board.boardId}
              boardList={board}
              onClick={() => handleClick(board.boardId)}
            />
          ))}
          {/* {boardList.map(board => (
            <BoardListItem
              key={board.boardId}
              boardList={board}
              onClick={() => handleClick(board.boardId)}
            />
          ))} */}
        </div>
      </div>
    </div>
  );
}

export default Form;
