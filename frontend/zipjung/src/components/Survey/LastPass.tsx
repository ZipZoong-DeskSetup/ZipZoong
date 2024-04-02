import styles from '@/components/Survey/Pass.module.scss';
import useFirstSurveyStore from '@/stores/firstSurvey';
import useSimpleSurveyStore from '@/stores/simpleSurvey';
import useComplicateSurveyStore from '@/stores/complicateSurvey';

const Pass = ({pageNumber}: {pageNumber: string}) => {
  const {resetSimpleSurvey} = useSimpleSurveyStore();
  const {resetFirstSurvey} = useFirstSurveyStore();
  const {resetComplicateSurvey} = useComplicateSurveyStore();

  const handleClick = () => {
    resetFirstSurvey();
    resetComplicateSurvey();
    resetSimpleSurvey();
  };
  return (
    <div className={styles.container} onClick={handleClick}>
      <a className={styles.pass} href={`/survey/${pageNumber}`}>
        이 질문은 넘어가겠습니다.
      </a>
    </div>
  );
};
export default Pass;
