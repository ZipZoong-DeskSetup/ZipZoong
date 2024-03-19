import styles from '@/components/Board/BoardCreateButton.module.scss';

function BoardCreateButton() {
  return (
    <div>
      <a href="board/create">
        <button className={styles.createBtn}>작성하기</button>
      </a>
    </div>
  );
}

export default BoardCreateButton;
