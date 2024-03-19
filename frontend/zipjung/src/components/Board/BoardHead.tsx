import styles from '@/components/Board/BoardHead.module.scss';

// 타입을 all, mine 로 지정할 수 있음
interface BoardHeadProps {
  onTabChange: (tabName: 'all' | 'mine') => void;
  selectedTab: 'all' | 'mine';
}

function BoardHead({selectedTab, onTabChange}: BoardHeadProps) {
  return (
    <div className={styles.head}>
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
  );
}

export default BoardHead;
