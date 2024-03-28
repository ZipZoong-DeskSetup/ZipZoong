'use client';

import SurveyBox from '@/components/Survey/SurveyBox';

const Form = () => {
  const content: (string | number | boolean)[][] = [
    ['24인치 미만', '', 20],
    ['24인치', '/Images/survey/size/24.png', 24],
    ['27인치', '/Images/survey/size/27.png', 27],
    ['32인치', '/Images/survey/size/32.png', 32],
    ['32인치 초과', '', 38],
  ];

  // TODO: 주스탠드 저장하기(마지막 질문들에서 서버에 보내기)
  const handleClick = (index: number) => {
    // eslint-disable-next-line no-console
    console.log(content[index][2]);
  };
  return (
    <div>
      설문 테스트
      <SurveyBox content={content} boxClick={handleClick} />
    </div>
  );
};
export default Form;
