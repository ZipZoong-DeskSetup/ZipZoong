'use client';

import {useState, useEffect} from 'react';
import styles from '@/components/MyPage/UpdateInfo/index.module.scss';
// import axios from 'axios';
// import {MyPageUserInfo} from '@/types/MyPage';
import ChangeImg from '@/components/MyPage/UpdateInfo/ChangeImg';
import ChangeNickname from '@/components/MyPage/UpdateInfo/ChangeNickname';

/**
 * 1. 서버로 부터 데이터 받기(닉네임, 이미지, 이메일)
 *  - 임시데이터 넣어주기
 * 2. props로 내려주기
 *
 */

const UpdateForm = () => {
  const [pUserImg, setPUserImg] = useState<string>('');
  const [pUserEmail, setPUserEmail] = useState<string>('');

  // TODO: 서버연결시에도 해결 안 되면 zustand로 바꾸고 전 프로젝트 분석하기

  // TODO: 서버연결 -> 유저 정보 받아오기(token, userId zustand에 존재 가정)
  // const {zustandUserNumber} = useMyPageInfoStore();
  // const zustandUserNumber = userId;
  // TODO: axios와 관련된 값
  // const userId = 1;
  // const token = 'tk-123';

  useEffect(() => {
    // axios
    //   .get<MyPageUserInfo>(`${process.env.NEXT_PUBLIC_BASE_URL}/${userId}`, {
    //     headers: {
    //       key: 'Authorization',
    //       value: token,
    //     },
    //   })
    //   .then(response => {
    //     setPUserEmail(response.data.data.userEmail);
    // setPUserImg(response.data.data.userImg);
    //     setPUserNickname(response.data.data.userNickname);
    //   })
    //   .catch(error => {
    //     // eslint-disable-next-line no-console
    //     console.error(error);
    //   });

    // 예시용:
    setPUserImg('/Images/monitor.png');
    setPUserEmail('example@03.21');
  }, []);

  return (
    <div className={styles.updateContainer}>
      <ChangeImg pUserImg={pUserImg} />
      <ChangeNickname />
      <div>
        <div className={styles.name}>이메일</div>
        <input
          className={styles.emailInput}
          type="text"
          value={pUserEmail}
          disabled
        />
      </div>
    </div>
  );
};
export default UpdateForm;
