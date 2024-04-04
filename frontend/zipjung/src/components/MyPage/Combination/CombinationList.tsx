import Image from 'next/image';
import styles from '@/components/Common/Recommend/RecommendList.module.scss';

interface IProducts {
  id: number;
  name: string;
  price: number;
  img: string;
  brand: null | string;
  url: null | string;
  category: null;
}

const CombinationList = ({
  monitor,
  mouse,
  keyboard,
}: {
  monitor: IProducts;
  mouse: IProducts;
  keyboard: IProducts;
}) => {
  const example = (data: IProducts) => (
    <>
      <div className={styles.productModel}>{data.name}</div>
      <div className={styles.PriceBtn}>
        <div className={styles.productPrice}>{data.price}</div>
      </div>
    </>
  );

  return (
    <>
      <div className={styles.recommendList}>
        <div className={styles.productDiv1}>
          <div className={styles.productDiv2}>
            <Image
              src="/Images/monitorIcon.png"
              width={20}
              height={20}
              alt="Monitor Icon"
            />
            <div className={styles.productTitle}>모니터</div>
            {example(monitor)}
          </div>
          <hr />
        </div>
      </div>

      <div className={styles.recommendList}>
        <div className={styles.productDiv1}>
          <div className={styles.productDiv2}>
            <Image
              src="/Images/keyboardIcon.png"
              width={20}
              height={20}
              alt="Keyboard Icon"
            />
            <div className={styles.productTitle}>키보드</div>
            {example(keyboard)}
          </div>
          <hr />
        </div>
      </div>

      <div className={styles.recommendList}>
        <div className={styles.productDiv1}>
          <div className={styles.productDiv2}>
            <Image
              src="/Images/mouseIcon.png"
              width={20}
              height={20}
              alt="Mouse Icon"
            />
            <div className={styles.productTitle}>마우스</div>
            {example(mouse)}
          </div>
          <hr />
        </div>
      </div>
    </>
  );
};

export default CombinationList;
