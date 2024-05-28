'use client';

import styles from '@/components/Survey/PageMove.module.scss';

// TODO: 선택시 움직일 수 있음(선택 어떻게 캐치?)
const PageMove = ({goal, isClicked}: {goal: string; isClicked: boolean}) => {
  return (
    <div className={styles.container}>
      {isClicked ? (
        <a href={`/survey/${goal}`}>
          <div className={styles.move}>다음</div>
        </a>
      ) : (
        <a>
          <div className={styles.disabled}>다음</div>
        </a>
      )}
    </div>
  );
};
export default PageMove;
