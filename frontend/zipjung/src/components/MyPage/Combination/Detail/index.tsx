'use client';

import axios from 'axios';
import {useEffect, useState} from 'react';
import {
  CombiKeyboardDetail,
  CombiMonitorDetail,
  CombiMouseDetail,
} from '@/types/MyPage';
import useMypageProductStore from '@/stores/mypageProduct';
import GoBackButton from '@/components/Common/GoBackButton';
import ShareButton from '@/components/Common/Recommend/ShareButton';
import RecommendLikeButton from '@/components/Common/Recommend/RecommendLikeButton';
import ImgCarousel from '@/components/MyPage/Combination/Detail/ImgCarousel';
import styles from '@/components/Recommend/Detail/index.module.scss';

// TODO: 조합 상세조회(products에서 모니터 묶기/ detail로 묶기)
interface ILikedCombinationList {
  messages: string;
  data: {
    combinationId: number;
    products: {
      monitor: CombiMonitorDetail[];
      keyboard: CombiKeyboardDetail;
      mouse: CombiMouseDetail;
    };
    totalPrice: number;
  };
}

interface ICarouselItem {
  model: string;
  img: string;
  price: number;
}

interface ICarousel {
  monitor: ICarouselItem[];
  keyboard: ICarouselItem;
  mouse: ICarouselItem;
  totalPrice: number;
}

const Form = () => {
  const {zustandLikedCombinationNumber, zustandLikedCombiOrdinaryNumber} =
    useMypageProductStore();
  const [likedList, setLikedList] = useState<ILikedCombinationList | null>(
    null,
  );

  // TODO: 조합 아이디 가져오기
  useEffect(() => {
    axios
      .get<ILikedCombinationList>(
        `${process.env.NEXT_PUBLIC_BASE_URL}/combination/1`,
      )
      .then(response => {
        setLikedList(response.data);
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.error(error);
      });
  }, [zustandLikedCombinationNumber]);

  let propsCarousel: ICarousel | undefined;
  if (
    likedList &&
    likedList.data &&
    likedList.data.products &&
    likedList.data.products.monitor
  ) {
    propsCarousel = {
      totalPrice: likedList.data.totalPrice || 0, // totalPrice가 없을 경우를 대비하여 기본값 0을 설정합니다.
      monitor: likedList.data.products.monitor.map(item => ({
        img: item.img,
        model: item.name,
        price: item.price,
      })),
      mouse: {
        img: likedList.data.products.mouse.img,
        model: likedList.data.products.mouse.name,
        price: likedList.data.products.mouse.price,
      },
      keyboard: {
        img: likedList.data.products.keyboard.img,
        model: likedList.data.products.keyboard.name,
        price: likedList.data.products.keyboard.price,
      },
    };
  } else {
    // 처리할 내용 추가
  }
  return (
    <div className={styles.detailContains}>
      <div className={styles.detailContain}>
        <div>
          <GoBackButton />
        </div>
        {likedList?.data &&
        likedList.data.products?.monitor &&
        likedList.data.products.monitor.length > 0 ? (
          <div className={styles.detailDiv}>
            <div className={styles.detailHead}>
              <div className={styles.detailId}>
                추천 {zustandLikedCombiOrdinaryNumber}
              </div>
              <div className={styles.buttons}>
                <ShareButton />
                <RecommendLikeButton
                  key={likedList.data.combinationId}
                  itemId={likedList.data.combinationId}
                />
              </div>
            </div>
            <div>
              {propsCarousel !== undefined && (
                <ImgCarousel
                  key={zustandLikedCombinationNumber}
                  carouselData={propsCarousel}
                />
              )}
            </div>
          </div>
        ) : (
          '조합을 선택하세요'
        )}
      </div>
    </div>
  );
};

export default Form;
