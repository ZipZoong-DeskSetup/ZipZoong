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
  const {zustandKeyboardLayout, setZustandKeyboardLayout} =
    useComplicateSurveyStore();
  const [isFocus, setIsFocus] = useState<string | number | boolean>(
    zustandKeyboardLayout,
  );
  const questionContent = '어떤 키배열을 원하시나요?';
  const presentPage: string = '14';
  const futurePage: string = (parseInt(presentPage, 10) + 1).toString();
  const content: [string, string, 0 | 1 | 2 | 3 | 4][] = [
    ['풀 배열', '/Images/survey/keylayout/104.png', 4],
    ['풀 배열-', '/Images/survey/keylayout/100.png', 3],
    ['텐키리스', '/Images/survey/keylayout/80.png', 2],
    ['컴팩트, 미니', '/Images/survey/keylayout/61.png', 1],
    ['한 손', '/Images/survey/keylayout/50.png', 0],
  ];

  useEffect(() => {
    const initFocus = zustandKeyboardLayout;
    setIsFocus(initFocus);
    if (isFocus !== -1 && isFocus !== 'INIT') {
      setIsClicked(true);
    }
  }, [answer, isFocus, zustandKeyboardLayout]);

  // TODO: 배열 만들어서 저장하기(페이지 이동하기에서 주스탠드 저장하기)(마지막 질문들에서 서버에 보내기)
  const handleClick = (index: number) => {
    // eslint-disable-next-line no-console
    const nowAnswer: 0 | 1 | 2 | 3 | 4 = content[index][2];
    setZustandKeyboardLayout(nowAnswer);
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
      <Pass pageNumber={futurePage} />
      <PageMove presentPage={presentPage} isClicked={isClicked} />
    </div>
  );
};
export default Form;
