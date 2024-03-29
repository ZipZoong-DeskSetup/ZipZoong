'use client';

import GoBackButton from '@/components/Common/GoBackButton';
import useRecommendStore from '@/stores/recommend';
import RecommendLikeButton from '@/components/Common/Recommend/RecommendLikeButton';
import RecommendTotalImgList from '@/components/Recommend/Detail/RecommendTotalImgList';
import styles from '@/components/Recommend/Detail/index.module.scss';

function Form() {
  const {ZustandRecommendDetail} = useRecommendStore();

  //   console.log(ZustandRecommendDetail);

  return (
    <div className={styles.detailContains}>
      <div className={styles.detailContain}>
        <div>
          <GoBackButton text="이전" />
        </div>
        {ZustandRecommendDetail ? (
          <div className={styles.detailDiv}>
            <div className={styles.detailHead}>
              <div className={styles.detailId}>
                추천 {ZustandRecommendDetail?.id}
              </div>
              <div className={styles.buttons}>
                <RecommendLikeButton
                  key={ZustandRecommendDetail?.id}
                  itemId={ZustandRecommendDetail?.id}
                />
              </div>
            </div>
            <div>
              <RecommendTotalImgList
                key={ZustandRecommendDetail?.id}
                carouselList={ZustandRecommendDetail}
              />
            </div>
          </div>
        ) : (
          '조합을 선택하세요'
        )}
      </div>
    </div>
  );
}

export default Form;
