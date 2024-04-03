'use client';

import axios from 'axios';
import {useState, useEffect} from 'react';
import { Carousel } from 'react-responsive-carousel';
import { useNavigate } from 'react-router-dom';
import useUserInfoStore from '@/stores/userInfo';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // 필요한 스타일을 가져옵니다.
import CarouselStyles from './ImageCarousel.module.css'; // 커스텀 스타일
import Main from './main.module.css'; // 메인 스타일
import Image from 'next/image';

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


interface CarouselProps {
  items: Board[];
}

const ImageCarousel: React.FC<CarouselProps> = ({ items }) => {
  return (
    <Carousel
      showArrows={true}
      showIndicators={false}
      autoPlay={true}
      infiniteLoop={true}
      showThumbs={false}
      showStatus={false}
      useKeyboardArrows={true}
      dynamicHeight={true}
      centerMode={true}
      centerSlidePercentage={20}
      className={CarouselStyles.carousel} // 커스텀 클래스 이름을 적용
    >
      {items.map(item => (
        <a href='board/${item.boardId}'>
        <div key={item.boardId}>
          <img src={item.boardThumbnail || '/Images/boardThumbnail.png'} 
          alt="썸네일" />
        </div>
        </a>
      ))}
    </Carousel>
  );
};



function Form() {
  const [selectedTab, setSelectedTab] = useState<TabName>('all');
  const {ZustandId, ZustandToken} = useUserInfoStore();
  const [boardList, setBoardList] = useState<Board[]>([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 폼의 기본 제출 동작을 방지합니다.
    alert('추천받기 요청이 처리되었습니다.');
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

  return (
    <div className={Main.main}> {/* 이 부분에 스타일을 추가하여 가운데 정렬 */}
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
      <Image
          src="/Images/LOGO2.png"
          width={140}
          height={160}
          alt="main_LOGO2"
        />
      </div>
      <p className={Main.mainFont1}>데스크 셋업 중심에 "집중"이 된다.</p>
      <p className={Main.mainSpace}></p>
      <a href="/survey/1">
      <button style={{
        height: '120px',
        width: '500px',
        backgroundColor: '#92C7CF', // 버튼의 배경색
        color: 'white', // 글자 색상
        border: 'none', // 테두리 없음
        padding: '10px 20px', // 패딩: 상하 10px, 좌우 20px
        borderRadius: '10px', // 모서리 둥글게
        fontSize: '30px', // 글자 크기
        fontWeight: 'bold',
        cursor: 'pointer', // 마우스 오버 시 커서 변경
        boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.2)', // 그림자 효과
        outline: 'none' // 포커스 시 아웃라인 제거
      }}>
          데스크 셋업 추천받기
        </button>
        </a>
        <p style={{
        padding: '20px'
      }}></p>
      <ImageCarousel items={boardList} />
      <form onSubmit={handleSubmit}>
      </form>
      <p className={Main.mainSpace}></p>
      <p className={Main.mainFont2}>사용자의 용도와 조건에 맞추어 모니터, 마우스, 키보드를</p>
      <p className={Main.mainFont2}>모두 합친 조합을 1분안에 추천받을 수 있는 서비스입니다.</p>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
      <p className={Main.mainSpace2}></p>
      <p className={Main.mainSpace}></p>
      <Image
          src="/Images/LOGO3.png"
          width={100}
          height={120}
          alt="main_LOGO2"
        />
      <p className={Main.mainSpace}></p>
      <p className={Main.mainFont2}>이런분께 추천합니다.</p>
      <p className={Main.mainSpace}></p>
      <Image
          src="/Images/people.png"
          width={600}
          height={140}
          alt="main_people"
      />
        <div style={{ display: 'flex' }}>
          <p className={Main.mainFont3}>데스크 셋업을<br/>처음하시는 분</p>
          <p className={Main.fixSpace}></p>
          <p className={Main.mainFont3}>나에게 맞는<br/>데스크 셋업 조합을<br/>알고 싶은 분</p>
          <p className={Main.fixSpace}></p>
          <p className={Main.mainFont3}>다른 사람의<br/>데스크 셋업이<br/>궁금하신 분</p>
        </div>
      <p className={Main.mainSpace}></p>
      <a href="/survey/1">
      <button type="submit" style={{
        height: '120px',
        width: '500px',
        backgroundColor: '#92C7CF', // 버튼의 배경색
        color: 'white', // 글자 색상
        border: 'none', // 테두리 없음
        padding: '10px 20px', // 패딩: 상하 10px, 좌우 20px
        borderRadius: '10px', // 모서리 둥글게
        fontSize: '30px', // 글자 크기
        fontWeight: 'bold',
        cursor: 'pointer', // 마우스 오버 시 커서 변경
        boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.2)', // 그림자 효과
        outline: 'none' // 포커스 시 아웃라인 제거
      }}>
          데스크 셋업 추천받기
        </button>
        </a>
        <p className={Main.mainSpace2}></p>
</div>
    </div>
  );
}

export default Form;

