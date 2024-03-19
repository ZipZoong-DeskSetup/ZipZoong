import {Hardware} from '@/types/Recommendation';
import styles from '@/components/Common/Recommend/RecommendPrice.module.scss';

interface RecommendPriceProps {
  item: Hardware | undefined;
}

const RecommendPrice: React.FC<RecommendPriceProps> = ({item}) => {
  const totalMonitorPrice =
    item?.monitor.reduce((acc, curr) => acc + curr.price, 0) || 0;
  const totalKeyboardPrice = item?.keyboard?.price || 0;
  const totalMousePrice = item?.mouse?.price || 0;

  // 모든 아이템의 총 가격
  const totalPrice = totalMonitorPrice + totalKeyboardPrice + totalMousePrice;

  return <div className={styles.totalPrice}>{totalPrice}</div>;
};

export default RecommendPrice;
