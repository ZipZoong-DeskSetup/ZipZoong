import Image from 'next/image';
import ProductLikeButton from '@/components/Common/Recommend/ProductLikeButton';
import PageLinkButton from '@/components/Common/Recommend/PageLinkButton';
import styles from '@/components/MyPage/Combination/Detail/ProductDetail.module.scss';
import {CombiMouseDetail} from '@/types/MyPage';

const Mouse = ({mouseInfo}: {mouseInfo: CombiMouseDetail}) => {
  return (
    <div className={styles.productDiv}>
      {/* head */}
      <div className={styles.productHead}>
        <div className={styles.productImage}>
          <Image
            src="/Images/mouseIcon.png"
            width={30}
            height={30}
            alt="mouse"
          />
          <div className={styles.modelName}>{mouseInfo.name}</div>
          {/* 좋아요버튼, 링크 */}
        </div>
        <div className={styles.productLike}>
          <PageLinkButton key={mouseInfo.id} itemLink={mouseInfo.url} />
          <ProductLikeButton key={mouseInfo.id} itemId={mouseInfo.id} />
        </div>
      </div>
      {/* 정보 */}
      <div className={styles.productDetail}>
        <Image src={mouseInfo.img} width={100} height={100} alt="제품 사진" />
        <div className={styles.detail}>
          브랜드: {mouseInfo.brand} | 종류: {mouseInfo.mouseType} | dpi:{' '}
          {mouseInfo.dpi} | 연결방법: {mouseInfo.connect} | 인터페이스:{' '}
          {mouseInfo.connectInterface} | 색: {mouseInfo.color}
          <br />
          무게:
          {mouseInfo.weight} | 넓이: {mouseInfo.width} | 길이:{' '}
          {mouseInfo.length} | 높이: {mouseInfo.height} | 소음 여부:{' '}
          {mouseInfo.isSound}
        </div>
      </div>
      {/* 가격 */}
      <div className={styles.productPrice}>
        <div className={styles.price}>{mouseInfo.price}</div>
      </div>
    </div>
  );
};
export default Mouse;
