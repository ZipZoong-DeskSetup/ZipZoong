import {useState} from 'react';
import styles from '@/components/Survey/SlideBar.module.scss';

const SlideBar = ({setMaxValue}: {setMaxValue: (value: number) => void}) => {
  const [page, setPage] = useState<number>(10);
  /** 페이지 이동 */
  const handlePageChange = (pageNumber: number) => {
    setPage(pageNumber);
    setMaxValue(pageNumber);
  };

  return (
    <div className={styles.firstContainer}>
      <form className={styles.Container}>
        <div className={styles.Slider}>
          <div className={styles.SlideBar}></div>
          <input
            className={styles.maxBar}
            id="page"
            type="range"
            step="1"
            value={page}
            onChange={e => handlePageChange(Number(e.target.value))}
            min={10}
            max={500}
          />
          <div className={styles.PriceInfo}>
            <span>10만원</span>
            <span>500만원</span>
          </div>
        </div>
        <div className={styles.NumberContainer}>
          <div className={styles.NumberDiv}>
            <div className={styles.NumberExplain}>최대</div>
            <input
              className={styles.priceInput}
              type="number"
              min={10}
              max={500}
              value={page}
              onChange={e => handlePageChange(Number(e.target.value))}
            />
            <div className={styles.Won}>만원</div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SlideBar;
