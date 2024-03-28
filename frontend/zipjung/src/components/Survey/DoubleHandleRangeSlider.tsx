'use client';

import {useState} from 'react';
import styled from 'styled-components';

type SliderProps = {
  maxPercent: number;
  minPercent: number;
};

const Container = styled.form`
  display: flex;
  width: 80%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const Slider = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
`;

const SlideBar = styled.div`
  position: relative;
  width: 100%;
  height: 10px;
  background-color: var(--button-main-disabled-color);
  border-radius: 10px;
  margin: 8px 0px 0px -5px;
`;

const PriceSlideBar = styled.div<SliderProps>`
  position: absolute;
  height: 10px;
  background-color: var(--original-font-color);
  left: ${props => props.minPercent}%;
  right: ${props => 100 - props.maxPercent}%;
`;

const MinBar = styled.input`
  width: 100%;
  position: absolute;
  border: none;
  -webkit-appearance: none;
  background: none;
  pointer-events: none;
  &::-webkit-slider-thumb {
    pointer-events: auto;
    height: 30px;
    width: 30px;
    border-radius: 50%;
    border: 2px solid var(--main-color-dark);
    background-color: white;
    -webkit-appearance: none;
  }
`;

const MaxBar = styled.input`
  width: 100%;
  position: absolute;
  border: none;
  -webkit-appearance: none;
  background: none;
  pointer-events: none;
  &::-webkit-slider-thumb {
    pointer-events: auto;
    height: 30px;
    width: 30px;
    border-radius: 50%;
    border: 2px solid var(--main-color-dark);
    background-color: white;
    -webkit-appearance: none;
  }
`;

const NumberContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0px 10px 0px 10px;
`;

const NumberDiv = styled.div`
  margin-top: 40px;
  width: 170px;
  height: 80px;
  border-radius: 10px;
  border: solid 2px var(--main-color);
  background-color: white;
  display: flex;
  flex-direction: column;
`;

const NumberExplain = styled.div`
  font-size: 14px;
  margin-left: 10px;
  margin-top: 3px;
  color: var(--original-font-color);
`;

const PriceInput = styled.input`
  width: fit-content;
  margin-left: 45px;
  font-size: 20px;
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  &:focus {
    outline: none;
  }
`;

const Won = styled.div`
  font-size: 14px;
  margin-left: auto;
  margin-right: 10px;
  margin-bottom: 3px;
  color: var(--original-font-color);
`;

const DoubleHandleRangeSlider = () => {
  const [minValue, setMinValue] = useState(100000);
  const [maxValue, setMaxValue] = useState(5000000);
  const minPercent = (minValue / 5000000) * 100;
  const maxPercent = (maxValue / 5000000) * 100;

  const handleMinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newMin: number = Math.min(parseInt(event.target.value, 10), maxValue);
    setMinValue(newMin);
  };
  const handleMaxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newMax: number = Math.max(parseInt(event.target.value, 10), minValue);
    setMaxValue(newMax);
  };

  return (
    <Container>
      <Slider>
        <SlideBar>
          <PriceSlideBar minPercent={minPercent} maxPercent={maxPercent} />
        </SlideBar>
        <MaxBar
          type="range"
          min="100000"
          max="5000000"
          value={maxValue}
          onChange={handleMaxChange}
        />
        <MinBar
          type="range"
          min="100000"
          max="5000000"
          value={minValue}
          onChange={handleMinChange}
        />
      </Slider>
      <NumberContainer>
        <NumberDiv>
          <NumberExplain>최소</NumberExplain>
          <PriceInput
            type="number"
            min="100000"
            max="5000000"
            value={minValue}
            onChange={handleMinChange}
          />
          <Won>원</Won>
        </NumberDiv>
        <NumberDiv>
          <NumberExplain>최대</NumberExplain>
          <PriceInput
            type="number"
            min="100000"
            max="5000000"
            value={maxValue}
            onChange={handleMaxChange}
          />
          <Won>원</Won>
        </NumberDiv>
      </NumberContainer>
    </Container>
  );
};

export default DoubleHandleRangeSlider;
