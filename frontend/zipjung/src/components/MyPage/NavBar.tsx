import styled from 'styled-components';
import {useState} from 'react';

const NavContainer = styled.div`
  width: 60%;
  margin: auto;
`;

const Position = styled.div`
  font-size: 25px;
  display: flex;
  margin: 3px;
  padding: 6px 3px;
  justify-content: space-between;
`;

const DivisionLine = styled.hr`
  border: 0;
  height: 1px;
  background-color: var(--main-color-dark);
`;

const ClickedMenu = styled.span`
  font-weight: 700;
  cursor: pointer;
`;

const Menu = styled.span`
  cursor: pointer;
`;

const NavBar = ({updateMenu}: {updateMenu: (idx: number) => void}) => {
  const [selectedMenu, setSelectedMenu] = useState<number>(0);
  const menu: string[] = ['내 정보 변경', '내 관심 조합', '내 관심 제품'];

  // TODO: 상태끌어올리기 추가
  const handleClick = (idx: number) => {
    updateMenu(idx);
    setSelectedMenu(idx);
  };

  return (
    <NavContainer>
      <Position>
        {menu.map((item, idx) =>
          idx === selectedMenu ? (
            <ClickedMenu key={idx} onClick={() => handleClick(idx)}>
              {item}
            </ClickedMenu>
          ) : (
            <Menu key={idx} onClick={() => handleClick(idx)}>
              {item}
            </Menu>
          ),
        )}
      </Position>
      <DivisionLine />
    </NavContainer>
  );
};

export default NavBar;
