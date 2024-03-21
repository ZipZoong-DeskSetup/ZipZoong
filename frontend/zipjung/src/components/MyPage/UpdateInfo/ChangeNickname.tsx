/* eslint-disable @typescript-eslint/no-unused-vars */
import {useState, useEffect} from 'react';
// import axios from 'axios';
import styled from 'styled-components';
import useUserInfoStore from '@/stores/userInfo';
import {NicknameCheck} from '@/types/MyPage';
import ChangeCheckModal from '@/components/MyPage/Modal/ChangeCheckModal';

const Name = styled.div`
  font-size: 25px;
  margin-bottom: 30px;
  margin-top: 50px;
`;

const ChangeButton = styled.button`
  border-radius: 10px;
  width: 103px;
  height: 48px;
  background-color: var(--button-main-color);
  display: flex;
  font-size: 16px;
  font-weight: bold;
  align-items: center;
  justify-content: center;
`;

const Nickname = styled.input`
  border-radius: 10px;
  border: solid 1px var(--main-color-dark);
  padding-left: 10px;
`;

const FirstContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 60%;
`;

const SecondContainer = styled.div`
  width: 600px;
  display: flex;
  justify-content: space-between;
`;

const Hidden = styled.span`
  width: 103px;
`;
const ChangeNickname = () => {
  const {ZustandNickname, setZustandNickname} = useUserInfoStore();
  const initNickname: string = ZustandNickname || ' ';
  const [valueNickname, setValueNickname] = useState<string>(initNickname);
  const [duplication, setDuplication] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contents, setContents] = useState<JSX.Element>(
    <>
      이미 사용중인 닉네임입니다.
      <br />
      다른 닉네임을 입력하세요
    </>,
  );
  const [modalImg, setModalImg] = useState<string>('/Images/CheckWrong.png');

  useEffect(() => {
    if (ZustandNickname) setValueNickname(ZustandNickname);
  }, [ZustandNickname]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newNickname = event.target.value;
    /** 중복 체크 */
    // axios
    //   .get<NicknameCheck>(
    //     `${process.env.NEXT_PUBLIC_BASE_URL}/nickname/check/${newNickname}`,
    //   )
    //   .then(response => {
    //     if (response.data.data.isAvailable) {
    //       setDuplication(true);
    //     } else {
    //       setDuplication(false);
    //     }
    //   })
    //   .catch(error => {
    //     // eslint-disable-next-line no-console
    //     console.error(error);
    //   });
    setValueNickname(newNickname);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleClick = () => {
    if (ZustandNickname === valueNickname) {
      if (contents !== <>현재 닉네임입니다.</>) {
        setContents(<>현재 닉네임입니다.</>);
      } else if (
        contents !==
        (
          <>
            이미 사용중인 닉네임입니다.
            <br />
            다른 닉네임을 입력하세요
          </>
        )
      ) {
        setContents(
          <>
            이미 사용중인 닉네임입니다.
            <br />
            다른 닉네임을 입력하세요
          </>,
        );
      }
      if (modalImg !== '/Images/CheckWrong.png') {
        setModalImg('/Images/CheckWrong.png');
      }
    } else if (!duplication) {
      if (contents !== <>닉네임이 변경되었습니다.</>) {
        setContents(<>닉네임이 변경되었습니다.</>);
      }
      if (modalImg !== '/Images/CheckRight.png') {
        setModalImg('/Images/CheckRight.png');
      }
      setZustandNickname(valueNickname);
      // TODO: 닉네임 보내기
      // axios
      //   .post(`${process.env.NEXT_PUBLIC_BASE_URL}/nickname`, {
      //     nickname: valueNickname,
      //   })
      //   .then(response => {
      //     // eslint-disable-next-line no-console
      //     console.log(response);
      //   })
      //   .catch(Error => {
      //     // eslint-disable-next-line no-console
      //     console.error(Error);
      //   });
    }
    setIsModalOpen(true);
  };
  return (
    <FirstContainer>
      <Name>닉네임</Name>
      <SecondContainer>
        <Hidden></Hidden>
        <Nickname
          type="text"
          value={valueNickname}
          onChange={handleChange}
          maxLength={8}
        />
        <ChangeButton onClick={handleClick}>변경</ChangeButton>
      </SecondContainer>
      <ChangeCheckModal
        contents={contents}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        ModalImg={modalImg}
      />
      {duplication && ZustandNickname !== valueNickname && (
        <div style={{color: 'red'}}>중복된 닉네임입니다.</div>
      )}
      {!duplication && ZustandNickname !== valueNickname && (
        <div style={{color: 'green'}}>사용 가능한 닉네임입니다.</div>
      )}
    </FirstContainer>
  );
};

export default ChangeNickname;
