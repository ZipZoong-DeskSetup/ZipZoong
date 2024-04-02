/* eslint-disable react/jsx-key */

'use client';

import {useState, useEffect} from 'react';
import Question from '@/components/Survey/Question';
import SurveyBox from '@/components/Survey/SurveyBox';
import PageMove from '@/components/Survey/PageMove';
import useFirstSurveyStore from '@/stores/firstSurvey';
import Pass from '@/components/Survey/Pass';
import styles from '@/components/Survey/index.module.scss';
/**
 * 내용, 클릭 체크 함수, 선택지 중복 개수 넣기
 */
const Form = () => {
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [answer, setAnswer] = useState<string | number | boolean>(-1);
  const {zustandMonitorUsage, setZustandMonitorUsage} = useFirstSurveyStore();
  const [isFocus, setIsFocus] = useState<string | number | boolean>(
    zustandMonitorUsage,
  );
  const questionContent = '어떤 작업을 많이 하시나요?';
  const presentPage: string = '5';
  const content: [JSX.Element, string, 2 | 4][] = [
    [
      <div>
        숫자 작업이 많거나,
        <br /> 키보드 사용시간이 짧다.
      </div>,
      '',
      4,
    ],
    [<div>자세나 공간 활용을 중요시한다</div>, '', 2],
  ];
  const futurePage: string = (parseInt(presentPage, 10) + 1).toString();

  useEffect(() => {
    const initFocus = zustandMonitorUsage;
    setIsFocus(initFocus);
    if (isFocus !== -1 && isFocus !== 'INIT') {
      setIsClicked(true);
    }
  }, [answer, isFocus, zustandMonitorUsage]);

  // TODO: 배열 만들어서 저장하기(페이지 이동하기에서 주스탠드 저장하기)(마지막 질문들에서 서버에 보내기)
  const handleClick = (index: number) => {
    // eslint-disable-next-line no-console
    const nowAnswer: 1 | 2 | 4 | 8 | 16 = content[index][2];
    setZustandMonitorUsage(nowAnswer);
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
      <Pass pageNumber={futurePage} />
      <PageMove presentPage={presentPage} isClicked={isClicked} />
    </div>
  );
};
export default Form;
