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

interface ApiResponse {
  message: string;
  data: Board[] | null;
}

function Form() {
  const [selectedTab, setSelectedTab] = useState<TabName>('all');
  const [boardList, setBoardList] = useState<Board[]>([]);
  const [searchText, setSearchText] = useState<string>('');
  const {ZustandId, ZustandToken} = useUserInfoStore();
  const {setZustandBoardId, setZustandsurroundingBoards} = useBoardStore();
  const router = useRouter();

  const handleTabChange = (tabName: TabName) => {
    setSelectedTab(tabName);
  };

  useEffect(() => {
    const apiUrl =
      selectedTab === 'all'
        ? `${process.env.NEXT_PUBLIC_BASE_URL}/board`
        : `${process.env.NEXT_PUBLIC_BASE_URL}/board/${ZustandId}`;

    const fetchBoardList = async () => {
      try {
        // 선택된 탭이 'mine'일 때만 Authorization 헤더를 포함하여 요청
        const config =
          selectedTab === 'mine'
            ? {
                headers: {
                  Authorization: `Bearer ${ZustandToken}`,
                },
              }
            : {};

        const response = await axios.get<ApiResponse>(apiUrl, config);
        if (response.data && Array.isArray(response.data.data)) {
          setBoardList(response.data.data);
        } else {
          console.error('Expected an array but got:', response.data);
        }
      } catch (error) {
        console.error('Error fetching board list:', error);
      }
    };

    fetchBoardList().catch(error =>
      console.error('fetchBoardList failed:', error),
    );
  }, [selectedTab, ZustandId, ZustandToken]);

  const searchBoard = async (): Promise<void> => {
    // 검색 요청 로직
    try {
      const response = await axios.get<ApiResponse>(
        `${process.env.NEXT_PUBLIC_BASE_URL}/board/search/${searchText}`,
      );
      // 여기서 response를 사용하여 BoardList를 업데이트
      if (Array.isArray(response.data.data)) {
        // 배열인 경우, boardList를 업데이트
        setBoardList(response.data.data);
      } else {
        // 배열이 아닌 경우, 콘솔에 오류 메시지 출력 및 boardList를 빈 배열로 설정
        console.error(
          'Search failed: Expected an array but got:',
          response.data,
        );
        setBoardList([]);
      }
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

    const selectedBoardIndex = boardList.findIndex(
      board => board.boardId === boardId,
    );
    let surroundingBoards = [];

    const start = Math.max(selectedBoardIndex - 2, 0);
    const end = Math.min(start + 5, boardList.length); // 최대 5개까지만 선택
    surroundingBoards = boardList.slice(start, end);
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
          {boardList.length > 0 ? (
            boardList.map(board => (
              <BoardListItem
                key={board.boardId}
                boardList={board}
                onClick={() => handleClick(board.boardId)}
              />
            ))
          ) : (
            <div className={styles.noResults}>게시글이 없습니다.</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Form;
