'use client';

import styles from '@/components/Board/Create/CreateButton.module.scss';

interface CreateButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

function CreateButton({onClick}: CreateButtonProps) {
  return (
    <>
      <button className={styles.creatBtn} onClick={onClick}>
        등록
      </button>
    </>
  );
}

export default CreateButton;
