'use client';

import {useState} from 'react';
import styles from '@/components/MyPage/index.module.scss';
import UpdateForm from '@/components/MyPage/UpdateInfo';
import CombinationForm from '@/components/MyPage/Combination';
// import MyProductForm from '@/components/MyPage/MyProduct';
import NavBar from '@/components/MyPage/NavBar';

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
      <div className={styles.pageName}>마이페이지</div>
      <NavBar updateMenu={updateMenu} />
      <div>{MenuBoard[selectedMenu]}</div>
    </div>
  );
};

export default Form;
