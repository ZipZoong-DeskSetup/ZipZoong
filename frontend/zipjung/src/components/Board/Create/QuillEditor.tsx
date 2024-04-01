// QuillEditor 컴포넌트 수정
import dynamic from 'next/dynamic';
import {useMemo, useState, useEffect} from 'react';
import 'react-quill/dist/quill.snow.css';
import './QuillEditor.module.scss';

type TInputEditor = {
  onChange: (value: string) => void;
  content?: string;
};

// interface ImageResponse {
//   message: string;
//   data: {};
// }

const ReactQuill = dynamic(() => import('react-quill'), {ssr: false});

const QuillEditor = ({onChange, content = ''}: TInputEditor) => {
  const [contents, setContents] = useState(content);

  useEffect(() => {
    setContents(content);
  }, [content]);

  // const imageHandler = () => {
  //   const input = document.createElement('input');
  //   input.setAttribute('type', 'file');
  //   input.click();

  //   input.onchange = async () => {
  //     const file = input.files[0];
  //     if (file) {
  //       // 이미 Base64로 인코딩된 이미지 데이터를 읽기
  //       const reader = new FileReader();
  //       reader.readAsDataURL(file);
  //       reader.onloadend = async () => {
  //         const base64data = reader.result;

  //         // 서버로 POST 요청 보내기
  //         try {
  //           const response = await axios.post<ImageResponse>(
  //             `${process.env.NEXT_PUBLIC_BASE_URL}/board/file`,
  //             {
  //               file: base64data,
  //             },
  //           );
  //           const {imageUrl} = response.data.data; // 서버로부터 받은 이미지 URL
  //           const quill = ReactQuill.getEditor(); // Quill 인스턴스 얻기
  //           const range = quill.getSelection(true); // 현재 선택된 위치 얻기
  //           quill.insertEmbed(range.index, 'image', imageUrl); // 이미지 삽입
  //           quill.setSelection(range.index + 1); // 이미지 삽입 후 커서 위치 조정
  //         } catch (error) {
  //           console.error('이미지 업로드 실패:', error);
  //         }
  //       };
  //     }
  //   };
  // };

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

  const handleContentChange = (Newcontent: string) => {
    setContents(Newcontent);
    onChange(Newcontent);
    console.log(Newcontent);
  };

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
