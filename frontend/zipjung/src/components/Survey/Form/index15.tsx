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
  const {
    zustandKeyboardSound,
    setZustandKeyboardSound,
    zustandKeyboardType,
    setZustandKeyboardType,
  } = useComplicateSurveyStore();
  const [isFocus, setIsFocus] = useState<string | number | boolean>(
    zustandKeyboardType,
  );
  const [soundIsFocus, setSoundIsFocus] = useState<string | number | boolean>(
    zustandKeyboardSound,
  );
  const questionContent = '선호하는 항목을 선택해주세요';
  const presentPage: string = '15';
  const futurePage: string = (parseInt(presentPage, 10) + 1).toString();
  const content: [
    JSX.Element,
    string,
    'MEMBRANE' | 'MECHANICAL' | 'PANTOGRAPH',
  ][] = [
    [
      <>
        저렴하고, 내구성이
        <br /> 좋은 키보드(멤브레인)
      </>,
      '',
      'MEMBRANE',
    ],
    [
      <>
        키감이 좋은 키보드
        <br />
        (기계식 키보드)
      </>,
      '',
      'MECHANICAL',
    ],
    [
      <>
        휴대성이 좋고, <br />
        가벼운 키보드(펜타그래프)
      </>,
      '',
      'PANTOGRAPH',
    ],
  ];

  const soundContent: [string, string, 'RED' | 'BLACK' | 'BROWN' | 'BLUE'][] = [
    ['조용했으면 좋겠다(적축)', '', 'RED'],
    ['조용하면서 묵직한 키압을 선호한다(흑축)', '', 'BLACK'],
    ['조용하지만 키감이 어느정도 있는걸 선호한다(갈축)', '', 'BROWN'],
    ['소리가 났으면 좋겠다(청축)', '', 'BLUE'],
  ];

  useEffect(() => {
    const initFocus = zustandKeyboardType;
    const soundInitFocus = zustandKeyboardSound;
    setIsFocus(initFocus);
    setSoundIsFocus(soundInitFocus);
    if (isFocus !== -1 && isFocus !== 'INIT') {
      setIsClicked(true);
    }
  }, [answer, isFocus, zustandKeyboardSound, zustandKeyboardType]);

  // TODO: 배열 만들어서 저장하기(페이지 이동하기에서 주스탠드 저장하기)(마지막 질문들에서 서버에 보내기)
  const handleClick = (index: number) => {
    // eslint-disable-next-line no-console
    const nowAnswer: 'MEMBRANE' | 'MECHANICAL' | 'PANTOGRAPH' =
      content[index][2];
    setZustandKeyboardType(nowAnswer);
    setIsClicked(true);
    setAnswer(nowAnswer);
  };

  const handleSoundClick = (index: number) => {
    // eslint-disable-next-line no-console
    const nowAnswer: 'RED' | 'BLACK' | 'BROWN' | 'BLUE' =
      soundContent[index][2];
    setZustandKeyboardSound(nowAnswer);
  };
  return (
    <div className={styles.container}>
      <Question questionContent={questionContent} />
      {isFocus === 'MECHANICAL' ? (
        <>
          <SurveyBox
            content={content}
            boxClick={handleClick}
            design={'upperStyles'}
            isFocus={isFocus}
          />
          <SurveyBox
            content={soundContent}
            boxClick={handleSoundClick}
            design={'fourStyles'}
            isFocus={soundIsFocus}
          />
        </>
      ) : (
        <SurveyBox
          content={content}
          boxClick={handleClick}
          design={'threeStyles'}
          isFocus={isFocus}
        />
      )}

      <Pass pageNumber={futurePage} />
      <PageMove presentPage={presentPage} isClicked={isClicked} />
    </div>
  );
};
export default Form;
