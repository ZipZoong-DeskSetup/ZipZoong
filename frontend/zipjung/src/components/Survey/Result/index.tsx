'use client';

import {useState, useEffect} from 'react';
import axios from 'axios';
import {
  CombiKeyboardDetail,
  CombiMouseDetail,
  CombiMonitorDetail,
} from '@/types/MyPage';

interface Idata {
  combinationId: number;
  monitors: CombiMonitorDetail[];
  keyboard: CombiKeyboardDetail;
  mouse: CombiMouseDetail;
  totalPrice: number;
}
interface IResponse {
  messages: string;
  data: Idata[];
}
const Form = () => {
  const [recommendCombi, setRecommendCombi] = useState<IResponse | string>('');
  useEffect(() => {
    axios
      .get<IResponse>(
        `${process.env.NEXT_PUBLIC_BASE_URL}/combination/recommend`,
      )
      .then(response => {
        if (typeof response !== 'string') {
          setRecommendCombi(response.data);
          // eslint-disable-next-line no-console
          console.log(response.data);
        }
      })
      // eslint-disable-next-line no-console
      .catch(error => console.error('combination recommend: ', error));
  });
  return (
    <div>
      결과
      {typeof recommendCombi !== 'string' && (
        <div>{recommendCombi.data[0].combinationId}</div>
      )}
    </div>
  );
};
export default Form;
