'use client';

import {useState, useEffect} from 'react';
import styled from 'styled-components';
import useFirstSurveyStore from '@/stores/firstSurvey';

const FirstContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
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
  background-color: var(--original-font-color);
  border-radius: 10px;
  margin: 8px 0px 0px -5px;
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
  justify-content: center;
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
  margin-left: 65px;
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

const PriceInfo = styled.div`
  font-size: 20px;
  display: flex;
  width: 100%;
  justify-content: space-between;
`;
const DoubleHandleRangeSlider = () => {
  const [maxValue, setMaxValue] = useState(500);
  const {setZustandTotalPrice} = useFirstSurveyStore();

  const handleMaxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newMax: number = parseInt(event.target.value, 10);
    setMaxValue(newMax);
  };

  useEffect(() => {
    const saveMaxValue = () => {
      setZustandTotalPrice(maxValue);
    };
    const timerId = setTimeout(saveMaxValue, 500);
    return () => clearTimeout(timerId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maxValue]);

  return (
    <FirstContainer>
      <Container>
        <Slider>
          <SlideBar></SlideBar>
          <MaxBar
            type="range"
            min="10"
            max="500"
            value={maxValue}
            onChange={handleMaxChange}
          />
          <PriceInfo>
            <span>10만원</span>
            <span>500만원</span>
          </PriceInfo>
        </Slider>
        <NumberContainer>
          <NumberDiv>
            <NumberExplain>최대</NumberExplain>
            <PriceInput
              type="number"
              min="10"
              max="500"
              value={maxValue}
              onChange={handleMaxChange}
            />
            <Won>만원</Won>
          </NumberDiv>
        </NumberContainer>
      </Container>
    </FirstContainer>
  );
};

export default DoubleHandleRangeSlider;
