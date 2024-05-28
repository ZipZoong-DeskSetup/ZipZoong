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
  const {zustandMonitorUsage, setZustandMonitorUsage} = useFirstSurveyStore();
  const [isFocus, setIsFocus] = useState<string | number | boolean>(
    zustandMonitorUsage,
  );
  const questionContent = '어떤 용도로 사용하실 건가요?';
  const presentPage: string = '1';
  const content: [string, string, 1 | 2 | 4 | 8 | 16][] = [
    ['사무', '', 1],
    ['게임', '', 2],
    ['개발', '', 4],
    ['영상', '', 8],
    ['취미', '', 16],
  ];

  useEffect(() => {
    const initFocus = zustandMonitorUsage;
    setIsFocus(initFocus);
    // setIsFocus(useFirstSurveyStore.getState().zustandMonitorUsage);

    // useFirstSurveyStore.subscribe(newData) => {
    //   setIsFocus(newData);
    // }
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
        design={'fiveStyles'}
        isFocus={isFocus}
      />
      <PageMove presentPage={presentPage} isClicked={isClicked} />
    </div>
  );
};
export default Form;
