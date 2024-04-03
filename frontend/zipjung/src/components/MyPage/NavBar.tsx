import {useState} from 'react';
import styles from '@/components/MyPage/NavBar.module.scss';

const NavBar = ({updateMenu}: {updateMenu: (idx: number) => void}) => {
  const [selectedMenu, setSelectedMenu] = useState<number>(0);
  const menu: string[] = ['내 정보 변경', '내 관심 조합', '내 관심 제품'];

  // TODO: 상태끌어올리기 추가
  const handleClick = (idx: number) => {
    updateMenu(idx);
    setSelectedMenu(idx);
  };

  return (
    <div className={styles.navContainer}>
      <div className={styles.position}>
        {menu.map((item, idx) =>
          idx === selectedMenu ? (
            <span
              className={styles.clickedMenu}
              key={idx}
              onClick={() => handleClick(idx)}
            >
              {item}
            </span>
          ) : (
            <span
              className={styles.menu}
              key={idx}
              onClick={() => handleClick(idx)}
            >
              {item}
            </span>
          ),
        )}
      </div>
      <hr className={styles.divisionLine} />
    </div>
  );
};

export default NavBar;
