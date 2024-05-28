'use client';

import {useState, useEffect} from 'react';
import Question from '@/components/Survey/Question';
import SurveyBox from '@/components/Survey/SurveyBox';
import PageMove from '@/components/Survey/PageMove';
import useFirstSurveyStore from '@/stores/firstSurvey';
import styles from '@/components/Survey/index.module.scss';
/**
 * 내용, 클릭 체크 함수, 선택지 중복 개수 넣기
 */

const Form = () => {
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [answer, setAnswer] = useState<string | number | boolean>(-1);
  const {zustandColor, setZustandColor} = useFirstSurveyStore();
  const [isFocus, setIsFocus] = useState<string | number | boolean>(
    zustandColor,
  );
  const questionContent = '원하는 색상을 선택해 주세요';
  const presentPage: string = '3';
  const content: [string, string, 'BLACK' | 'WHITE' | 'COLOR' | 'NONE'][] = [
    ['블랙톤', '', 'BLACK'],
    ['화이트톤', '', 'WHITE'],
    ['칼라톤', '', 'COLOR'],
    ['상관없음', '', 'NONE'],
  ];

  useEffect(() => {
    const initFocus = zustandColor;
    setIsFocus(initFocus);
    if (isFocus !== -1 && isFocus !== 'INIT') {
      setIsClicked(true);
    }
  }, [answer, isFocus, zustandColor]);

  // TODO: 배열 만들어서 저장하기(페이지 이동하기에서 주스탠드 저장하기)(마지막 질문들에서 서버에 보내기)
  const handleClick = (index: number) => {
    // eslint-disable-next-line no-console
    const nowAnswer: 'BLACK' | 'WHITE' | 'COLOR' | 'NONE' = content[index][2];
    setZustandColor(nowAnswer);
    setIsClicked(true);
    setAnswer(nowAnswer);
  };

  return (
    <div className={styles.container}>
      <Question questionContent={questionContent} />
      <SurveyBox
        content={content}
        boxClick={handleClick}
        design={'fourStyles'}
        isFocus={isFocus}
      />
      <PageMove presentPage={presentPage} isClicked={isClicked} />
    </div>
  );
};
export default Form;
