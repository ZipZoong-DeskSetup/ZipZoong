import Image from 'next/image';
import ProductLikeButton from '@/components/Common/Recommend/ProductLikeButton';
import styles from '@/components/Common/Recommend/RecommendList.module.scss';

interface IProducts {
  id: number;
  name: string;
  price: number;
  brand: null | string;
  url: null | string;
  category: 'KEYBOARD' | 'MONITOR' | 'MOUSE';
}

const CombinationList = ({Products}: {Products: IProducts[]}) => {
  const renderItems = (type: 'KEYBOARD' | 'MONITOR' | 'MOUSE') => {
    return Products.filter(item => item.category === type).map(
      (item, index) => (
        <div key={index} className={styles.productDiv1}>
          <div className={styles.productDiv2}>
            {item.category === 'MONITOR' && (
              <>
                <Image
                  src="/Images/monitorIcon.png"
                  width={20}
                  height={20}
                  alt={`${item.category}icon`}
                />
                <div className={styles.productTitle}>모니터</div>
              </>
            )}
            {item.category === 'KEYBOARD' && (
              <>
                <Image
                  src="/Images/keyboardIcon.png"
                  width={20}
                  height={20}
                  alt={`${item.category}icon`}
                />
                <div className={styles.productTitle}>키보드</div>
              </>
            )}
            {item.category === 'MOUSE' && (
              <>
                <Image
                  src="/Images/mouseIcon.png"
                  width={20}
                  height={20}
                  alt={`${item.category}icon`}
                />
                <div className={styles.productTitle}>마우스</div>
              </>
            )}
            <div className={styles.productModel}>{item.name}</div>
          </div>
          <div className={styles.PriceBtn}>
            <div className={styles.productPrice}>{item.price}</div>
            <ProductLikeButton key={item.name} itemId={item.id} />
          </div>
          <hr />
        </div>
      ),
    );
  };

  return (
    <div className={styles.recommendList}>
      {Products && (
        <>
          <div className={styles.monitorDiv}>{renderItems('MONITOR')}</div>
          <div className={styles.monitorDiv}>{renderItems('KEYBOARD')}</div>
          <div className={styles.monitorDiv}>{renderItems('MOUSE')}</div>
        </>
      )}
    </div>
  );
};

export default CombinationList;
