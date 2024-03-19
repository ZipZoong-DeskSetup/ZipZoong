import {useEffect, useState} from 'react';
import Image from 'next/image';
import {IoMdArrowDropleft, IoMdArrowDropright} from 'react-icons/io';
import {Hardware} from '@/types/Recommendation';
import RecommendPrice from '@/components/Common/Recommend/RecommendPrice';
import RecommendDetailProduct from '@/components/Recommend/Detail/RecommendDetailProduct';
import styles from '@/components/Recommend/Detail/RecommendTotalImgList.module.scss';

interface RecommendTotalImgListProps {
  carouselList: Hardware | undefined;
}

interface ItemProps {
  id: number;
  model: string;
  detail: string;
  img: string;
  price: number;
  link: string;
}

function RecommendTotalImgList({carouselList}: RecommendTotalImgListProps) {
  const [currIndex, setCurrIndex] = useState(0); // 시작 인덱스를 0으로 변경
  const [imageList, setImageList] = useState<ItemProps[]>([]);

  // 제품을 하나의 배열로 생성
  useEffect(() => {
    if (carouselList) {
      const items: ItemProps[] = [
        ...carouselList.monitor,
        carouselList.keyboard,
        carouselList.mouse,
      ];

      setImageList(items);
    }
  }, [carouselList]);

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
      let newIndex = prevIndex + 4;
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
          <RecommendPrice key={carouselList?.id} item={carouselList} />
        </div>
      </div>
      <div>
        {imageList.map(item => (
          <RecommendDetailProduct key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

export default RecommendTotalImgList;
