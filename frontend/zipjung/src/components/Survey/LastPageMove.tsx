'use client';

import styles from '@/components/Survey/PageMove.module.scss';
import useFirstSurveyStore from '@/stores/firstSurvey';
import useSimpleSurveyStore from '@/stores/simpleSurvey';
import useComplicateSurveyStore from '@/stores/complicateSurvey';

// TODO: 선택시 움직일 수 있음(선택 어떻게 캐치?)
const PageMove = ({
  isClicked,
  submitClick,
}: {
  isClicked: boolean;
  submitClick: () => void;
}) => {
  const {resetSimpleSurvey} = useSimpleSurveyStore();
  const {resetFirstSurvey} = useFirstSurveyStore();
  const {resetComplicateSurvey} = useComplicateSurveyStore();

  const handleSubmitClick = () => {
    resetComplicateSurvey();
    resetFirstSurvey();
    resetSimpleSurvey();
    submitClick();
  };
  return (
    <div className={styles.container}>
      {isClicked ? (
        // FIXME: a태그 살리기
        // <a href={`/survey/result`}>
        <div className={styles.move} onClick={handleSubmitClick}>
          다음
        </div>
      ) : (
        // {/* </a> */}
        <a>
          <div className={styles.disabled}>다음</div>
        </a>
      )}
    </div>
  );
};
export default PageMove;
