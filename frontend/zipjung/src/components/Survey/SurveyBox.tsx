/* eslint-disable @next/next/no-img-element */

import styles from '@/components/Survey/SurveyBoxFive.module.scss';

const SurveyBox = ({
  content,
  boxClick,
}: {
  content: (string | number | boolean)[][];
  boxClick: (index: number) => void;
}) => {
  return (
    <div className={styles.container}>
      {content.map((item, index) => (
        <div key={index} onClick={() => boxClick(index)} className={styles.box}>
          <div className={styles.positionContainer}>
            <div className={styles.content}>{item[0]}</div>
            {item[1] !== '' &&
              typeof item[1] === 'string' &&
              typeof item[0] === 'string' && (
                <div>
                  <img src={item[1]} alt={item[0]}></img>
                </div>
              )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SurveyBox;
