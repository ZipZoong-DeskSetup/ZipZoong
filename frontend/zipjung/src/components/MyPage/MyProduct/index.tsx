/* eslint-disable array-callback-return */

'use client';

// import { useEffect } from 'react';
import {useEffect, useState} from 'react';
// import axios from 'axios';
import styled from 'styled-components';
import MoMaKey from '@/components/MyPage/MyProduct/MoMaKey';
import MoveRecommend from '@/components/Common/MoveRecommend';
import RecommendDetailProduct from '@/components/Recommend/Detail/RecommendDetailProduct';
import useMypageProductStore from '@/stores/mypageProduct';

import {
  MonitorDetail,
  MouseDetail,
  KeyboardDetail,
} from '@/types/Recommendation';

const ProductContainer = styled.div`
  width: 100%;
  display: flex;
  height: 300px;
  justify-content: center;
`;

const MiddleContainer = styled.div`
  width: 60%;
`;

const MiddleSortContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const NoItem = styled.div`
  margin-top: 80px;
  margin-bottom: 60px;
  font-size: 38px;
  color: var(--original-font-color);
  font-weight: 550;
`;

/**
 * 0. 좋아요 버튼 분석-> 서버에 보내는지 확인, 서버에 보내면 관련 정보 받는지 확인
 * 0-1. 버튼 수정
 * 1. 서버에서 데이터 받기(내가 좋아요 한 상품 리스트, 모마키 구분 필요(배열로))
 * 2. map으로 나누어서 띄우기
 * 3. 북마크 취소 시 페이지에서 없애기({isMarked&&<product/>})
 *
 */

// TODO: 수안이한테 데이터 구조 바꿔달라고 전달하기
/**
 * 관심 제품 목록 조회 /favorite/product
 *ex)같은 제품군끼리 묶어서
 * likeProducts: {monitor[], keyboard[], mouse[]}
 */

/**
 * isLiked를 useState로 관리 => o, why? 렌더링 필요하니까
 * isLiked될 때 제품 id를 스토어에 보관?
 */

// TODO: 서버 연결 후 북마크 지속 확인 후 안 되면 주스탠드 연결하기

interface IProductList {
  monitor: MonitorDetail[];
  mouse: MouseDetail[];
  keyboard: KeyboardDetail[];
}
// interface IResponseList {
//   message: string;
//   data: {
//     likeProducts: IProductList;
//   };
// }

const MyProductForm = () => {
  /** 모니터, 마우스, 키보드 어디 선택했는지 표시(순서대로 0,1,2) */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedProduct, setSelectedProduct] = useState<number>(0);
  const [likedProducts, setLikedProducts] = useState<IProductList | null>(null);
  const {setZustandLikedProduct} = useMypageProductStore();

  //   console.log(selectedProduct);

  /** 좋아요 제품 리스트 받기 위한 서버 연결 */
  // useEffect(() => {
  //   axios
  //     .get<IResponseList>(
  //       `${process.env.NEXT_PUBLIC_BASE_URL}/favorite/product-list`,
  //       {
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //       },
  //     )
  //     .then(response => {
  //       setLikedProducts(response.data.data.likeProducts);
  //     })
  //     .catch(error => {
  //       // eslint-disable-next-line no-console
  //       console.error('likeProductList', error);
  //     });
  //   storeZustand();
  // }, []);

  // TODO: 연결 후 삭제
  const response: IProductList = {
    monitor: [
      {
        id: 101,
        model: '모니터101',
        detail: '설명101',
        img: '/Images/monitor.png',
        price: 100000,
        link: 'dummy',
      },
      {
        id: 102,
        model: '모니터101',
        detail: '설명101',
        img: '/Images/monitor.png',
        price: 100000,
        link: 'dummy',
      },
      {
        id: 103,
        model: '모니터103',
        detail: '설명101',
        img: '/Images/monitor.png',
        price: 100000,
        link: 'dummy',
      },
    ],
    mouse: [
      {
        id: 11,
        model: '11마우스',
        detail: '디테일11',
        img: '/Images/CheckRight.png',
        price: 10000,
        link: 'dummy2',
      },
      {
        id: 10,
        model: '10마우스',
        detail: '디테일11',
        img: '/Images/CheckRight.png',
        price: 10000,
        link: 'dummy2',
      },
      {
        id: 12,
        model: '12마우스',
        detail: '디테일12',
        img: '/Images/CheckRight.png',
        price: 12000,
        link: 'dummy2',
      },
    ],
    keyboard: [
      {
        id: 111,
        model: '주황버섯',
        detail: '메이플 하고싶다',
        img: '/Images/mouse.png',
        price: 141,
        link: 'maplestory.kr',
      },
      {
        id: 111,
        model: '아케인',
        detail: '메이플 하고싶다',
        img: '/Images/mouse.png',
        price: 141,
        link: 'maplestory.kr',
      },
    ],
  };
  /** 주스탠드 저장 */
  const storeZustand: () => void = () => {
    response.keyboard.map(item => {
      setZustandLikedProduct(item.id);
    });
    response.monitor.map(item => {
      setZustandLikedProduct(item.id);
    });
    response.mouse.map(item => {
      setZustandLikedProduct(item.id);
    });
  };
  // TODO: 연결 후 삭제
  useEffect(() => {
    setLikedProducts(response);
    // 주스탠드 저장
    storeZustand();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ProductList = (idxNumber: number) => {
    let products: MouseDetail[] = [];

    switch (idxNumber) {
      case 0:
        products = likedProducts!.monitor;
        break;
      case 1:
        products = likedProducts!.mouse;
        break;
      case 2:
        products = likedProducts!.keyboard;
        break;
      default:
        break;
    }
    return products.map(item => (
      <RecommendDetailProduct key={item.id} item={item} />
    ));
  };
  const productSelect = (selectedItem: number) => {
    setSelectedProduct(selectedItem);
  };

  // TODO: 선택한 것 없을 시 선택한 것 없음 문구와 함께 추천받으러 가기 띄우기
  return (
    <ProductContainer>
      <MiddleContainer>
        {likedProducts === null ||
        likedProducts.keyboard.length +
          likedProducts.monitor.length +
          likedProducts.mouse.length ===
          0 ? (
          <MiddleSortContainer>
            <NoItem>선택한 제품이 없어요</NoItem>
            <MoveRecommend
              detail="추천 받으러 가기"
              address="/survey"
              styleName="mypage"
            />
          </MiddleSortContainer>
        ) : (
          <>
            <MoMaKey productSelect={productSelect} />
            <MiddleSortContainer>
              {ProductList(selectedProduct)}
            </MiddleSortContainer>
          </>
        )}
      </MiddleContainer>
    </ProductContainer>
  );
};
export default MyProductForm;
