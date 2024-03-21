'use client';

import {useState} from 'react';
import TextEditor from '@/components/Board/Create/TextEditor';
import styles from '@/components/Board/Create/index.module.scss';

const Form = () => {
  // 에디터 속 내용을 담을 변수
  const [data, setData] = useState('');

  return (

      <div className={styles.createDiv}>
        <div className={styles.createContent}>

          <TextEditor setData={setData} />

          <div style={{display: 'flex'}}>
            <div className="ck ck-editor__main" style={{width: '100%'}}>
            </div>
          </div>
        </div>
      </div>

  );
};

export default Form;
