'use client'
import { useRouter } from 'next/navigation';
import styles from '@/components/Common/GoBackButton.module.scss';

function GoBackButton() {
    const router = useRouter();

    const goBack = (() => {
       router.back()
    });

    return(
        <button onClick={goBack} className={styles.goBackBtn}>이전</button>
    );
};

export default GoBackButton;