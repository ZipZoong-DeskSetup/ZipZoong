'use client';

import {useState} from 'react';
import TextEditor from '@/components/Board/Create/TextEditor';

const Form = () => {
  // 에디터 속 내용을 담을 변수
  const [data, setData] = useState('');

  return (
    <>
      <TextEditor setData={setData} />

      <div style={{display: 'flex'}}>
        <div className="ck ck-editor__main" style={{width: '100%'}}>
          {/* <div
            className="ck ck-content ck-editor__editable ck-rounded-corners ck-editor__editable_inline ck-blurred"
            dangerouslySetInnerHTML={{__html: data}} // 결과 확인
          /> */}
        </div>
      </div>
    </>
  );
};

export default Form;
