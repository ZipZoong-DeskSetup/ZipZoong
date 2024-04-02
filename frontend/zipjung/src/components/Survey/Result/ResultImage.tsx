import Image from 'next/image';
import styles from '@/components/Survey/Result/ResultImage.module.scss';

import {
  CombiMonitorDetail,
  CombiMouseDetail,
  CombiKeyboardDetail,
} from '@/types/MyPage';

interface ICombination {
  combinationId: number;
  monitors: CombiMonitorDetail[];
  keyboard: CombiKeyboardDetail;
  mouse: CombiMouseDetail;
  totalPrice: number;
}

const ResultImage = ({data, index}: {data: ICombination; index: number}) => {
  return (
    <div className={styles.firstContainer}>
      <div className={styles.greyContainer}>
        <div className={styles.imgBox}>
          <Image
            src={data.monitors[0].img}
            width={94}
            height={94}
            alt="monitor"
          />
        </div>
        <div className={styles.imgBox}>
          <Image src={data.keyboard.img} width={94} height={94} alt="monitor" />{' '}
        </div>
        <div className={styles.imgBox}>
          <Image src={data.mouse.img} width={94} height={94} alt="monitor" />
        </div>
        <div className={styles.imgBox}>
          <Image src="/Images/extra.png" width={50} height={50} alt="extra" />
        </div>
      </div>
      <div className={styles.whiteContainer}>
        <div className={styles.title}>추천{index + 1}</div>
        <div>
          <div className={styles.info}>
            <span>{data.monitors[0].name}</span>
            <span>{data.monitors[0].price}</span>
          </div>
          <div className={styles.info}>
            <span>{data.keyboard.name}</span>
            <span>{data.keyboard.price}</span>
          </div>
          <div className={styles.info}>
            <span>{data.mouse.name}</span>
            <span>{data.mouse.price}</span>
          </div>
        </div>
        <div className={styles.priceContainer}>
          <div className={styles.price}>{data.totalPrice}</div>
        </div>
      </div>
    </div>
  );
};
export default ResultImage;
