'use client';

import {useState, useEffect} from 'react';
import Question from '@/components/Survey/Question';
import SurveyBox from '@/components/Survey/SurveyBox';
import Intersection from '@/components/Survey/Intersection';
import useSurveyIntersectionStore from '@/stores/surveyIntersection';
import styles from '@/components/Survey/index.module.scss';
/**
 * 내용, 클릭 체크 함수, 선택지 중복 개수 넣기
 */

const Form = () => {
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [answer, setAnswer] = useState<string | number | boolean>(-1);
  const {ZustandSelection, setZustandSelection} = useSurveyIntersectionStore();
  const [isFocus, setIsFocus] = useState<string | number | boolean>(
    ZustandSelection,
  );
  const questionContent = (
    <span>
      간단한 설문 후 추천을 받고 싶나요? <br />
      자세한 설문 후 추천을 받고 싶나요?
    </span>
  );
  const content: [string, string, '5' | '11'][] = [
    ['간단하게', '', '5'],
    ['자세하게', '', '11'],
  ];

  useEffect(() => {
    const initFocus = ZustandSelection;
    setIsFocus(initFocus);
    if (isFocus !== 'INIT') {
      setIsClicked(true);
    }
  }, [ZustandSelection, answer, isFocus]);

  // TODO: 배열 만들어서 저장하기(페이지 이동하기에서 주스탠드 저장하기)(마지막 질문들에서 서버에 보내기)
  const handleClick = (index: number) => {
    // eslint-disable-next-line no-console
    const nowAnswer: '5' | '11' = content[index][2];
    setZustandSelection(nowAnswer);
    setIsClicked(true);
    setAnswer(nowAnswer);
  };

  return (
    <div className={styles.container}>
      <Question questionContent={questionContent} />
      <SurveyBox
        content={content}
        boxClick={handleClick}
        design={'twoStyles'}
        isFocus={isFocus}
      />
      <Intersection isClicked={isClicked} goal={ZustandSelection} />
    </div>
  );
};
export default Form;
