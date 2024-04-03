'use client';

import {useState} from 'react';
import styled from 'styled-components';
import UpdateForm from '@/components/MyPage/UpdateInfo';
import CombinationForm from '@/components/MyPage/Combination';
// import MyProductForm from '@/components/MyPage/MyProduct';
import NavBar from '@/components/MyPage/NavBar';

// TODO: 굵기는 글씨체 정하고 바꾸기(글씨체마다 가능한 굵기 개수 정해져 있음)
const PageName = styled.div`
  font-size: 29px;
  text-align: center;
  font-weight: 550;
  margin-bottom: 20px;
  margin-top: 30px;
`;

const Form = () => {
  const [selectedMenu, setSelectedMenu] = useState<number>(0);

  const updateMenu = (changedMenu: number) => {
    setSelectedMenu(changedMenu);
  };

  const index: number = 0;
  const MenuBoard: JSX.Element[] = [
    <UpdateForm key={index} />,
    <CombinationForm key={index + 1} />,
    // <MyProductForm key={index + 2} />,
  ];

  return (
    <div>
      <PageName>마이페이지</PageName>
      <NavBar updateMenu={updateMenu} />
      <div>{MenuBoard[selectedMenu]}</div>
    </div>
  );
};

export default Form;
