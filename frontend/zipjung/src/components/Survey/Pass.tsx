import styles from '@/components/Survey/Pass.module.scss';

const Pass = ({pageNumber}: {pageNumber: string}) => {
  return (
    <div className={styles.container}>
      <a className={styles.pass} href={`/survey/${pageNumber}`}>
        이 질문은 넘어가겠습니다.
      </a>
    </div>
  );
};
export default Pass;
