// QuillEditor 컴포넌트 수정
import dynamic from 'next/dynamic';
import {useMemo, useState, useEffect} from 'react';
import 'react-quill/dist/quill.snow.css';
import './QuillEditor.module.scss';

type TInputEditor = {
  onChange: (value: string) => void;
  content?: string;
};

const ReactQuill = dynamic(() => import('react-quill'), {ssr: false});

const QuillEditor = ({onChange, content = ''}: TInputEditor) => {
  const [contents, setContents] = useState(content);

  useEffect(() => {
    setContents(content);
  }, [content]);

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
