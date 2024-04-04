/* eslint-disable no-console */

'use client';

import {useState, useEffect} from 'react';
import axios from 'axios';
import useUserInfoStore from '@/stores/userInfo';
import ResultImage from '@/components/Survey/Result/ResultImage';
import Question from '@/components/Survey/Question';
import styles from '@/components/Survey/Result/index.module.scss';
import {
  CombiKeyboardDetail,
  CombiMouseDetail,
  CombiMonitorDetail,
} from '@/types/MyPage';

interface ICombination {
  combinationId: number;
  monitors: CombiMonitorDetail[];
  keyboard: CombiKeyboardDetail;
  mouse: CombiMouseDetail;
  totalPrice: number;
}

interface ICombinationResponse {
  message: string;
  data: ICombination[];
}

const Form = () => {
  const [recommendCombi, setRecommendCombi] = useState<ICombination[] | null>(
    null,
  );
  const {ZustandToken} = useUserInfoStore();
  const [token, setToken] = useState<string>(ZustandToken);
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가

  useEffect(() => {
    setToken(ZustandToken);
  }, [ZustandToken]);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get<ICombinationResponse>(
        `${process.env.NEXT_PUBLIC_BASE_URL}/combination/recommend`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(response => {
        if (response !== null) {
          setRecommendCombi(response.data.data);
          setIsLoading(false);
        }
      })
      // eslint-disable-next-line no-console
      .catch(error => console.error('combination recommend: ', error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  if (isLoading) {
    return (
      <div className={styles.waitingMent}>
        추천을 받고 있습니다. 잠시만 기다려주세요...
      </div>
    );
  }

  // if (!isLoading) {
  //   return (
  //     <div className={styles.waitingMent}>추천 정보를 받고 있습니다...</div>
  //   );
  // }
  return (
    <div className={styles.FirstContainer}>
      <Question questionContent="이런 조합은 어떠세요?" />
      <div className={styles.middleContainer}>
        <div className={styles.imgContainer}>
          {recommendCombi === null && recommendCombi === undefined && (
            <div>추천 중</div>
          )}
          {recommendCombi !== null &&
            recommendCombi !== undefined &&
            recommendCombi.map((data, index) =>
              index > 3 ? null : (
                <ResultImage key={index} data={data} index={index} />
              ),
            )}
        </div>
        {recommendCombi !== null && recommendCombi !== undefined && (
          <div className={styles.reSurvey}>
            <a href="/survey/1">마음에 안들어요. 다른 추천 원해요.</a>
          </div>
        )}
      </div>
      {recommendCombi !== null && recommendCombi !== undefined && (
        <div className={styles.endSurvey}>
          <a href="/recommend">마음에 들어요. 추천 더보기</a>
        </div>
      )}
    </div>
  );
};
export default Form;
