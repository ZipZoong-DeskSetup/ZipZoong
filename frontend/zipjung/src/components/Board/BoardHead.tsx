import BoardCreateButton from '@/components/Board/BoardCreateButton';
import SearchInput from '@/components/Board/SearchInput';
import {FaSearch} from 'react-icons/fa';
import styles from '@/components/Board/BoardHead.module.scss';

// 타입을 all, mine 로 지정할 수 있음
interface BoardHeadProps {
  onTabChange: (tabName: 'all' | 'mine') => void;
  selectedTab: 'all' | 'mine';
  searchText: string;
  setSearchText: (text: string) => void;
  onSearch: () => void;
}

function BoardHead({
  selectedTab,
  onTabChange,
  searchText,
  setSearchText,
  onSearch,
}: BoardHeadProps) {
  return (
    <div className={styles.headDiv}>
      <div className={styles.headBtn}>
        <div>
          <button
            className={selectedTab === 'all' ? styles.active : styles.tab}
            onClick={() => onTabChange('all')}
          >
            전체 게시글
          </button>
        </div>
        <div>
          <button
            className={selectedTab === 'mine' ? styles.active : styles.tab}
            onClick={() => onTabChange('mine')}
          >
            내가 쓴 게시글
          </button>
        </div>
      </div>
      <div className={styles.div2}>
        <div className={styles.searchDiv}>
          <SearchInput searchText={searchText} setSearchText={setSearchText} />
          <button onClick={onSearch}>
            <FaSearch className={styles.searchButton} />
          </button>
        </div>
        <div>
          <BoardCreateButton />
        </div>
      </div>
    </div>
  );
}

export default BoardHead;
