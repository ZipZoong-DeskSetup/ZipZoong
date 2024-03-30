'use client';

/* eslint-disable no-console */

import {useState, useEffect} from 'react';
import axios from 'axios';
import TitleInput from '@/components/Board/Create/TitleInput';
import ChooseRecommendButton from '@/components/Board/ChooseRecommendButton';
import ChooseRecommendModal from '@/components/Board/ChooseRecommendModal';
import ChooseRecommendList from '@/components/Board/Create/ChooseRecommendList';
import QuillEditor from '@/components/Board/Create/QuillEditor';
import GoBackButton from '@/components/Common/GoBackButton';
import CreateButton from '@/components/Board/Create/CreateButton';
import useUserInfoStore from '@/stores/userInfo';
import useBoardProductStore from '@/stores/boardRecommend';
import styles from '@/components/Board/Create/index.module.scss';

interface IProducts {
  id: number;
  name: string;
  price: number;
  img: string;
  brand: null | string;
  url: null | string;
  category: 'KEYBOARD' | 'MONITOR' | 'MOUSE';
}

interface IProductBase {
  id: number;
  name: string;
  price: number;
  img: string;
  brand: string | null;
  url: string;
  category: 'KEYBOARD' | 'MONITOR' | 'MOUSE';
}

interface IMonitor extends IProductBase {
  size: number;
  resolution: string;
  aspectRatio: string;
  refreshRate: number;
  panelType: string;
  panelFormType: string;
}

interface IKeyboard extends IProductBase {
  connect: string;
  connectInterface: string | null;
  keySwitch: string | null;
  led: string | null;
  num: number;
  force: number;
  color: string;
  form: string;
  contact: string;
}

interface IMouse extends IProductBase {
  connect: string;
  connectInterface: string;
  mouseType: string;
  dpi: number;
  color: string;
  weight: number;
  width: number;
  length: number;
  height: number;
  isSound: boolean;
}

interface ICombinationData {
  combinationId: number;
  monitors: IMonitor[] | null;
  keyboard: IKeyboard | null;
  mouse: IMouse | null;
  totalPrice: number;
}

interface ICombinationResponseData {
  message: string;
  data: ICombinationData;
}

interface ICombination {
  combinationId: number;
  products: IProducts[];
  totalPrice: number;
}

function Form() {
  const [formTitle, setFormTitle] = useState<string>('');
  const [formContent, setFormContent] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);
  // const [likeRecommend, setLikeRecommend] = useState<ICombination>();
  const [combinationDetails, setCombinationDetails] = useState<ICombination[]>(
    [],
  );
  const {ZustandId, ZustandToken} = useUserInfoStore();
  const {
    zustandLikedCombination,
    setZustandLikedCombination,
    deleteZustandLikedCombination,
  } = useBoardProductStore();

  // 새로고침 시 zustand 초기화
  useEffect(() => {
    const fetchCombinationDetails = async () => {
      if (zustandLikedCombination.length > 0) {
        const allCombinationDetails = await Promise.all(
          zustandLikedCombination.map(async combinationId => {
            const response = await axios.get<ICombinationResponseData>(
              `${process.env.NEXT_PUBLIC_BASE_URL}/combination/${combinationId}`,
              {
                headers: {
                  Authorization: ZustandToken,
                },
              },
            );

            const {data} = response.data;
            const products: IProducts[] = [];

            // Keyboard 처리
            if (data.keyboard) {
              const {id, name, price, img, brand, url} = data.keyboard; // 선택된 필드 추출
              products.push({
                id,
                name,
                price,
                img,
                brand,
                url,
                category: 'KEYBOARD',
              });
            }

            // Mouse 처리
            if (data.mouse) {
              const {id, name, price, img, brand, url} = data.mouse; // 선택된 필드 추출
              products.push({
                id,
                name,
                price,
                img,
                brand,
                url,
                category: 'MOUSE',
              });
            }

            // Monitors 처리
            data.monitors?.forEach(monitor => {
              const {id, name, price, img, brand, url} = monitor; // 선택된 필드 추출
              products.push({
                id,
                name,
                price,
                img,
                brand,
                url,
                category: 'MONITOR',
              });
            });

            return {
              combinationId: data.combinationId,
              products,
              totalPrice: data.totalPrice,
            };
          }),
        );
        setCombinationDetails(allCombinationDetails);
      } else {
        setCombinationDetails([]);
      }
    };

    fetchCombinationDetails().catch(console.error);
  }, [zustandLikedCombination, ZustandToken]);

  useEffect(() => {
    const shouldReset = true;

    if (shouldReset) {
      setZustandLikedCombination([]);
    }
  }, [setZustandLikedCombination]);

  // 제목 변경
  const handleChangeTitle = (title: string) => {
    setFormTitle(title);
  };

  // 내용 변경
  const handleChangeContent = (content: string) => {
    setFormContent(content);
  };

  // 모달
  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  // 조합 삭제
  const onSelectCombination = (combinationId: number) => {
    if (zustandLikedCombination.includes(combinationId)) {
      // 이미 선택된 조합이면 제거
      deleteZustandLikedCombination(combinationId);
    } else {
      // 새로 선택된 조합이면 추가
      setZustandLikedCombination(combinationId);
    }
  };

  // 게시글 작성
  const goCreate = async () => {
    try {
      // 요청 본문에 포함될 데이터
      const postData = {
        boardTitle: formTitle,
        boardContent: formContent,
        boardCreatorId: ZustandId,
        combinationIdList: zustandLikedCombination,
      };

      const config = {
        headers: {
          Authorization: `Bearer ${ZustandToken}`,
        },
      };

      console.log(postData);
      console.log(config);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/board`, // 요청 URL
        postData,
        config,
      );
      // 처리 성공
      console.log('Post created successfully', response);
    } catch (error) {
      // 오류 처리
      console.error('Error creating post', error);
    }
  };

  const handleCreate = () => {
    goCreate().catch(err => {
      console.error(err);
    });
  };

  return (
    <div className={styles.createDiv}>
      <div className={styles.createTitle}>
        <TitleInput onChange={handleChangeTitle} />
      </div>
      <div className={styles.combinationDiv}>
        {combinationDetails.map(combination => (
          <ChooseRecommendList
            key={combination.combinationId}
            combination={combination}
            onSelectCombination={onSelectCombination}
          />
        ))}
      </div>
      <div>
        {!showModal ? (
          <ChooseRecommendButton onClick={handleOpenModal} />
        ) : (
          <ChooseRecommendModal onClick={handleCloseModal} />
        )}
      </div>
      <div className={styles.createContent}>
        <QuillEditor onChange={handleChangeContent} />
      </div>

      <div className={styles.createButtons}>
        <GoBackButton text="취소" />
        <CreateButton onClick={handleCreate} />
      </div>
    </div>
  );
}

export default Form;
