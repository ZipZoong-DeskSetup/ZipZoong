import { Hardware, MonitorDetail, KeyboardDetail, MouseDetail } from '@/types/Recommendation';
import styles from '@/components/Common/Recommend/RecommendPrice.module.scss'

interface RecommendPriceProps {
    item: Hardware;
}

const RecommendPrice: React.FC<RecommendPriceProps> = ({ item }) => {
    const { monitor, keyboard, mouse } = item;

    // 모니터 배열의 가격을 합산
    const totalMonitorPrice = monitor.reduce((acc, curr) => acc + curr.price, 0);

    // 키보드와 마우스의 가격을 합산
    const totalKeyboardPrice = keyboard.price;
    const totalMousePrice = mouse.price;

    // 모든 아이템의 총 가격
    const totalPrice = totalMonitorPrice + totalKeyboardPrice + totalMousePrice;

    return (
        <div className={styles.totalPrice}>
            {totalPrice}
        </div>
    );
};

export default RecommendPrice;