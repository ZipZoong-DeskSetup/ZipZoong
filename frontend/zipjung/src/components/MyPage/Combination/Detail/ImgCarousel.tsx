import {useEffect, useState} from 'react';
import Image from 'next/image';
import {IoMdArrowDropleft, IoMdArrowDropright} from 'react-icons/io';
import styles from '@/components/Recommend/Detail/RecommendTotalImgList.module.scss';
import stylesPrice from '@/components/Common/Recommend/RecommendPrice.module.scss';

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

const ImgCarousel = ({carouselData}: {carouselData: ICarousel}) => {
  const [currIndex, setCurrIndex] = useState(0); // 시작 인덱스를 0으로 변경
  const [imageList, setImageList] = useState<ICarouselItem[]>([]);

  // 제품을 하나의 배열로 생성
  useEffect(() => {
    if (carouselData) {
      const items: ICarouselItem[] = [
        ...carouselData.monitor.map(item => item),
        carouselData.keyboard,
        carouselData.mouse,
      ];

      setImageList(items);
    }
  }, [carouselData]);

  // 이미지 반환
  const getCurrentImages = () => {
    if (imageList.length <= 4) {
      return imageList.map((item, index) => (
        <li key={index} className={styles.carouselItem}>
          <div className={styles.carouselImg}>
            <Image src={item.img} width={130} height={130} alt="제품이미지" />
          </div>
          <div className={styles.carouselModel}>{item.model}</div>
          <div className={styles.carouselPrice}>
            <div>{item.price}</div>
          </div>
        </li>
      ));
    }

    let endIndex = currIndex + 4;
    if (endIndex > imageList.length) {
      endIndex = imageList.length;
    }

    return imageList.slice(currIndex, endIndex).map((item, index) => (
      <li key={index} className={styles.carouselItem}>
        <div className={styles.carouselImg}>
          <Image src={item.img} width={130} height={130} alt="제품이미지" />
        </div>
        <div className={styles.carouselModel}>{item.model}</div>
        <div className={styles.carouselPrice}>
          <div>{item.price}</div>
        </div>
      </li>
    ));
  };

  // 버튼 비활성화 여부 결정
  const isNextDisabled = currIndex + 4 >= imageList.length;

  const next = () => {
    setCurrIndex(prevIndex => {
      let newIndex = prevIndex + 1;
      if (newIndex >= imageList.length) {
        newIndex = prevIndex;
      }
      return newIndex;
    });
  };

  const prev = () => {
    setCurrIndex(prevIndex => {
      let newIndex = prevIndex - 4;
      if (newIndex < 0) {
        newIndex = 0;
      }
      return newIndex;
    });
  };

  return (
    <div>
      <div className={styles.recommendTotal}>
        <div className={styles.carouselContainer}>
          <button onClick={prev} disabled={currIndex === 0}>
            <IoMdArrowDropleft className={styles.prevBtn} />
          </button>
          <ul className={styles.carouselList}>{getCurrentImages()}</ul>
          <button onClick={next} disabled={isNextDisabled}>
            <IoMdArrowDropright className={styles.prevBtn} />
          </button>
        </div>
        <div className={styles.totalPrice}>
          <div className={stylesPrice.totalPrice}>
            {carouselData.totalPrice}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ImgCarousel;
