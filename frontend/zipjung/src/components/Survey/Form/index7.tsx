'use client';

import {useState, useEffect} from 'react';
import axios from 'axios';
import Question from '@/components/Survey/Question';
import SurveyBox from '@/components/Survey/SurveyBox';
import LastPageMove from '@/components/Survey/LastPageMove';
import LastPass from '@/components/Survey/LastPass';
import useUserInfoStore from '@/stores/userInfo';
import useSimpleSurveyStore from '@/stores/simpleSurvey';
import useFirstSurveyStore from '@/stores/firstSurvey';
import {ISurvey, ISimpleSurvey} from '@/types/Survey';
import styles from '@/components/Survey/index.module.scss';
/**
 * 내용, 클릭 체크 함수, 선택지 중복 개수 넣기
 */
// TODO: 마지막 -> 서버 보내기
const Form = () => {
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [answer, setAnswer] = useState<string | number | boolean>(-1);
  const {
    setZustandKeyboardHealth,
    zustandKeyboardLayout,
    zustandKeyboardConnection,
    zustandKeyboardHealth,
  } = useSimpleSurveyStore();
  const {ZustandToken} = useUserInfoStore();
  const {zustandMonitorUsage, zustandTotalPrice, zustandColor} =
    useFirstSurveyStore();
  const [isFocus, setIsFocus] = useState<string | number | boolean>(
    zustandKeyboardHealth,
  );
  const questionContent = '손 건강이 안 좋으신가요?';
  const presentPage: string = '7';
  const content: [string, string, boolean][] = [
    ['예', '', true],
    ['아니오', '', false],
  ];

  useEffect(() => {
    const initFocus = zustandKeyboardHealth;
    setIsFocus(initFocus);
    if (isFocus !== -1 && isFocus !== 'INIT') {
      setIsClicked(true);
    }
  }, [answer, isFocus, zustandKeyboardHealth]);

  const SimpleSurvey: ISimpleSurvey = {
    surveyDetail: 'SIMPLE',
    monitorPrice: 0,
    keyboardPrice: 0,
    mousePrice: 0,
    monitorCount: 1,
    // FIXME: 백이랑 맞추고 수정 필요
    monitorSize: 4,
    monitorRatio: 1,
    monitorPanel: 'FLAT',
    keyboardType: 'MECHANICAL',
    keyboardSound: 'RED',
    mouseSound: true,
  };

  const handleClick = (index: number) => {
    // eslint-disable-next-line no-console
    const nowAnswer: boolean = content[index][2];
    setZustandKeyboardHealth(nowAnswer);
    setIsClicked(true);
    setAnswer(nowAnswer);
  };

  const handleSubmit = async (): Promise<void> => {
    try {
      const data: ISurvey = {
        ...SimpleSurvey,
        totalPrice: zustandTotalPrice,
        monitorUsage: zustandMonitorUsage !== -1 ? zustandMonitorUsage : 16,
        keyboardUsage: zustandMonitorUsage !== -1 ? zustandMonitorUsage : 16,
        mouseUsage: zustandMonitorUsage !== -1 ? zustandMonitorUsage : 16,
        keyboardColor: zustandColor !== 'INIT' ? zustandColor : 'NONE',
        mouseColor: zustandColor !== 'INIT' ? zustandColor : 'NONE',
        keyboardLayout:
          zustandKeyboardLayout === -1 ? 4 : zustandKeyboardLayout,
        keyboardConnection:
          zustandKeyboardConnection === 'INIT'
            ? 'BOTH'
            : zustandKeyboardConnection,
        mouseConnection:
          zustandKeyboardConnection === 'INIT'
            ? 'BOTH'
            : zustandKeyboardConnection,
        keyboardHealth:
          zustandKeyboardHealth !== 'INIT' ? zustandKeyboardHealth : false,
        mouseHealth:
          zustandKeyboardHealth !== 'INIT' ? zustandKeyboardHealth : false,
      };

      await axios.post<ISurvey>(`${process.env.NEXT_PUBLIC_BASE_URL}/survey`, {
        headers: {
          Authorization: ZustandToken,
        },
        data,
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('survey data post error: ', error);
    }
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
      <LastPass pageNumber={'result'} />
      <LastPageMove
        presentPage={presentPage}
        isClicked={isClicked}
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        submitClick={handleSubmit}
      />
    </div>
  );
};
export default Form;
