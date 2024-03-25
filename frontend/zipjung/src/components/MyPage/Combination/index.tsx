'use client';

import {useState} from 'react';
import {useRouter} from 'next/navigation';
import {TiArrowSortedDown} from 'react-icons/ti';

import RecommendImgList from '@/components/Common/Recommend/RecommendImgList';
import CombinationList from '@/components/MyPage/Combination/CombinationList';
// import RecommendPrice from '@/components/Common/Recommend/RecommendPrice';
import RecommendDetailButton from '@/components/Common/Recommend/GoRecommendDetailButton';
import RecommendLikeButton from '@/components/Common/Recommend/RecommendLikeButton';
import ShareButton from '@/components/Common/Recommend/ShareButton';
// import useUserInfoStore from '@/stores/userInfo';

import useRecommendStore from '@/stores/recommend';
import styles from '@/components/Recommend/index.module.scss';

// import {
//   MonitorDetail,
//   MouseDetail,
//   KeyboardDetail,
// } from '@/types/Recommendation';

// interface IProductList {
//   monitor: MonitorDetail[];
//   mouse: MouseDetail[];
//   keyboard: KeyboardDetail[];
// }

interface IProducts {
  id: number;
  name: string;
  price: number;
  img: string;
  brand: null | string;
  url: null | string;
  category: 'KEYBOARD' | 'MONITOR' | 'MOUSE';
}

interface ICombination {
  combinationId: number;
  products: IProducts[];
  totalPrice: number;
}
interface ICombinationResponse {
  message: string;
  data: ICombination[];
}
// TODO: 서버연결 api랑 타입 체크, 노션 살아나면 하기, 보내는 링크 바꾸기
// TODO: 선택한 것 없을 시 선택한 것 없음 문구와 함께 추천받으러 가기 띄우기
const CombinationForm = () => {
  // const {ZustandToken} = useUserInfoStore();
  /**
   * 서버 연결해서 조합 리스트와 제품 리스트 받기
   * 컴포넌트 삽입하기
   */

  /** 좋아요 조합 리스트 받기 위한 서버 연결 */
  // useEffect(() => {
  //   axios
  //     .get<IResponseList>(
  //       `${process.env.NEXT_PUBLIC_BASE_URL}/combination`,
  //       {
  //         headers: {
  //           'Authorization': ZustandToken,
  //         },
  //       },
  //     )
  //     .then(response => {
  //       setLikedProducts(response.data.data.likeProducts);
  //     })
  //     .catch(error => {
  //       // eslint-disable-next-line no-console
  //       console.error('likeProductList', error);
  //     });
  //   storeZustand();
  // }, []);

  /** 좋아요 제품 리스트 받기 위한 서버 연결 */
  // useEffect(() => {
  //   axios
  //     .get<IResponseList>(
  //       `${process.env.NEXT_PUBLIC_BASE_URL}/favorite/product-list`,
  //       {
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //       },
  //     )
  //     .then(response => {
  //       setLikedProducts(response.data.data.likeProducts);
  //     })
  //     .catch(error => {
  //       // eslint-disable-next-line no-console
  //       console.error('likeProductList', error);
  //     });
  //   storeZustand();
  // }, []);

  // TODO: 연결 후 삭제
  const CombinationResponse: ICombinationResponse = {
    message: '성공적으로 유저의 조합을 조회하였습니다.',
    data: [
      {
        combinationId: 2,
        products: [
          {
            id: 1,
            name: '마우스이름',
            price: 1000,
            img: '/Images/mouse.png',
            brand: null,
            url: null,
            category: 'MOUSE',
          },
          {
            id: 2,
            name: '키보드이름',
            price: 1500,
            img: '/Images/keyboard.png',
            brand: null,
            url: null,
            category: 'KEYBOARD',
          },
          {
            id: 3,
            name: '모니터이름',
            price: 2000,
            img: '/Images/monitor.png',
            brand: null,
            url: null,
            category: 'MONITOR',
          },
        ],
        totalPrice: 4500,
      },
      {
        combinationId: 3,
        products: [
          {
            id: 7,
            name: '마우스이름3',
            price: 1000,
            img: '/Images/mouse.png',
            brand: null,
            url: null,
            category: 'MOUSE',
          },
          {
            id: 11,
            name: '키보드이름3',
            price: 1500,
            img: '/Images/keyboard.png',
            brand: null,
            url: null,
            category: 'KEYBOARD',
          },
          {
            id: 14,
            name: '모니터이름3',
            price: 2000,
            img: '/Images/monitor.png',
            brand: null,
            url: null,
            category: 'MONITOR',
          },
        ],
        totalPrice: 4500,
      },
      {
        combinationId: 4,
        products: [
          {
            id: 8,
            name: '마우스이름4',
            price: 1000,
            img: '/Images/mouse.png',
            brand: null,
            url: null,
            category: 'MOUSE',
          },
          {
            id: 12,
            name: '키보드이름4',
            price: 1500,
            img: '/Images/keyboard.png',
            brand: null,
            url: null,
            category: 'KEYBOARD',
          },
          {
            id: 15,
            name: '모니터이름4',
            price: 2000,
            img: '/Images/monitor.png',
            brand: null,
            url: null,
            category: 'MONITOR',
          },
        ],
        totalPrice: 4500,
      },
      {
        combinationId: 5,
        products: [
          {
            id: 8,
            name: '마우스이름4',
            price: 1000,
            img: '/Images/mouse.png',
            brand: null,
            url: null,
            category: 'MOUSE',
          },
          {
            id: 12,
            name: '키보드이름4',
            price: 1500,
            img: '/Images/keyboard.png',
            brand: null,
            url: null,
            category: 'KEYBOARD',
          },
          {
            id: 15,
            name: '모니터이름4',
            price: 2000,
            img: '/Images/monitor.png',
            brand: null,
            url: null,
            category: 'MONITOR',
          },
        ],
        totalPrice: 4500,
      },
      {
        combinationId: 6,
        products: [
          {
            id: 2,
            name: '키보드이름',
            price: 1500,
            img: '/Images/keyboard.png',
            brand: null,
            url: null,
            category: 'KEYBOARD',
          },
          {
            id: 3,
            name: '모니터이름',
            price: 2000,
            img: '/Images/monitor.png',
            brand: null,
            url: null,
            category: 'MONITOR',
          },
          {
            id: 8,
            name: '마우스이름4',
            price: 1000,
            img: '/Images/mouse.png',
            brand: null,
            url: null,
            category: 'MOUSE',
          },
          {
            id: 12,
            name: '키보드이름4',
            price: 1500,
            img: '/Images/keyboard.png',
            brand: null,
            url: null,
            category: 'KEYBOARD',
          },
          {
            id: 15,
            name: '모니터이름4',
            price: 2000,
            img: '/Images/monitor.png',
            brand: null,
            url: null,
            category: 'MONITOR',
          },
        ],
        totalPrice: 4500,
      },
    ],
  };

  // TODO: 북마크 파악하기(주스탠드 저장)

  const {ZustandRecommendList, setZustandRecommendDetail} = useRecommendStore();
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);

  const router = useRouter();

  const handleDetailClick = (id: number) => {
    // 클라이언트 사이드에서만 실행
    // 선택된 id에 해당하는 item을 찾음
    // TODO: 주석 변경하기
    const detail = ZustandRecommendList.find(item => item.id === id);
    // const detail = List.find(item => item.id === id);

    // 찾은 item을 ZustandRecommendDetail에 저장
    if (detail) {
      setZustandRecommendDetail(detail);
      // 상세 페이지로 이동
    }
    // FIXME: 현재 이동 안 하고 있음
    router.push('/detail');
  };

  const toggleDropdown = (id: number) => {
    if (openDropdownId === id) {
      setOpenDropdownId(null);
    } else {
      setOpenDropdownId(id);
    }
  };

  const findIndex = (combination: ICombination) => {
    let monitorIndex = -1;
    let keyboardIndex = -1;
    let mouseIndex = -1;
    combination.products.forEach((item, index) => {
      if (item.category === 'KEYBOARD' && keyboardIndex === -1) {
        keyboardIndex = index;
      } else if (item.category === 'MONITOR' && monitorIndex === -1) {
        monitorIndex = index;
      } else if (item.category === 'MOUSE' && mouseIndex === -1) {
        mouseIndex = index;
      }
    });
    return (
      <RecommendImgList
        key={combination.combinationId}
        monitorImg={combination.products[monitorIndex].img}
        keyboardImg={combination.products[keyboardIndex].img}
        mouseImg={combination.products[mouseIndex].img}
      />
    );
  };

  return (
    <div className={styles.contains}>
      <div>
        {/* TODO: List -> ZustandRecommendList로 변경 */}
        {CombinationResponse.data.map((combination, index) => (
          <div className={styles.contain} key={combination.combinationId}>
            <div className={styles.recommendHead}>
              <div className={styles.recommendId}>추천{index + 1}</div>
              <div className={styles.shareLike}>
                <ShareButton />
                <RecommendLikeButton
                  key={combination.combinationId}
                  itemId={combination.combinationId}
                />
              </div>
            </div>

            <div className={styles.ImgPrice}>
              <div>{findIndex(combination)}</div>
              <div className={styles.BtnPrice}>
                <RecommendDetailButton
                  onClick={() => handleDetailClick(combination.combinationId)}
                />
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
                  Products={combination.products}
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
