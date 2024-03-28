'use client';

/* eslint-disable no-console */

import {useState} from 'react';
import axios from 'axios';
import TitleInput from '@/components/Board/Create/TitleInput';
import QuillEditor from '@/components/Board/Create/QuillEditor';
import GoBackButton from '@/components/Common/GoBackButton';
import CreateButton from '@/components/Board/Create/CreateButton';
import useUserInfoStore from '@/stores/userInfo';
import styles from '@/components/Board/Create/index.module.scss';

function Form() {
  const [formTitle, setFormTitle] = useState<string>('');
  const [formContent, setFormContent] = useState<string>('');

  const {ZustandNickname, ZustandId} = useUserInfoStore();

  const handleChangeTitle = (title: string) => {
    setFormTitle(title);
  };

  const handleChangeContent = (content: string) => {
    setFormContent(content);
  };

  const goCreate = async () => {
    try {
      console.log(formContent);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/board`,
        {
          title: formTitle,
          content: formContent,
          nickname: ZustandNickname,
          userId: ZustandId,
        },
      );

      // 처리 성공
      console.log('Post created successfully', response);
    } catch (error) {
      // 오류 처리
      console.error('Error creating post', error);
    }
  };

  const handleCreate = () => {
    goCreate().catch(err => {
      console.error(err);
    });
  };

  return (
    <div className={styles.createDiv}>
      <div className={styles.createTitle}>
        <TitleInput onChange={handleChangeTitle} />
      </div>
      <div className={styles.createContent}>
        <QuillEditor onChange={handleChangeContent} />
      </div>

      <div className={styles.createButtons}>
        <GoBackButton text="취소" />
        <CreateButton onClick={handleCreate} />
      </div>
    </div>
  );
}

export default Form;
