import {useState} from 'react';
import styled from 'styled-components';

const FirstContainer = styled.div`
  margin-top: 5px;
  width: 60%;
  display: flex;
  gap: 10px;
`;
const ProductButton = styled.div`
  background-color: var(--main-color);
  color: var(--font-color);
  font-size: 18px;
  font-weight: bold;
  width: 80px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  cursor: pointer;
`;
const FocusProductButton = styled.div`
  background-color: var(--main-color-dark);
  color: var(--custom-background-color);
  font-size: 18px;
  font-weight: bold;
  width: 80px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  cursor: pointer;
`;
const MoMaKey = ({productSelect}: {productSelect: (idx: number) => void}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedProduct, setSelectedProduct] = useState<number>(0);
  const productSort: string[] = ['모니터', '마우스', '키보드'];
  const handleClick = (idx: number) => {
    productSelect(idx);
    setSelectedProduct(idx);
  };

  return (
    <FirstContainer>
      {productSort.map((item, idx) =>
        idx === selectedProduct ? (
          <FocusProductButton key={idx} onClick={() => handleClick(idx)}>
            {item}
          </FocusProductButton>
        ) : (
          <ProductButton key={idx} onClick={() => handleClick(idx)}>
            {item}
          </ProductButton>
        ),
      )}
    </FirstContainer>
  );
};

export default MoMaKey;
