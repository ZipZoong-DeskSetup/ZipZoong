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
  const {zustandMonitorPanel, setZustandMonitorPanel} =
    useComplicateSurveyStore();
  const [isFocus, setIsFocus] = useState<string | number | boolean>(
    zustandMonitorPanel,
  );
  const questionContent = '선호하는 패널 형태를 선택하세요';
  const presentPage: string = '13';
  const futurePage: string = (parseInt(presentPage, 10) + 1).toString();
  const content: [string, string, 'FLAT' | 'CURVED'][] = [
    ['평면형', '', 'FLAT'],
    ['곡면형', '', 'CURVED'],
  ];

  useEffect(() => {
    const initFocus = zustandMonitorPanel;
    setIsFocus(initFocus);
    if (isFocus !== -1 && isFocus !== 'INIT') {
      setIsClicked(true);
    }
  }, [answer, isFocus, zustandMonitorPanel]);

  // TODO: 배열 만들어서 저장하기(페이지 이동하기에서 주스탠드 저장하기)(마지막 질문들에서 서버에 보내기)
  const handleClick = (index: number) => {
    // eslint-disable-next-line no-console
    const nowAnswer: 'FLAT' | 'CURVED' = content[index][2];
    setZustandMonitorPanel(nowAnswer);
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
