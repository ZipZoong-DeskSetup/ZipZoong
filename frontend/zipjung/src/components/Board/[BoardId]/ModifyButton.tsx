import styles from '@/components/Board/[BoardId]/ModifyButton.module.scss';

interface ModifyButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

function ModifyButton({onClick}: ModifyButtonProps) {
  return (
    <div>
      <button className={styles.UpdateButton} onClick={onClick}>
        수정
      </button>
    </div>
  );
}

export default ModifyButton;
