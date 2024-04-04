'use client';

import {useEffect, useState} from 'react';
import useFirstSurveyStore from '@/stores/firstSurvey';
import Question from '@/components/Survey/Question';
import PricePageMove from '@/components/Survey/PricePageMove';
import styles from '@/components/Survey/index.module.scss';
import SlideBar from '@/components/Survey/SlideBar';
/**
 * 내용, 클릭 체크 함수, 선택지 중복 개수 넣기
 */
const Form = () => {
  const {zustandTotalPrice, setZustandTotalPrice} = useFirstSurveyStore();
  const [maxValue, setMaxValue] = useState(zustandTotalPrice);
  const questionContent = '최대 가격을 설정해주세요';
  const presentPage: string = '2';

  useEffect(() => {
    const initPrice = zustandTotalPrice;
    setMaxValue(initPrice);
  }, [zustandTotalPrice]);
  // TODO: 배열 만들어서 저장하기(페이지 이동하기에서 주스탠드 저장하기)(마지막 질문들에서 서버에 보내기)

  const handlePageMove = () => {
    setZustandTotalPrice(maxValue);
  };

  return (
    <div className={styles.container}>
      <Question questionContent={questionContent} />
      <SlideBar setMaxValue={setMaxValue} />
      <PricePageMove
        onPageMove={handlePageMove}
        presentPage={presentPage}
        isClicked={true}
      />
    </div>
  );
};
export default Form;
