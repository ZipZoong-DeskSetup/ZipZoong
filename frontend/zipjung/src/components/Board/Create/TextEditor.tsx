import Editor from 'ckeditor5-custom-build/build/ckeditor';
import {CKEditor} from '@ckeditor/ckeditor5-react';

// UploadAdapter 클래스는 이전에 제공된 코드를 그대로 사용합니다.

class MyUploadAdapter {
  loader: any;

  constructor(loader: any) {
    this.loader = loader;
  }

  upload() {
    return this.loader.file.then(
      file =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve({default: reader.result});
          reader.onerror = error => reject(error);
          reader.readAsDataURL(file);
        }),
    );
  }

  abort() {
    // 업로드 취소 로직
  }
}

// 여기서 editor 매개변수 타입을 Editor로 변경합니다.
function MyCustomUploadAdapterPlugin(editor: Editor) {
  editor.plugins.get('FileRepository').createUploadAdapter = (loader: any) => {
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
    extraPlugins: [MyCustomUploadAdapterPlugin], // 여기서는 수정 없음
  };
  return (
    <CKEditor
      editor={Editor}
      config={editorConfiguration}
      data="<p> 이곳에 내용을 작성해 주세요!</p>"
      onChange={(event, editor) => {
        const data = editor.getData();
        console.log(data);
        setData(data);
      }}
    />
  );
};

export default TextEditor;
