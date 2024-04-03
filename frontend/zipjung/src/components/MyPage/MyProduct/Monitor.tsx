import {CombiMonitorDetail} from '@/types/MyPage';
import Image from 'next/image';
import ProductLikeButton from '@/components/Common/Recommend/ProductLikeButton';
import PageLinkButton from '@/components/Common/Recommend/PageLinkButton';
import styles from '@/components/MyPage/Combination/Detail/ProductDetail.module.scss';

const Monitor = ({monitorInfo}: {monitorInfo: CombiMonitorDetail}) => {
  return (
    <div className={styles.productDiv}>
      {/* head */}
      <div className={styles.productHead}>
        <div className={styles.productImage}>
          <Image
            src="/Images/monitorIcon.png"
            width={30}
            height={30}
            alt="monitor"
          />
          <div className={styles.modelName}>{monitorInfo.name}</div>
          {/* 좋아요버튼, 링크 */}
        </div>
        <div className={styles.productLike}>
          <PageLinkButton key={monitorInfo.id} itemLink={monitorInfo.url} />
          <ProductLikeButton key={monitorInfo.id} itemId={monitorInfo.id} />
        </div>
      </div>
      {/* 정보 */}
      <div className={styles.productDetail}>
        <Image src={monitorInfo.img} width={100} height={100} alt="제품 사진" />
        <div className={styles.detail}>
          브랜드: {monitorInfo.brand} | 사이즈: {monitorInfo.size} | 해상도:{' '}
          {monitorInfo.resolution} <br />
          비율: {monitorInfo.aspectRatio} | 패널 종류: {monitorInfo.panelType} |
          패널 형태 : {monitorInfo.panelFormType}
        </div>
      </div>
      {/* 가격 */}
      <div className={styles.productPrice}>
        <div className={styles.price}>{monitorInfo.price}</div>
      </div>
    </div>
  );
};
export default Monitor;
