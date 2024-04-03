import Image from 'next/image';
import ProductLikeButton from '@/components/Common/Recommend/ProductLikeButton';
import PageLinkButton from '@/components/Common/Recommend/PageLinkButton';
import styles from '@/components/MyPage/Combination/Detail/ProductDetail.module.scss';
import {CombiKeyboardDetail} from '@/types/MyPage';

const Keyboard = ({keyboardInfo}: {keyboardInfo: CombiKeyboardDetail}) => {
  return (
    <div className={styles.productDiv}>
      {/* head */}
      <div className={styles.productHead}>
        <div className={styles.productImage}>
          <Image
            src="/Images/keyboardIcon.png"
            width={30}
            height={30}
            alt="keyboard"
          />
          <div className={styles.modelName}>{keyboardInfo.name}</div>
          {/* 좋아요버튼, 링크 */}
        </div>
        <div className={styles.productLike}>
          <PageLinkButton key={keyboardInfo.id} itemLink={keyboardInfo.url} />
          <ProductLikeButton key={keyboardInfo.id} itemId={keyboardInfo.id} />
        </div>
      </div>
      {/* 정보 */}
      <div className={styles.productDetail}>
        <Image
          src={keyboardInfo.img}
          width={100}
          height={100}
          alt="제품 사진"
        />
        <div className={styles.detail}>
          브랜드: {keyboardInfo.brand} | 종류: {keyboardInfo.contact} | 축:{' '}
          {keyboardInfo.keySwitch} | 연결방법: {keyboardInfo.connect} | 색:{' '}
          {keyboardInfo.color}
          <br />
          인터페이스: {keyboardInfo.connectInterface} | 키 개수:
          {keyboardInfo.num} | 키압: {keyboardInfo.force} | 형태:{' '}
          {keyboardInfo.form}
        </div>
      </div>
      {/* 가격 */}
      <div className={styles.productPrice}>
        <div className={styles.price}>{keyboardInfo.price}</div>
      </div>
    </div>
  );
};
export default Keyboard;
