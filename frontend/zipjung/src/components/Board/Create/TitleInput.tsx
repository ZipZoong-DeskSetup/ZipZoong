import styles from '@/components/Board/Create/TitleInput.module.scss';

interface TitleInputProps {
  setTitle: React.Dispatch<React.SetStateAction<string>>;
}

function TitleInput({setTitle}: TitleInputProps) {
  return (
    <div className={styles.titleInputDiv}>
      <label htmlFor="titleInput">제목: </label>
      <input
        id="titleInput"
        type="text"
        placeholder="제목을 입력하세요"
        onChange={e => setTitle(e.target.value)}
        className={styles.titleInput}
      />
    </div>
  );
}

export default TitleInput;
