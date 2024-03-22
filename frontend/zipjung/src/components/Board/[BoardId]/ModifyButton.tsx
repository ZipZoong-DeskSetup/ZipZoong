import styles from '@/components/Board/[BoardId]/ModifyButton.module.scss';

function ModifyButton() {
  return (
    <div>
      <button className={styles.UpdateButton}>수정</button>
    </div>
  );
}

export default ModifyButton;
