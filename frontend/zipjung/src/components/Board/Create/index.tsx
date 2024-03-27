'use client';

import {useState} from 'react';
import TitleInput from '@/components/Board/Create/TitleInput';

import GoBackButton from '@/components/Common/GoBackButton';
// import CreateButton from '@/components/Board/Create/CreateButton';
import useUserInfoStore from '@/stores/userInfo';
import styles from '@/components/Board/Create/index.module.scss';

function Form() {
  const [title, setTitle] = useState<string>('');
  const [data, setData] = useState<string>('');

  const {ZustandNickname, ZustandId} = useUserInfoStore();

  return (
    <div className={styles.createDiv}>
      <div className={styles.createTitle}>
        <TitleInput setTitle={setTitle} />
      </div>
      <div className={styles.createContent}></div>
      <div>
        {title}
        {data}
        {ZustandNickname}
        {ZustandId}
      </div>
      <div>
        <GoBackButton text="취소" />
        {/* <CreateButton onClick={onClick} /> */}
      </div>
    </div>
  );
}

export default Form;
