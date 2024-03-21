'use client';

import dynamic from 'next/dynamic';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
// import {CKEditor} from '@ckeditor/ckeditor5-react';
import {FileLoader} from '@ckeditor/ckeditor5-upload/src/filerepository';
import {Editor as CoreEditor} from '@ckeditor/ckeditor5-core';

// CKEditor 컴포넌트를 동적으로 불러오기 위해 dynamic import 사용
const CKEditor = dynamic(
  () => import('@ckeditor/ckeditor5-react').then(module => module.CKEditor),
  {
    ssr: false, // 서버 사이드 렌더링 비활성화
    loading: () => <p>Loading editor...</p>, // 로딩 중 표시할 컴포넌트
  },
);

class MyUploadAdapter {
  loader: FileLoader;

  constructor(loader: FileLoader) {
    this.loader = loader;
  }

  upload() {
    return this.loader.file.then(
      file =>
        new Promise<{default: string}>((resolve, reject) => {
          if (file === null) {
            reject(new Error('File is null'));
            return;
          }

          const reader = new FileReader();
          reader.onload = () => resolve({default: reader.result as string});
          reader.onerror = error => reject(error);
          reader.readAsDataURL(file);
        }),
    );
  }

  abort() {
    // Upload cancel logic
  }
}

function UploadAdapterPlugin(editor: CoreEditor) {
  // eslint-disable-next-line no-param-reassign
  editor.plugins.get('FileRepository').createUploadAdapter = (
    loader: FileLoader,
  ) => {
    return new MyUploadAdapter(loader);
  };
}

interface TextEditorProps {
  setData: (data: string) => void;
}

const TextEditor: React.FC<TextEditorProps> = ({setData}) => {
  const editorConfiguration = {
    toolbar: {
      items: [
        'fontFamily',
        'fontSize',
        'fontColor',
        'bold',
        'italic',
        'link',
        'bulletedList',
        'numberedList',
        '|',
        'outdent',
        'alignment',
        'indent',
        '|',
        'imageUpload',
        'blockQuote',
        'insertTable',
        'mediaEmbed',
        'undo',
        'redo',
        '|',
        'mention'
      ],
    },
    language: 'ko',
    image: {
      toolbar: [
        'imageTextAlternative',
        'toggleImageCaption',
        'imageStyle:inline',
        'imageStyle:block',
        'imageStyle:side',
        'link',
        '|',
        'imageResize',
      ],
      resizeOptions: [
        {name: 'imageResize:original', label: 'Original', value: null},
        {name: 'imageResize:10', label: '10%', value: '10'},
        {name: 'imageResize:15', label: '15%', value: '15'},
      ],
    },
    table: {
      contentToolbar: [
        'tableColumn',
        'tableRow',
        'mergeTableCells',
        'tableCellProperties',
        'tableProperties',
      ],
    },
    extraPlugins: [UploadAdapterPlugin],
  };
  return setData ? (
    <CKEditor
      editor={Editor}
      config={editorConfiguration}
      data=""
      onChange={(event, editor) => {
        const data = editor.getData();
        setData(data);
      }}
    />
  ) : (
    <></>
  );
};

export default TextEditor;
