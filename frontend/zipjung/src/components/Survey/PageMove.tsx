'use client';

import styles from '@/components/Survey/PageMove.module.scss';

// TODO: 선택시 움직일 수 있음(선택 어떻게 캐치?)
const PageMove = ({
  presentPage,
  isClicked,
}: {
  presentPage: string;
  isClicked: boolean;
}) => {
  const pageNumber = parseInt(presentPage, 10);
  const nextPage = pageNumber + 1;
  let formerPage = pageNumber - 1;
  if (pageNumber === 11) {
    formerPage = 4;
  }

  return (
    <div className={styles.container}>
      {presentPage === '1' ? (
        <a>
          <div className={styles.disabled}>이전</div>
        </a>
      ) : (
        <a href={`/survey/${formerPage}`}>
          <div className={styles.move}>이전</div>
        </a>
      )}

      {isClicked ? (
        <a href={`/survey/${nextPage}`}>
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
