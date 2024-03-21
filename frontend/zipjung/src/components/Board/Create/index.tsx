'use client';

import {useState} from 'react';
import TitleInput from '@/components/Board/Create/TitleInput';
// import TextEditor from '@/components/Board/Create/TextEditor';
import CreateButton from '@/components/Board/Create/CreateButton';
import useUserInfoStore from '@/stores/userInfo';
import styles from '@/components/Board/Create/index.module.scss';

// interface FormData {
//   boardTitle: string;
//   boardContent: string;
//   boardCreator: string;
//   boardCreatorId: number;
// }

function Form() {
  const [title, setTitle] = useState<string>('');
  // const [data, setData] = useState<string>('');

  const {ZustandNickname, ZustandId} = useUserInfoStore();

  return (
    <div className={styles.createDiv}>
      <div className={styles.createTitle}>
        <TitleInput setTitle={setTitle} />
      </div>
      <div className={styles.createContent}>
        {/* <TextEditor setData={setData} /> */}
        {/* <div style={{display: 'flex'}}>
          <div className="ck ck-editor__main" style={{width: '100%'}}></div>
        </div> */}
      </div>
      <div>
        {title}
        {/* {data} */}
        {ZustandNickname}
        {ZustandId}
      </div>
      <div>
        <CreateButton />
      </div>
    </div>
  );
}

export default Form;
