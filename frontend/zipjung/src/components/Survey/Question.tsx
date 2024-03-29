import styles from '@/components/Survey/Question.module.scss';

const Question = ({
  questionContent,
}: {
  questionContent: string | JSX.Element;
}) => {
  return <div className={styles.question}>{questionContent}</div>;
};
export default Question;
