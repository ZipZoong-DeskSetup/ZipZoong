'use client';

import styles from '@/components/Board/Create/TitleInput.module.scss';

interface TitleInputProps {
  onChange: (title: string) => void;
}

function TitleInput({onChange}: TitleInputProps) {
  return (
    <div className={styles.titleInputDiv}>
      <label htmlFor="titleInput">제목: </label>
      <input
        id="titleInput"
        type="text"
        placeholder="제목을 입력하세요"
        onChange={e => onChange(e.target.value)}
        className={styles.titleInput}
      />
    </div>
  );
}

export default TitleInput;
