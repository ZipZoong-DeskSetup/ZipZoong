'use client';

import styles from '@/components/Board/[BoardId]/Comment/GoCommentModifyButton.module.scss';

interface ModifyButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

function GoCommentModifyButton({onClick}: ModifyButtonProps) {
  return (
    <div>
      <button className={styles.GoUpdateButton} onClick={onClick}>
        수정
      </button>
    </div>
  );
}

export default GoCommentModifyButton;
