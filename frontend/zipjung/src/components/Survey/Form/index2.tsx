'use client';

import Question from '@/components/Survey/Question';
import DoubleHandleRangeSlider from '@/components/Survey/DoubleHandleRangeSlider';
import PageMove from '@/components/Survey/PageMove';

import styles from '@/components/Survey/index.module.scss';
/**
 * 내용, 클릭 체크 함수, 선택지 중복 개수 넣기
 */
const Form = () => {
  const questionContent = '최대 가격을 설정해주세요';
  const presentPage: string = '2';

  // TODO: 배열 만들어서 저장하기(페이지 이동하기에서 주스탠드 저장하기)(마지막 질문들에서 서버에 보내기)

  return (
    <div className={styles.container}>
      <Question questionContent={questionContent} />
      <DoubleHandleRangeSlider />
      <PageMove presentPage={presentPage} isClicked={true} />
    </div>
  );
};
export default Form;
