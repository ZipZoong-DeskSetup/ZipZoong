import styles from '@/components/Board/Create/TitleInput.module.scss';

interface TitleInputProps {
  onChange: (title: string) => void;
  title?: string; // `title`을 선택적 props로 추가
}

function TitleInput({onChange, title = ''}: TitleInputProps) {
  // `title`의 기본값을 빈 문자열로 설정
  return (
    <div className={styles.titleInputDiv}>
      <label htmlFor="titleInput">제목: </label>
      <input
        id="titleInput"
        type="text"
        placeholder="제목을 입력하세요"
        value={title} // `value`로 `title`을 사용
        onChange={e => onChange(e.target.value)}
        className={styles.titleInput}
      />
    </div>
  );
}

export default TitleInput;
