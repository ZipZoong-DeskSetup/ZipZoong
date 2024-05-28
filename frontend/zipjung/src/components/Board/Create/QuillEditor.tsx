/* eslint-disable no-console */
// QuillEditor 컴포넌트 수정
import dynamic from 'next/dynamic';
import {useMemo, useState, useEffect} from 'react';
import axios from 'axios';
import 'react-quill/dist/quill.snow.css';
import './QuillEditor.module.scss';
import useUserInfoStore from '@/stores/userInfo';

type TInputEditor = {
  onChange: (value: string) => void;
  content?: string;
  setFirstImageUrl?: (url: string) => void; // 새로운 prop 추가
};

interface UploadResponse {
  message: string;
  data: string;
}

const ReactQuill = dynamic(() => import('react-quill'), {ssr: false});

const QuillEditor = ({
  onChange,
  content = '',
  setFirstImageUrl,
}: TInputEditor) => {
  const [contents, setContents] = useState(content);
  const {ZustandToken} = useUserInfoStore();

  useEffect(() => {
    setContents(content);
  }, [content]);

  const ChangeContents = async (newContent: string) => {
    const doc = new DOMParser().parseFromString(newContent, 'text/html');
    const images = doc.querySelectorAll('img');
    let isFirstImage = true;

    const uploadPromises = Array.from(images).map(async img => {
      const src = img.getAttribute('src');
      if (src && src.startsWith('data:image')) {
        try {
          const response = await axios.post<UploadResponse>(
            `${process.env.NEXT_PUBLIC_BASE_URL}/board/file`,
            {base64File: src}, // 문자열 'src'가 아니라 변수 src의 값을 사용
            {
              headers: {
                Authorization: `Bearer ${ZustandToken}`,
              },
            },
          );
          const newSrc = response.data.data; // 서버로부터 받은 새 이미지 URL
          img.setAttribute('src', newSrc); // 이미지 src 속성 업데이트

          // 썸네일
          if (isFirstImage && setFirstImageUrl) {
            setFirstImageUrl(newSrc);
            isFirstImage = false;
          }
        } catch (error) {
          console.error('Error uploading image:', error);
          // 여기서 에러 처리 로직을 추가할 수 있습니다.
        }
      }
    });

    await Promise.all(uploadPromises); // 모든 이미지 업로드가 완료될 때까지 기다립니다.

    const newHtml = doc.body.innerHTML; // 업데이트된 HTML 가져오기
    setContents(newHtml); // 상태 업데이트
    onChange(newHtml); // 부모 컴포넌트로 변경된 내용 전달
  };

  const handleContentChange = (newContent: string) => {
    ChangeContents(newContent).catch(err => {
      console.error(err);
    });
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{header: [1, 2, false]}],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{list: 'ordered'}, {list: 'bullet'}, {indent: '-1'}, {indent: '+1'}],
          ['link', 'image'],
          [
            {size: ['small', false, 'large', 'huge']},
            {align: []},
            {color: []},
            {background: []},
          ],
          ['clean'],
        ],
      },
      history: {
        delay: 500,
        maxStack: 100,
        userOnly: true,
      },
    }),
    [],
  );

  return (
    <div className={'content'}>
      <ReactQuill
        className={'editor'}
        value={contents}
        onChange={handleContentChange}
        modules={modules}
        theme="snow"
        placeholder="내용을 작성하세요"
      />
    </div>
  );
};

export default QuillEditor;
