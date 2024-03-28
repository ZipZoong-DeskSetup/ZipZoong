import styles from '@/components/Board/SearchInput.module.scss';

interface SearchInputProps {
  searchText: string;
  setSearchText: (text: string) => void;
}

function SearchInput({searchText, setSearchText}: SearchInputProps) {
  return (
    <div>
      <input
        type="text"
        placeholder="검색어를 입력하세요"
        value={searchText}
        onChange={e => setSearchText(e.target.value)}
        className={styles.inputDiv}
      />
    </div>
  );
}

export default SearchInput;
