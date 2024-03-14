import { useState, useEffect } from 'react';
import axios from 'axios';
import { Hardware } from '@/types/Recommendation';
import { FaRegHeart, FaHeart } from "react-icons/fa";
import styles from '@/components/Common/Recommend/RecommendLikeButton.module.scss';


function RecommendLikeButton({ itemId }: { itemId: number }) {
    const [isLiked, setIsLiked] = useState<boolean | null>(null);
    const [combinationId, setCombinationId] = useState<number | null>(null);

    // 좋아요 상태를 초기화하는 함수
    useEffect(() => {
        axios.get<Hardware[]>('/favorite/combination') // 응답 타입을 Hardware[]로 지정합니다.
            .then(response => {
                // itemId와 일치하는 항목을 찾습니다.
                const found = response.data.find(hardware => hardware.id === itemId);
                setIsLiked(!!found);
                if (found) {
                    setCombinationId(found.id); // 상태에 combinationId 저장
                }
            })
            .catch(error => console.error('Fetching favorites failed', error));
    }, [itemId]);

    const handleLike = () => {
        if (isLiked) {
            // 좋아요를 취소하는 경우
            axios.delete(`/favorite/combination/${combinationId}`)
                .then(() => {
                    setIsLiked(false);
                })
                .catch(error => console.error('Unliking failed', error));
                setIsLiked(false);
        } else {
            // 좋아요를 하는 경우
            axios.post('/favorite/combination', { itemId })
                .then(response => {
                    setIsLiked(true);
                    setCombinationId(response.data.id); // response에 따라 변경
                })
                .catch(error => console.error('Liking failed', error));
                setIsLiked(true);
            }
    };

    return (
        <>
            {isLiked ? (
                <button onClick={handleLike}><FaHeart className={styles.like} /></button>
            ) : (
                <button onClick={handleLike}><FaRegHeart className={styles.unlike} /></button>
            )}
        </>
    );
};

export default RecommendLikeButton;
