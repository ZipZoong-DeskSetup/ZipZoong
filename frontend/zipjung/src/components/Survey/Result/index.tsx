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
  // const dummy: ICombination[] = [
  //   {
  //     combinationId: 1,
  //     monitors: [
  //       {
  //         id: 1,
  //         name: 'dummy',
  //         price: 1,
  //         img: '/Images/monitor.png',
  //         brand: 'dummy',
  //         url: 'dummy',
  //         category: 'MONITOR',
  //         size: 1,
  //         resolution: 'dummy',
  //         aspectRatio: 'dummy',
  //         refreshRate: 1,
  //         panelType: 'dummy',
  //         panelFormType: 'dummy',
  //       },
  //       {
  //         id: 2,
  //         name: 'dummy',
  //         price: 1,
  //         img: '/Images/monitor.png',
  //         brand: 'dummy',
  //         url: 'dummy',
  //         category: 'MONITOR',
  //         size: 1,
  //         resolution: 'dummy',
  //         aspectRatio: 'dummy',
  //         refreshRate: 1,
  //         panelType: 'dummy',
  //         panelFormType: 'dummy',
  //       },
  //     ],
  //     mouse: {
  //       id: 2,
  //       name: 'dummy',
  //       price: 1,
  //       img: '/Images/mouse.png',
  //       brand: 'dummy',
  //       url: 'dummy',
  //       category: 'MOUSE',
  //       connect: 'dummy',
  //       connectInterface: 'dummy',
  //       mouseType: 'dummy',
  //       dpi: 1,
  //       color: 'dummy',
  //       weight: 1,
  //       width: 1,
  //       length: 1,
  //       height: 1,
  //       isSound: true,
  //     },
  //     keyboard: {
  //       id: 2,
  //       name: 'dummy',
  //       price: 1,
  //       img: '/Images/mouse.png',
  //       brand: 'dummy',
  //       url: 'dummy',
  //       category: 'KEYBOARD',
  //       connect: 'dummy',
  //       connectInterface: 'dummy',
  //       keySwitch: 'dummy',
  //       led: 'dummy',
  //       num: 1,
  //       force: 2,
  //       color: 'dummy',
  //       form: 'dummy',
  //       contact: 'dummy',
  //     },
  //     totalPrice: 10,
  //   },
  //   {
  //     combinationId: 1,
  //     monitors: [
  //       {
  //         id: 1,
  //         name: 'dummy',
  //         price: 1,
  //         img: '/Images/monitor.png',
  //         brand: 'dummy',
  //         url: 'dummy',
  //         category: 'MONITOR',
  //         size: 1,
  //         resolution: 'dummy',
  //         aspectRatio: 'dummy',
  //         refreshRate: 1,
  //         panelType: 'dummy',
  //         panelFormType: 'dummy',
  //       },
  //       {
  //         id: 2,
  //         name: 'dummy',
  //         price: 1,
  //         img: '/Images/monitor.png',
  //         brand: 'dummy',
  //         url: 'dummy',
  //         category: 'MONITOR',
  //         size: 1,
  //         resolution: 'dummy',
  //         aspectRatio: 'dummy',
  //         refreshRate: 1,
  //         panelType: 'dummy',
  //         panelFormType: 'dummy',
  //       },
  //     ],
  //     mouse: {
  //       id: 2,
  //       name: 'dummy',
  //       price: 1,
  //       img: '/Images/mouse.png',
  //       brand: 'dummy',
  //       url: 'dummy',
  //       category: 'MOUSE',
  //       connect: 'dummy',
  //       connectInterface: 'dummy',
  //       mouseType: 'dummy',
  //       dpi: 1,
  //       color: 'dummy',
  //       weight: 1,
  //       width: 1,
  //       length: 1,
  //       height: 1,
  //       isSound: true,
  //     },
  //     keyboard: {
  //       id: 2,
  //       name: 'dummy',
  //       price: 1,
  //       img: '/Images/mouse.png',
  //       brand: 'dummy',
  //       url: 'dummy',
  //       category: 'KEYBOARD',
  //       connect: 'dummy',
  //       connectInterface: 'dummy',
  //       keySwitch: 'dummy',
  //       led: 'dummy',
  //       num: 1,
  //       force: 2,
  //       color: 'dummy',
  //       form: 'dummy',
  //       contact: 'dummy',
  //     },
  //     totalPrice: 10,
  //   },
  //   {
  //     combinationId: 1,
  //     monitors: [
  //       {
  //         id: 1,
  //         name: 'dummy',
  //         price: 1,
  //         img: '/Images/monitor.png',
  //         brand: 'dummy',
  //         url: 'dummy',
  //         category: 'MONITOR',
  //         size: 1,
  //         resolution: 'dummy',
  //         aspectRatio: 'dummy',
  //         refreshRate: 1,
  //         panelType: 'dummy',
  //         panelFormType: 'dummy',
  //       },
  //       {
  //         id: 2,
  //         name: 'dummy',
  //         price: 1,
  //         img: '/Images/monitor.png',
  //         brand: 'dummy',
  //         url: 'dummy',
  //         category: 'MONITOR',
  //         size: 1,
  //         resolution: 'dummy',
  //         aspectRatio: 'dummy',
  //         refreshRate: 1,
  //         panelType: 'dummy',
  //         panelFormType: 'dummy',
  //       },
  //     ],
  //     mouse: {
  //       id: 2,
  //       name: 'dummy',
  //       price: 1,
  //       img: '/Images/mouse.png',
  //       brand: 'dummy',
  //       url: 'dummy',
  //       category: 'MOUSE',
  //       connect: 'dummy',
  //       connectInterface: 'dummy',
  //       mouseType: 'dummy',
  //       dpi: 1,
  //       color: 'dummy',
  //       weight: 1,
  //       width: 1,
  //       length: 1,
  //       height: 1,
  //       isSound: true,
  //     },
  //     keyboard: {
  //       id: 2,
  //       name: 'dummy',
  //       price: 1,
  //       img: '/Images/mouse.png',
  //       brand: 'dummy',
  //       url: 'dummy',
  //       category: 'KEYBOARD',
  //       connect: 'dummy',
  //       connectInterface: 'dummy',
  //       keySwitch: 'dummy',
  //       led: 'dummy',
  //       num: 1,
  //       force: 2,
  //       color: 'dummy',
  //       form: 'dummy',
  //       contact: 'dummy',
  //     },
  //     totalPrice: 10,
  //   },
  //   {
  //     combinationId: 1,
  //     monitors: [
  //       {
  //         id: 1,
  //         name: 'dummy',
  //         price: 1,
  //         img: '/Images/monitor.png',
  //         brand: 'dummy',
  //         url: 'dummy',
  //         category: 'MONITOR',
  //         size: 1,
  //         resolution: 'dummy',
  //         aspectRatio: 'dummy',
  //         refreshRate: 1,
  //         panelType: 'dummy',
  //         panelFormType: 'dummy',
  //       },
  //       {
  //         id: 2,
  //         name: 'dummy',
  //         price: 1,
  //         img: '/Images/monitor.png',
  //         brand: 'dummy',
  //         url: 'dummy',
  //         category: 'MONITOR',
  //         size: 1,
  //         resolution: 'dummy',
  //         aspectRatio: 'dummy',
  //         refreshRate: 1,
  //         panelType: 'dummy',
  //         panelFormType: 'dummy',
  //       },
  //     ],
  //     mouse: {
  //       id: 2,
  //       name: 'dummy',
  //       price: 1,
  //       img: '/Images/mouse.png',
  //       brand: 'dummy',
  //       url: 'dummy',
  //       category: 'MOUSE',
  //       connect: 'dummy',
  //       connectInterface: 'dummy',
  //       mouseType: 'dummy',
  //       dpi: 1,
  //       color: 'dummy',
  //       weight: 1,
  //       width: 1,
  //       length: 1,
  //       height: 1,
  //       isSound: true,
  //     },
  //     keyboard: {
  //       id: 2,
  //       name: 'dummy',
  //       price: 1,
  //       img: '/Images/mouse.png',
  //       brand: 'dummy',
  //       url: 'dummy',
  //       category: 'KEYBOARD',
  //       connect: 'dummy',
  //       connectInterface: 'dummy',
  //       keySwitch: 'dummy',
  //       led: 'dummy',
  //       num: 1,
  //       force: 2,
  //       color: 'dummy',
  //       form: 'dummy',
  //       contact: 'dummy',
  //     },
  //     totalPrice: 10,
  //   },
  //   {
  //     combinationId: 1,
  //     monitors: [
  //       {
  //         id: 1,
  //         name: 'dummy',
  //         price: 1,
  //         img: '/Images/monitor.png',
  //         brand: 'dummy',
  //         url: 'dummy',
  //         category: 'MONITOR',
  //         size: 1,
  //         resolution: 'dummy',
  //         aspectRatio: 'dummy',
  //         refreshRate: 1,
  //         panelType: 'dummy',
  //         panelFormType: 'dummy',
  //       },
  //       {
  //         id: 2,
  //         name: 'dummy',
  //         price: 1,
  //         img: '/Images/monitor.png',
  //         brand: 'dummy',
  //         url: 'dummy',
  //         category: 'MONITOR',
  //         size: 1,
  //         resolution: 'dummy',
  //         aspectRatio: 'dummy',
  //         refreshRate: 1,
  //         panelType: 'dummy',
  //         panelFormType: 'dummy',
  //       },
  //     ],
  //     mouse: {
  //       id: 2,
  //       name: 'dummy',
  //       price: 1,
  //       img: '/Images/mouse.png',
  //       brand: 'dummy',
  //       url: 'dummy',
  //       category: 'MOUSE',
  //       connect: 'dummy',
  //       connectInterface: 'dummy',
  //       mouseType: 'dummy',
  //       dpi: 1,
  //       color: 'dummy',
  //       weight: 1,
  //       width: 1,
  //       length: 1,
  //       height: 1,
  //       isSound: true,
  //     },
  //     keyboard: {
  //       id: 2,
  //       name: 'dummy',
  //       price: 1,
  //       img: '/Images/mouse.png',
  //       brand: 'dummy',
  //       url: 'dummy',
  //       category: 'KEYBOARD',
  //       connect: 'dummy',
  //       connectInterface: 'dummy',
  //       keySwitch: 'dummy',
  //       led: 'dummy',
  //       num: 1,
  //       force: 2,
  //       color: 'dummy',
  //       form: 'dummy',
  //       contact: 'dummy',
  //     },
  //     totalPrice: 10,
  //   },
  // ];

  // const [recommendCombi, setRecommendCombi] = useState<ICombination[] | null>(
  //   dummy,
  // );

  const [recommendCombi, setRecommendCombi] = useState<ICombination[] | null>(
    null,
  );
  const {ZustandToken} = useUserInfoStore();
  useEffect(() => {
    axios
      .get<ICombinationResponse>(
        `${process.env.NEXT_PUBLIC_BASE_URL}/combination/recommend`,
        {
          headers: {
            Authorization: ZustandToken,
          },
        },
      )
      .then(response => {
        if (response !== null) {
          setRecommendCombi(response.data.data);
        }
      })
      // eslint-disable-next-line no-console
      .catch(error => console.error('combination recommend: ', error));
  });
  return (
    <div className={styles.FirstContainer}>
      <Question questionContent="이런 조합은 어떠세요?" />
      <div className={styles.middleContainer}>
        <div className={styles.imgContainer}>
          {recommendCombi !== null &&
            recommendCombi.map((data, index) =>
              index > 3 ? null : (
                <ResultImage key={index} data={data} index={index} />
              ),
            )}
        </div>
        <div className={styles.reSurvey}>
          <a href="/survey/1">마음에 안들어요. 다른 추천 원해요.</a>
        </div>
      </div>
      <div className={styles.endSurvey}>
        <a href="/recommend">마음에 들어요. 추천 더보기</a>
      </div>
    </div>
  );
};
export default Form;
