'use client';

import {useState, useEffect} from 'react';
import Question from '@/components/Survey/Question';
import SurveyBoxRatio from '@/components/Survey/SurveyBoxRatio';
import PageMove from '@/components/Survey/PageMove';
import Pass from '@/components/Survey/Pass';
import useComplicateSurveyStore from '@/stores/complicateSurvey';
import styles from '@/components/Survey/index.module.scss';
/**
 * 내용, 클릭 체크 함수, 선택지 중복 개수 넣기
 */
const Form = () => {
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [answer, setAnswer] = useState<(2 | 1 | 4 | 8 | -1)[]>([-1]);
  const {zustandMonitorRatio, setZustandMonitorRatio} =
    useComplicateSurveyStore();
  const [isFocus, setIsFocus] =
    useState<(2 | 1 | 4 | 8 | -1)[]>(zustandMonitorRatio);
  const questionContent = '선호하는 화면 비율을 선택하세요(중복 2개 가능)';
  const presentPage: string = '12';
  const futurePage: string = (parseInt(presentPage, 10) + 1).toString();
  const content: [string, string, 2 | 1 | 4 | 8][] = [
    ['16:9', '/Images/survey/ratio/16.png', 1],
    ['21:9', '/Images/survey/ratio/21.png', 2],
    ['32:9', '/Images/survey/ratio/32.png', 4],
    ['기타', '', 8],
  ];

  useEffect(() => {
    const initFocus = zustandMonitorRatio;
    setIsFocus(initFocus);
    if (!isFocus.includes(-1)) {
      setIsClicked(true);
    }
  }, [answer, isFocus, zustandMonitorRatio]);

  // TODO: 배열 만들어서 저장하기(페이지 이동하기에서 주스탠드 저장하기)(마지막 질문들에서 서버에 보내기)
  const handleClick = (focusing: (2 | 1 | 4 | 8)[]) => {
    // eslint-disable-next-line no-console
    setZustandMonitorRatio(focusing);
    setIsClicked(true);
    setAnswer(focusing);
  };
  return (
    <div className={styles.container}>
      <Question questionContent={questionContent} />
      <SurveyBoxRatio
        content={content}
        boxClick={handleClick}
        design={'fourStyles'}
        isFocus={isFocus}
      />
      <Pass pageNumber={futurePage} />
      <PageMove presentPage={presentPage} isClicked={isClicked} />
    </div>
  );
};
export default Form;
