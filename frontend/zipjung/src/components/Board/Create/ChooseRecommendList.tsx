import Image from 'next/image';

import styles from '@/components/Board/Create/ChooseRecommendList.module.scss';

interface IProducts {
  id: number;
  name: string;
  price: number;
  img: string;
  brand: null | string;
  url: null | string;
  category: 'KEYBOARD' | 'MONITOR' | 'MOUSE';
}

interface ICombination {
  combinationId: number;
  products: IProducts[];
  totalPrice: number;
}

interface ChooseRecommendListProps {
  combination: ICombination;
  onSelectCombination: (combinationId: number) => void; // 조합 선택 함수
}

function ChooseRecommendList({
  combination,
  onSelectCombination,
}: ChooseRecommendListProps) {
  return (
    <div
      className={styles.combination}
      onClick={() => onSelectCombination(combination.combinationId)}
    >
      <div>
        {/* 제품 이미지 */}
        <div className={styles.productImages}>
          {combination.products.map(product => (
            <div key={product.id} className={styles.productImage}>
              <Image
                src={product.img}
                alt={product.name}
                width={100}
                height={100}
                className={styles.productImage}
              />
            </div>
          ))}
        </div>
      </div>
      <div className={styles.Detail}>
        {/* 제품 이름 */}
        <div className={styles.productNames}>
          {combination.products.map(product => (
            <div key={product.id} className={styles.productName}>
              {product.name}
            </div>
          ))}
        </div>
        <div className={styles.Detail2}>
          {/* 총 가격 */}
          <div className={styles.totalPrice}>
            Total: {combination.totalPrice}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChooseRecommendList;
