'use client';

import {useState, useEffect} from 'react';
import Question from '@/components/Survey/Question';
import SurveyBoxDuplicate from '@/components/Survey/SurveyBoxDuplicate';
import PageMove from '@/components/Survey/PageMove';
import Pass from '@/components/Survey/Pass';
import useComplicateSurveyStore from '@/stores/complicateSurvey';
import styles from '@/components/Survey/index.module.scss';
/**
 * 내용, 클릭 체크 함수, 선택지 중복 개수 넣기
 */
const Form = () => {
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [answer, setAnswer] = useState<(2 | 1 | 4 | 8 | 16 | -1)[]>([-1]);
  const {zustandMonitorSize, setZustandMonitorSize} =
    useComplicateSurveyStore();
  const [isFocus, setIsFocus] =
    useState<(2 | 1 | 4 | 8 | 16 | -1)[]>(zustandMonitorSize);
  const questionContent = '선호하는 화면 사이즈를 선택하세요(중복 2개 가능)';
  const presentPage: string = '11';
  const futurePage: string = (parseInt(presentPage, 10) + 1).toString();
  const content: [string, string, 2 | 1 | 4 | 8 | 16][] = [
    ['24인치 미만', '', 1],
    ['24인치', '/Images/survey/size/24.png', 2],
    ['27인치', '/Images/survey/size/27.png', 4],
    ['32인치', '/Images/survey/size/32.png', 8],
    ['32인치 초과', '', 16],
  ];

  useEffect(() => {
    const initFocus = zustandMonitorSize;
    setIsFocus(initFocus);
    if (!isFocus.includes(-1)) {
      setIsClicked(true);
    }
  }, [answer, isFocus, zustandMonitorSize]);

  // TODO: 배열 만들어서 저장하기(페이지 이동하기에서 주스탠드 저장하기)(마지막 질문들에서 서버에 보내기)
  const handleClick = (focusing: (2 | 1 | 4 | 8 | 16)[]) => {
    // eslint-disable-next-line no-console
    setZustandMonitorSize(focusing);
    setIsClicked(true);
    setAnswer(focusing);
  };
  return (
    <div className={styles.container}>
      <Question questionContent={questionContent} />
      <SurveyBoxDuplicate
        content={content}
        boxClick={handleClick}
        design={'fiveStyles'}
        isFocus={isFocus}
      />
      <Pass pageNumber={futurePage} />
      <PageMove presentPage={presentPage} isClicked={isClicked} />
    </div>
  );
};
export default Form;
