'use client';

import {useEffect, useState} from 'react';
import {TiArrowSortedDown} from 'react-icons/ti';
import axios from 'axios';
import RecommendImgList from '@/components/Common/Recommend/RecommendImgList';
import CombinationList from '@/components/MyPage/Combination/CombinationList';
// import RecommendPrice from '@/components/Common/Recommend/RecommendPrice';
// import RecommendLikeButton from '@/components/Common/Recommend/RecommendLikeButton';
import useUserInfoStore from '@/stores/userInfo';
// import useRecommendStore from '@/stores/recommend';
import styles from '@/components/Recommend/index.module.scss';

interface IProducts {
  id: number;
  name: string;
  price: number;
  img: string;
  brand: null | string;
  url: null | string;
  category: null;
}

interface ICombination {
  combinationId: number;
  monitors: IProducts[];
  keyboard: IProducts;
  mouse: IProducts;
  totalPrice: number;
}
interface ICombinationResponse {
  message: string;
  data: ICombination[];
}
// TODO: 서버연결 api랑 타입 체크, 노션 살아나면 하기, 보내는 링크 바꾸기
// TODO: 선택한 것 없을 시 선택한 것 없음 문구와 함께 추천받으러 가기 띄우기
const CombinationForm = () => {
  const {ZustandToken} = useUserInfoStore();
  const [token, setToken] = useState<string>(ZustandToken);
  const [LikedCombi, setLikedCombi] = useState<ICombination[] | null>(null);
  useEffect(() => {
    setToken(ZustandToken);
  }, [ZustandToken]);

  /** 좋아요 조합 리스트 받기 위한 서버 연결 */
  useEffect(() => {
    axios
      .get<ICombinationResponse>(
        `${process.env.NEXT_PUBLIC_BASE_URL}/combination`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(response => {
        setLikedCombi(response.data.data);
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.error('likeProductList', error);
      });
  }, [token]);

  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);

  const Detail = (index: number) => {
    if (LikedCombi !== null) {
      const monitorImg = LikedCombi[index].monitors[0].img;
      const keyboardImg = LikedCombi[index].keyboard.img;
      const mouseImg = LikedCombi[index].mouse.img;
      return (
        <RecommendImgList
          key={index}
          monitorImg={monitorImg}
          keyboardImg={keyboardImg}
          mouseImg={mouseImg}
        />
      );
    }
    return <></>;
  };

  const toggleDropdown = (id: number) => {
    if (openDropdownId === id) {
      setOpenDropdownId(null);
    } else {
      setOpenDropdownId(id);
    }
  };

  return (
    <div className={styles.contains}>
      <div>
        {LikedCombi &&
          LikedCombi.map((combination, index) => (
            <div className={styles.contain} key={combination.combinationId}>
              <div className={styles.recommendHead}>
                <div className={styles.recommendId}>추천{index + 1}</div>
              </div>
              <div
                className={styles.ImgPrice}
                style={{display: 'flex', justifyContent: 'space-around'}}
              >
                {Detail(index)}
                <div
                  className={styles.BtnPrice}
                  style={{justifyContent: 'flex-end'}}
                >
                  <div className={styles.totalPrice}>
                    {combination.totalPrice}
                  </div>
                </div>
              </div>
              <div className={styles.toggleButton}>
                <button
                  onClick={() => toggleDropdown(combination.combinationId)}
                  id="dropdownButton"
                >
                  <TiArrowSortedDown className={styles.toggleBtn} />
                </button>
              </div>
              {openDropdownId === combination.combinationId && (
                <div>
                  <CombinationList
                    key={combination.combinationId}
                    monitor={combination.monitors[0]}
                    mouse={combination.mouse}
                    keyboard={combination.keyboard}
                  />
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};
export default CombinationForm;
