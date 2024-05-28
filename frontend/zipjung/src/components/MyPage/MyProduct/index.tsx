/* eslint-disable array-callback-return */

'use client';

import {useEffect, useState} from 'react';

import axios from 'axios';
import styles from '@/components/MyPage/MyProduct/index.module.scss';
import MoMaKey from '@/components/MyPage/MyProduct/MoMaKey';
import MoveRecommend from '@/components/Common/MoveRecommend';
// import RecommendDetailProduct from '@/components/Recommend/Detail/RecommendDetailProduct';
// import useMypageProductStore from '@/stores/mypageProduct';
import {
  CombiMonitorDetail,
  CombiMouseDetail,
  CombiKeyboardDetail,
} from '@/types/MyPage';
import useUserInfoStore from '@/stores/userInfo';
import Monitor from '@/components/MyPage/MyProduct/Monitor';
import Mouse from '@/components/MyPage/MyProduct/Mouse';
import Keyboard from '@/components/MyPage/MyProduct/Keyboard';

interface IProductList {
  monitors: CombiMonitorDetail[];
  mouse: CombiMouseDetail[];
  keyboards: CombiKeyboardDetail[];
}
interface IResponseList {
  message: string;
  data: IProductList;
}

const MyProductForm = () => {
  /** 모니터, 마우스, 키보드 어디 선택했는지 표시(순서대로 0,1,2) */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedProduct, setSelectedProduct] = useState<number>(0);
  const [likedProducts, setLikedProducts] = useState<IProductList | null>(null);
  // const {setZustandLikedProduct} = useMypageProductStore();
  const {ZustandToken} = useUserInfoStore();

  //   console.log(selectedProduct);

  /** 좋아요 제품 리스트 받기 위한 서버 연결 */
  useEffect(() => {
    axios
      .get<IResponseList>(`${process.env.NEXT_PUBLIC_BASE_URL}/product-like`, {
        headers: {
          Authorization: `Bearer ${ZustandToken}`,
        },
      })
      .then(response => {
        setLikedProducts(response.data.data);
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.error('likeProductList', error);
      });
  }, [ZustandToken]);

  const ProductList = (idxNumber: number) => {
    if (likedProducts === null) {
      return null;
    }
    switch (idxNumber) {
      case 0:
        if (likedProducts.monitors.length > 0) {
          return likedProducts.monitors.map((data, index) => (
            <Monitor monitorInfo={data} key={index} />
          ));
        }
        return (
          <>
            <div className={styles.noItem}>선택한 제품이 없어요</div>
            <MoveRecommend
              detail="추천 받으러 가기"
              address="/survey"
              styleName="mypage"
            />
          </>
        );

      case 1:
        if (likedProducts.mouse.length > 0) {
          return likedProducts.mouse.map((data, index) => (
            <Mouse mouseInfo={data} key={index} />
          ));
        }
        return (
          <>
            <div className={styles.noItem}>선택한 제품이 없어요</div>
            <MoveRecommend
              detail="추천 받으러 가기"
              address="/survey"
              styleName="mypage"
            />
          </>
        );

      case 2:
        if (likedProducts.keyboards.length > 0) {
          return likedProducts.keyboards.map((data, index) => (
            <Keyboard keyboardInfo={data} key={index} />
          ));
        }
        return (
          <>
            <div className={styles.noItem}>선택한 제품이 없어요</div>
            <MoveRecommend
              detail="추천 받으러 가기"
              address="/survey"
              styleName="mypage"
            />
          </>
        );
      default:
        return null;
    }
  };

  const productSelect = (selectedItem: number) => {
    setSelectedProduct(selectedItem);
  };

  // TODO: 선택한 것 없을 시 선택한 것 없음 문구와 함께 추천받으러 가기 띄우기
  return (
    <div className={styles.productContainer}>
      <div className={styles.middleContainer}>
        {likedProducts === null ||
        likedProducts === undefined ||
        likedProducts.keyboards.length +
          likedProducts.monitors.length +
          likedProducts.mouse.length ===
          0 ? (
          <div className={styles.middleSortContainer}>
            <div className={styles.noItem}>선택한 제품이 없어요</div>
            <MoveRecommend
              detail="추천 받으러 가기"
              address="/survey"
              styleName="mypage"
            />
          </div>
        ) : (
          <>
            <MoMaKey productSelect={productSelect} />
            <div className={styles.middleSortContainer}>
              {ProductList(selectedProduct)}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default MyProductForm;
