import Image from 'next/image';
import ProductLikeButton from '@/components/Common/Recommend/ProductLikeButton';
import PageLinkButton from '@/components/Common/Recommend/PageLinkButton';
import styles from '@/components/Recommend/Detail/RecommendDetailProduct.module.scss';

interface ItemProps {
  id: number;
  model: string;
  detail: string;
  img: string;
  price: number;
  link: string;
}

interface RecommendDetailProductProps {
  item: ItemProps;
}

const RecommendDetailProduct: React.FC<RecommendDetailProductProps> = ({
  item,
}) => {
  return (
    <div className={styles.productDiv}>
      {/* head */}
      <div className={styles.productHead}>
        <div className={styles.modelName}>{item.model}</div>
        {/* 좋아요버튼, 링크 */}
        <div className={styles.productLike}>
          <PageLinkButton key={item.id} itemLink={item.link} />
          <ProductLikeButton key={item.id} itemId={item.id} />
        </div>
      </div>
      {/* 정보 */}
      <div className={styles.productDetail}>
        <Image src={item.img} width={100} height={100} alt="제품 사진" />
        <div className={styles.detail}>{item.detail}</div>
      </div>
      {/* 가격 */}
      <div className={styles.productPrice}>
        <div className={styles.price}>{item.price}</div>
      </div>
    </div>
  );
};

export default RecommendDetailProduct;
