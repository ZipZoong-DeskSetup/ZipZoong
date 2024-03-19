import Image from 'next/image';
import {
  Hardware,
  MonitorDetail,
  KeyboardDetail,
  MouseDetail,
} from '@/types/Recommendation';
import ProductLikeButton from '@/components/Common/Recommend/ProductLikeButton';
import styles from '@/components/Common/Recommend/RecommendList.module.scss';

interface RecommendListProps {
  item: Hardware;
}

const RecommendList: React.FC<RecommendListProps> = ({item}) => {
  const {monitor, keyboard, mouse} = item;

  // 모니터 배열을 순회하여 정보를 렌더링하는 함수
  const renderMonitors = (monitors: MonitorDetail[], title: string) =>
    monitors.map((monitorItem, index) => (
      <div key={`monitor-${index}`} className={styles.productDiv1}>
        <div className={styles.productDiv2}>
          <Image
            src="/Images/monitorIcon.png"
            width={20}
            height={20}
            alt="모니터아이콘"
          />
          <div className={styles.productTitle}>{title}</div>
          <div className={styles.productModel}>{monitorItem.model}</div>
        </div>
        <div className={styles.PriceBtn}>
          <div className={styles.productPrice}>{monitorItem.price}</div>
          <ProductLikeButton key={monitorItem.model} itemId={monitorItem.id} />
        </div>
        <hr />
      </div>
    ));

  // 키보드와 마우스 정보를 렌더링하는 함수
  const renderProduct = (
    product: KeyboardDetail | MouseDetail,
    title: string,
  ) => (
    <div className={styles.productDiv1}>
      <div className={styles.productDiv2}>
        <Image
          src={
            title === '키보드'
              ? '/Images/keyboardIcon.png'
              : '/Images/mouseIcon.png'
          }
          width={20}
          height={20}
          alt={`${title} 아이콘`}
        />
        <div className={styles.productTitle}>{title}</div>
        <div className={styles.productModel}>{product.model}</div>
      </div>
      <div className={styles.PriceBtn}>
        <div className={styles.productPrice}>{product.price}</div>
        <ProductLikeButton key={product.id} itemId={product.id} />
      </div>
      <hr />
    </div>
  );

  return (
    <div className={styles.recommendList}>
      <div className={styles.monitorDiv}>
        {renderMonitors(monitor, '모니터')}
      </div>
      <div>{renderProduct(keyboard, '키보드')}</div>
      <div>{renderProduct(mouse, '마우스')}</div>
    </div>
  );
};

export default RecommendList;
