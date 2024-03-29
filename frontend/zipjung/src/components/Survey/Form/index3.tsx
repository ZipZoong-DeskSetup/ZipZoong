'use client';

import {useState} from 'react';
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
  const {setZustandColor} = useFirstSurveyStore();
  const questionContent = '원하는 색상을 선택해 주세요';
  const presentPage: string = '3';
  const content: [string, string, 'BLACK' | 'WHITE' | 'COLOR' | 'NONE'][] = [
    ['블랙톤', '', 'BLACK'],
    ['화이트톤', '', 'WHITE'],
    ['칼라톤', '', 'COLOR'],
    ['상관없음', '', 'NONE'],
  ];

  // TODO: 배열 만들어서 저장하기(페이지 이동하기에서 주스탠드 저장하기)(마지막 질문들에서 서버에 보내기)
  const handleClick = (index: number) => {
    // eslint-disable-next-line no-console
    const answer: 'BLACK' | 'WHITE' | 'COLOR' | 'NONE' = content[index][2];
    setZustandColor(answer);
    setIsClicked(true);
  };

  return (
    <div className={styles.container}>
      <Question questionContent={questionContent} />
      <SurveyBox
        content={content}
        boxClick={handleClick}
        design={'fourStyles'}
      />
      <PageMove presentPage={presentPage} isClicked={isClicked} />
    </div>
  );
};
export default Form;
