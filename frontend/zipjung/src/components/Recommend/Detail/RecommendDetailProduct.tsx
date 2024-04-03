/* eslint-disable no-console */
import Image from 'next/image';
import ProductLikeButton from '@/components/Common/Recommend/ProductLikeButton';
import PageLinkButton from '@/components/Common/Recommend/PageLinkButton';
import styles from '@/components/Recommend/Detail/RecommendDetailProduct.module.scss';

interface MonitorDetails {
  size: number;
  resolution: string;
  aspectRatio: string;
  refreshRate: number;
  panelType: string;
  panelFormType: string;
}

interface KeyboardDetails {
  connect: string;
  connectInterface?: string | null;
  keySwitch: string;
  led?: string;
  num: number;
  force?: string | null;
  color: string;
  form: string;
  contact: string;
}

interface MouseDetails {
  connect: string;
  connectInterface?: string | null;
  mouseType: string;
  dpi?: string | null;
  color: string;
  weight?: string | null;
  width: number;
  length: number;
  height: number;
  isSound: boolean;
}

interface ItemProps {
  id: number;
  name: string;
  // model: string;
  brand: string;
  img: string;
  price: string;
  url: string;
  category: string;
  type: 'monitor' | 'keyboard' | 'mouse';
  details: MonitorDetails | KeyboardDetails | MouseDetails;
}

interface RecommendDetailProductProps {
  item: ItemProps;
}

const RecommendDetailProduct: React.FC<RecommendDetailProductProps> = ({
  item,
}) => {
  console.log(item);
  const detailsString = Object.entries(item.details)
    .map(([key, value]) => `${key}: ${value}`)
    .join(' | ');

  return (
    <div className={styles.productDiv}>
      {/* head */}
      <div className={styles.productHead}>
        <div className={styles.modelName}>{item.name}</div>
        {/* 좋아요버튼, 링크 */}
        <div className={styles.productLike}>
          <PageLinkButton key={item.id} itemLink={item.url} />
          <ProductLikeButton key={item.id} itemId={item.id} />
        </div>
      </div>
      {/* 정보 */}
      <div className={styles.productDetail}>
        <Image src={item.img} width={100} height={100} alt="제품 사진" />
        {/* <div className={styles.detail}>{item.details}</div> */}
        <div className={styles.detail}>{detailsString}</div>
        {/* <ul>
          {Object.entries(item.details).map(([key, value]) => (
            <li key={key}>
              <strong>{key}: </strong>
              {value}
            </li>
          ))}
        </ul> */}
      </div>
      {/* 가격 */}
      <div className={styles.productPrice}>
        <div className={styles.price}>{item.price} 원</div>
      </div>
    </div>
  );
};

export default RecommendDetailProduct;
