import {useEffect, useState} from 'react';
import Image from 'next/image';
import {IoMdArrowDropleft, IoMdArrowDropright} from 'react-icons/io';
import {Hardware} from '@/types/Recommendation';
import RecommendDetailProduct from '@/components/Recommend/Detail/RecommendDetailProduct';
import styles from '@/components/Recommend/Detail/RecommendTotalImgList.module.scss';

interface RecommendTotalImgListProps {
  carouselList: Hardware;
}

interface MonitorDetails {
  size: number;
  resolution: string;
  aspectRatio: string;
  refreshRate: number;
  panelType: string;
  panelFormType: string;
}

interface KeyboardDetails {
  connect: string;
  connectInterface?: string | null;
  keySwitch: string;
  led?: string;
  num: number;
  force?: string | null;
  color: string;
  form: string;
  contact: string;
}

interface MouseDetails {
  connect: string;
  connectInterface?: string | null;
  mouseType: string;
  dpi?: string | null;
  color: string;
  weight?: string | null;
  width: number;
  length: number;
  height: number;
  isSound: boolean;
}

// 이제 ItemProps 인터페이스를 수정하여 details의 타입을 적절하게 지정합니다.
interface ItemProps {
  id: number;
  name: string;
  brand: string;
  img: string;
  price: string;
  url: string;
  category: string;
  type: 'monitor' | 'keyboard' | 'mouse';
  details: MonitorDetails | KeyboardDetails | MouseDetails; // Union 타입을 사용
}

function RecommendTotalImgList({carouselList}: RecommendTotalImgListProps) {
  const [currIndex, setCurrIndex] = useState(0); // 시작 인덱스를 0으로 변경
  const [imageList, setImageList] = useState<ItemProps[]>([]);

  // 제품을 하나의 배열로 생성
  useEffect(() => {
    if (carouselList) {
      const monitorsItems: ItemProps[] = carouselList.monitors.map(monitor => ({
        ...monitor,
        type: 'monitor',
        details: {
          size: monitor.size,
          resolution: monitor.resolution,
          aspectRatio: monitor.aspectRatio,
          refreshRate: monitor.refreshRate,
          panelType: monitor.panelType,
          panelFormType: monitor.panelFormType,
        },
      }));

      const keyboardItem: ItemProps = {
        ...carouselList.keyboard,
        type: 'keyboard',
        details: {
          connect: carouselList.keyboard.connect,
          connectInterface: carouselList.keyboard.connectInterface,
          keySwitch: carouselList.keyboard.keySwitch,
          led: carouselList.keyboard.led,
          num: carouselList.keyboard.num,
          force: carouselList.keyboard.force,
          color: carouselList.keyboard.color,
          form: carouselList.keyboard.form,
          contact: carouselList.keyboard.contact,
        },
      };

      const mouseItem: ItemProps = {
        ...carouselList.mouse,
        type: 'mouse',
        details: {
          connect: carouselList.mouse.connect,
          connectInterface: carouselList.mouse.connectInterface,
          mouseType: carouselList.mouse.mouseType,
          dpi: carouselList.mouse.dpi,
          color: carouselList.mouse.color,
          weight: carouselList.mouse.weight,
          width: carouselList.mouse.width,
          length: carouselList.mouse.length,
          height: carouselList.mouse.height,
          isSound: carouselList.mouse.isSound,
        },
      };

      const items = [...monitorsItems, keyboardItem, mouseItem];
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
          <div className={styles.carouselModel}>{item.name}</div>
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
        <div className={styles.carouselModel}>{item.name}</div>
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
        <div className={styles.totalPrice}>{carouselList.totalPrice} 원</div>
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
