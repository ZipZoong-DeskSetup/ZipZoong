'use client'
import GoBackButton from '@/components/Common/GoBackButton';
import useRecommendStore from '@/stores/recommend';
import styles from '@/components/Recommend/Detail/index.module.scss';

function Form() {
    const { ZustandRecommendDetail } = useRecommendStore();

    console.log(ZustandRecommendDetail)

    return (
        <div className={styles.detailContain}>
            추천상세
            <div className={styles.detailDiv}>
                <div>
                    <GoBackButton />
                </div>
                <div>
                    추천 {ZustandRecommendDetail?.id}
                </div>

            </div>
        </div>
    );
};

export default Form;