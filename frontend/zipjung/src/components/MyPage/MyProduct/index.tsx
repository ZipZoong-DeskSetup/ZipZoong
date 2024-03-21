'use client';

import styled from 'styled-components';
import {useState} from 'react';
import MoMaKey from '@/components/MyPage/MyProduct/MoMaKey';

const ProductContainer = styled.div`
  width: 100%;
  display: flex;
  height: 300px;
  justify-content: center;
`;

const MiddleContainer = styled.div`
  width: 60%;
`;
const MyProductForm = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedProduct, setSelectedProduct] = useState<number>(0);
  //   console.log(selectedProduct);

  const productSelect = (selectedItem: number) => {
    setSelectedProduct(selectedItem);
  };

  return (
    <ProductContainer>
      <MiddleContainer>
        <MoMaKey productSelect={productSelect} />
      </MiddleContainer>
    </ProductContainer>
  );
};
export default MyProductForm;
