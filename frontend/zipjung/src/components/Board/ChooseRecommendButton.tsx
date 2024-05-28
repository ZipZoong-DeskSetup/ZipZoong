import styles from '@/components/Board/ChooseRecommendButton.module.scss';

interface ChooseRecommendButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

function ChooseRecommendButton({onClick}: ChooseRecommendButtonProps) {
  return (
    <div>
      <button onClick={onClick} className={styles.chooseButton}>
        조합 불러오기
      </button>
    </div>
  );
}

export default ChooseRecommendButton;
