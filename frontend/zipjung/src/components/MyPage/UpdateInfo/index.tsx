'use client';

import {useState, useEffect} from 'react';
import axios from 'axios';
import styled from 'styled-components';
import {MyPageUserInfo} from '@/types/MyPage';
import ChangeCheckModal from '@/components/MyPage/Modal/ChangeCheckModal';
import ChangeImg from '@/components/MyPage/UpdateInfo/ChangeImg';

/**
 * 1. 서버로 부터 데이터 받기(닉네임, 이미지, 이메일)
 *  - 임시데이터 넣어주기
 * 2. props로 내려주기
 *
 */

const UpdateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const UpdateForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pUserEmail, setPUserEmail] = useState<string>('');
  const [pUserImg, setPUserImg] = useState<string>('');
  const [pUserNickname, setPUserNickname] = useState<string>('');

  // TODO: 중복된 닉네임 클릭 시 중복된 닉네임입니다., 이미지 바꾸기
  // let contents: JSX.Element = <>닉네임이 변경되었습니다.</>;
  // let ModalImg: string = "/Images/CheckRight.png"

  // TODO: 서버연결 -> 유저 정보 받아오기(token, userId zustand에 존재 가정)
  // const {zustandUserNumber} = useMyPageInfoStore();
  // const zustandUserNumber = userId;
  // TODO: axios와 관련된 값
  // const userId = 1;
  // const token = 'tk-123';

  useEffect(() => {
    setPUserImg('@/Images/CheckRight.png');
    console.log(pUserImg);
    // axios
    //   .get<MyPageUserInfo>(`${process.env.NEXT_PUBLIC_BASE_URL}/${userId}`, {
    //     headers: {
    //       key: 'Authorization',
    //       value: token,
    //     },
    //   })
    //   .then(response => {
    //     setPUserEmail(response.data.data.userEmail);
    //     setPUserImg(response.data.data.userImg);
    //     setPUserNickname(response.data.data.userNickname);
    //   })
    //   .catch(error => {
    //     // eslint-disable-next-line no-console
    //     console.error(error);
    //   });
  }, []);

  const contents: JSX.Element = (
    <>
      이미 사용중인 닉네임입니다.
      <br />
      다른 닉네임을 입력하세요
    </>
  );
  const ModalImg: string = '/Images/CheckWrong.png';

  const handleOpenModal = () => {
    // console.log('열기 클릭');
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    // console.log('닫기 클릭');
    setIsModalOpen(false);
  };

  return (
    <UpdateContainer>
      <ChangeImg pUserImg={pUserImg} />
      <button onClick={handleOpenModal}>모달 열기</button>
      <ChangeCheckModal
        contents={contents}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        ModalImg={ModalImg}
      />
    </UpdateContainer>
  );
};
export default UpdateForm;
