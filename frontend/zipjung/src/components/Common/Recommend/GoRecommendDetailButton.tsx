import styles from '@/components/Common/Recommend/GoReocommendDetailButton.module.scss'


interface RecommendDetailButtonProps {
    onClick: () => void; // 클릭 이벤트를 처리할 함수 타입
}

function RecommendDetailButton({ onClick }: RecommendDetailButtonProps) {
    return (
        <div>
            <button onClick={onClick} className={styles.goDetailButton}>상세보기</button>
        </div>
    );
}

export default RecommendDetailButton