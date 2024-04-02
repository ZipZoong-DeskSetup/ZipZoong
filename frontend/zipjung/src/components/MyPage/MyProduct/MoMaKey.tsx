import {useState} from 'react';
import styles from '@/components/MyPage/MyProduct/MoMaKey.module.scss';

const MoMaKey = ({productSelect}: {productSelect: (idx: number) => void}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedProduct, setSelectedProduct] = useState<number>(0);
  const productSort: string[] = ['모니터', '마우스', '키보드'];
  const handleClick = (idx: number) => {
    productSelect(idx);
    setSelectedProduct(idx);
  };

  return (
    <div className={styles.firstContainer}>
      {productSort.map((item, idx) =>
        idx === selectedProduct ? (
          <div
            className={styles.focusProductButton}
            key={idx}
            onClick={() => handleClick(idx)}
          >
            {item}
          </div>
        ) : (
          <div
            className={styles.productButton}
            key={idx}
            onClick={() => handleClick(idx)}
          >
            {item}
          </div>
        ),
      )}
    </div>
  );
};

export default MoMaKey;
