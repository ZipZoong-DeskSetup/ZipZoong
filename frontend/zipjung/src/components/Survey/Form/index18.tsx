'use client';

import {useState, useEffect} from 'react';
import Question from '@/components/Survey/Question';
import SurveyBox from '@/components/Survey/SurveyBox';
import PageMove from '@/components/Survey/PageMove';
import Pass from '@/components/Survey/Pass';
import useComplicateSurveyStore from '@/stores/complicateSurvey';
import styles from '@/components/Survey/index.module.scss';
/**
 * 내용, 클릭 체크 함수, 선택지 중복 개수 넣기
 */
const Form = () => {
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [answer, setAnswer] = useState<string | number | boolean>(-1);
  const {zustandMouseConnection, setZustandMouseConnection} =
    useComplicateSurveyStore();
  const [isFocus, setIsFocus] = useState<string | number | boolean>(
    zustandMouseConnection,
  );
  const questionContent = '마우스의 유/무선 중 선호하시는 방식이 있나요?';
  const presentPage: string = '18';
  const futurePage: string = (parseInt(presentPage, 10) + 1).toString();
  const content: [string, string, 'WIRE' | 'WIRELESS' | 'BOTH'][] = [
    ['유선', '', 'WIRE'],
    ['무선', '', 'WIRELESS'],
    ['유/무선', '', 'BOTH'],
  ];

  useEffect(() => {
    const initFocus = zustandMouseConnection;
    setIsFocus(initFocus);
    if (isFocus !== -1 && isFocus !== 'INIT') {
      setIsClicked(true);
    }
  }, [answer, isFocus, zustandMouseConnection]);

  // TODO: 배열 만들어서 저장하기(페이지 이동하기에서 주스탠드 저장하기)(마지막 질문들에서 서버에 보내기)
  const handleClick = (index: number) => {
    // eslint-disable-next-line no-console
    const nowAnswer: 'WIRE' | 'WIRELESS' | 'BOTH' = content[index][2];
    setZustandMouseConnection(nowAnswer);
    setIsClicked(true);
    setAnswer(nowAnswer);
  };
  return (
    <div className={styles.container}>
      <Question questionContent={questionContent} />
      <SurveyBox
        content={content}
        boxClick={handleClick}
        design={'threeStyles'}
        isFocus={isFocus}
      />
      <Pass pageNumber={futurePage} />
      <PageMove presentPage={presentPage} isClicked={isClicked} />
    </div>
  );
};
export default Form;
