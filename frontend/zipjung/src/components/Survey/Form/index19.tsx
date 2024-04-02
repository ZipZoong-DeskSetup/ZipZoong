'use client';

import {useState, useEffect} from 'react';
import axios from 'axios';
import Question from '@/components/Survey/Question';
import SurveyBox from '@/components/Survey/SurveyBox';
import LastPageMove from '@/components/Survey/LastPageMove';
import LastPass from '@/components/Survey/LastPass';
import useUserInfoStore from '@/stores/userInfo';
import useFirstSurveyStore from '@/stores/firstSurvey';
import useComplicateSurveyStore from '@/stores/complicateSurvey';
import {ISurvey} from '@/types/Survey';
import styles from '@/components/Survey/index.module.scss';
/**
 * 내용, 클릭 체크 함수, 선택지 중복 개수 넣기
 */
// TODO: 마지막 -> 서버 보내기
const Form = () => {
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [answer, setAnswer] = useState<string | number | boolean>(-1);
  const {
    setZustandHealth,
    zustandHealth,
    zustandMouseConnection,
    zustandSound,
    zustandKeyboardConnection,
    zustandKeyboardType,
    zustandKeyboardLayout,
    zustandKeyboardSound,
    zustandMonitorPanel,
    zustandMonitorRatio,
    zustandMonitorSize,
  } = useComplicateSurveyStore();
  const {ZustandToken} = useUserInfoStore();
  const {zustandMonitorUsage, zustandTotalPrice, zustandColor} =
    useFirstSurveyStore();
  const [isFocus, setIsFocus] = useState<string | number | boolean>(
    zustandHealth,
  );
  const questionContent = '손 건강이 안 좋으신가요?';
  const content: [string, string, boolean][] = [
    ['예', '', true],
    ['아니오', '', false],
  ];

  useEffect(() => {
    const initFocus = zustandHealth;
    setIsFocus(initFocus);
    if (isFocus !== -1 && isFocus !== 'INIT') {
      setIsClicked(true);
    }
  }, [answer, isFocus, zustandHealth]);

  const handleClick = (index: number) => {
    // eslint-disable-next-line no-console
    const nowAnswer: boolean = content[index][2];
    setZustandHealth(nowAnswer);
    setIsClicked(true);
    setAnswer(nowAnswer);
  };

  const monitorSizeSum = zustandMonitorSize.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0,
  );
  const monitorRatioSum = zustandMonitorRatio.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0,
  );

  const handleSubmit = async (): Promise<void> => {
    try {
      const data: ISurvey = {
        totalPrice: zustandTotalPrice,
        surveyDetail: 'DETAIL',
        monitorPrice: 0,
        keyboardPrice: 0,
        mousePrice: 0,
        monitorUsage: zustandMonitorUsage !== -1 ? zustandMonitorUsage : 16,
        keyboardUsage: zustandMonitorUsage !== -1 ? zustandMonitorUsage : 16,
        mouseUsage: zustandMonitorUsage !== -1 ? zustandMonitorUsage : 16,
        keyboardColor: zustandColor !== 'INIT' ? zustandColor : 'NONE',
        mouseColor: zustandColor !== 'INIT' ? zustandColor : 'NONE',
        monitorCount: 1,
        keyboardLayout:
          zustandKeyboardLayout === -1 ? 4 : zustandKeyboardLayout,
        keyboardConnection:
          zustandKeyboardConnection === 'INIT'
            ? 'BOTH'
            : zustandKeyboardConnection,
        mouseConnection:
          zustandMouseConnection === 'INIT' ? 'BOTH' : zustandMouseConnection,
        keyboardHealth: zustandHealth !== 'INIT' ? zustandHealth : false,
        mouseHealth: zustandHealth !== 'INIT' ? zustandHealth : false,
        monitorSize: zustandMonitorSize.includes(-1) ? 4 : monitorSizeSum,
        monitorRatio: zustandMonitorRatio.includes(-1) ? 1 : monitorRatioSum,
        monitorPanel:
          zustandMonitorPanel === 'INIT' ? 'FLAT' : zustandMonitorPanel,
        keyboardType:
          zustandKeyboardType === 'INIT' ? 'MEMBRANE' : zustandKeyboardType,
        keyboardSound:
          zustandKeyboardSound === 'INIT' ||
          zustandKeyboardType !== 'MECHANICAL'
            ? 'RED'
            : zustandKeyboardSound,
        mouseSound: zustandSound === 'INIT' ? true : zustandSound,
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
        isClicked={isClicked}
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        submitClick={handleSubmit}
      />
    </div>
  );
};
export default Form;
