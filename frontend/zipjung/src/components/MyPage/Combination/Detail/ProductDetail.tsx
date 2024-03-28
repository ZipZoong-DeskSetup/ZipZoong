import Image from 'next/image';
import ProductLikeButton from '@/components/Common/Recommend/ProductLikeButton';
import PageLinkButton from '@/components/Common/Recommend/PageLinkButton';
import styles from '@/components/MyPage/Combination/Detail/ProductDetail.module.scss';
import {
  CombiKeyboardDetail,
  CombiMonitorDetail,
  CombiMouseDetail,
} from '@/types/MyPage';

interface ICombinationList {
  monitors: CombiMonitorDetail[];
  keyboard: CombiKeyboardDetail;
  mouse: CombiMouseDetail;
}

const ProductDetail = ({
  propsCombinationList,
}: {
  propsCombinationList: ICombinationList;
}) => {
  const monitorStructure = ({
    item,
    index,
  }: {
    item: CombiMonitorDetail;
    index: number;
  }) => {
    return (
      <div className={styles.productDiv} key={index}>
        {/* head */}
        <div className={styles.productHead}>
          <div className={styles.productImage}>
            <Image
              src="/Images/monitorIcon.png"
              width={30}
              height={30}
              alt="monitor"
            />
            <div className={styles.modelName}>{item.name}</div>
            {/* 좋아요버튼, 링크 */}
          </div>
          <div className={styles.productLike}>
            <PageLinkButton key={item.id} itemLink={item.url} />
            <ProductLikeButton key={item.id} itemId={item.id} />
          </div>
        </div>
        {/* 정보 */}
        <div className={styles.productDetail}>
          <Image src={item.img} width={100} height={100} alt="제품 사진" />
          <div className={styles.detail}>
            브랜드: {item.brand} | 사이즈: {item.size} | 해상도:{' '}
            {item.resolution} <br />
            비율: {item.aspectRatio} | 패널 종류: {item.panelType} | 패널 형태 :{' '}
            {item.panelFormType}
          </div>
        </div>
        {/* 가격 */}
        <div className={styles.productPrice}>
          <div className={styles.price}>{item.price}</div>
        </div>
      </div>
    );
  };

  const keyboardStructure: JSX.Element = (
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
          <div className={styles.modelName}>
            {propsCombinationList.keyboard.name}
          </div>
          {/* 좋아요버튼, 링크 */}
        </div>
        <div className={styles.productLike}>
          <PageLinkButton
            key={propsCombinationList.keyboard.id}
            itemLink={propsCombinationList.keyboard.url}
          />
          <ProductLikeButton
            key={propsCombinationList.keyboard.id}
            itemId={propsCombinationList.keyboard.id}
          />
        </div>
      </div>
      {/* 정보 */}
      <div className={styles.productDetail}>
        <Image
          src={propsCombinationList.keyboard.img}
          width={100}
          height={100}
          alt="제품 사진"
        />
        <div className={styles.detail}>
          브랜드: {propsCombinationList.keyboard.brand} | 종류:{' '}
          {propsCombinationList.keyboard.contact} | 축:{' '}
          {propsCombinationList.keyboard.keySwitch} | 연결방법:{' '}
          {propsCombinationList.keyboard.connect} | 색:{' '}
          {propsCombinationList.keyboard.color}
          <br />
          인터페이스: {propsCombinationList.keyboard.connectInterface} | 키
          개수:
          {propsCombinationList.keyboard.num} | 키압:{' '}
          {propsCombinationList.keyboard.force} | 형태:{' '}
          {propsCombinationList.keyboard.form}
        </div>
      </div>
      {/* 가격 */}
      <div className={styles.productPrice}>
        <div className={styles.price}>
          {propsCombinationList.keyboard.price}
        </div>
      </div>
    </div>
  );

  const mouseStructure: JSX.Element = (
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
          <div className={styles.modelName}>
            {propsCombinationList.mouse.name}
          </div>
          {/* 좋아요버튼, 링크 */}
        </div>
        <div className={styles.productLike}>
          <PageLinkButton
            key={propsCombinationList.mouse.id}
            itemLink={propsCombinationList.mouse.url}
          />
          <ProductLikeButton
            key={propsCombinationList.mouse.id}
            itemId={propsCombinationList.mouse.id}
          />
        </div>
      </div>
      {/* 정보 */}
      <div className={styles.productDetail}>
        <Image
          src={propsCombinationList.mouse.img}
          width={100}
          height={100}
          alt="제품 사진"
        />
        <div className={styles.detail}>
          브랜드: {propsCombinationList.mouse.brand} | 종류:{' '}
          {propsCombinationList.mouse.mouseType} | dpi:{' '}
          {propsCombinationList.mouse.dpi} | 연결방법:{' '}
          {propsCombinationList.mouse.connect} | 인터페이스:{' '}
          {propsCombinationList.mouse.connectInterface} | 색:{' '}
          {propsCombinationList.mouse.color}
          <br />
          무게:
          {propsCombinationList.mouse.weight} | 넓이:{' '}
          {propsCombinationList.mouse.width} | 길이:{' '}
          {propsCombinationList.mouse.length} | 높이:{' '}
          {propsCombinationList.mouse.height} | 소음 여부:{' '}
          {propsCombinationList.mouse.isSound}
        </div>
      </div>
      {/* 가격 */}
      <div className={styles.productPrice}>
        <div className={styles.price}>{propsCombinationList.mouse.price}</div>
      </div>
    </div>
  );

  return (
    <div>
      {propsCombinationList.monitors.map((item, index) =>
        monitorStructure({item, index}),
      )}
      {keyboardStructure}
      {mouseStructure}
    </div>
  );
};
export default ProductDetail;
