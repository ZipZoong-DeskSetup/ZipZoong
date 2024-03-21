'use client';

import {useRouter} from 'next/navigation';
import styles from '@/components/Common/GoBackButton.module.scss';

interface GoBackButtonProps {
  text: string;
}

function GoBackButton({text}: GoBackButtonProps) {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  return (
    <button onClick={goBack} className={styles.goBackBtn}>
      {text}
    </button>
  );
}

export default GoBackButton;
