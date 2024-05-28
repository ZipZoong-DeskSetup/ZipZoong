/* eslint-disable @typescript-eslint/no-unused-vars */
import {useState, useEffect} from 'react';
import axios from 'axios';
import styles from '@/components/MyPage/UpdateInfo/ChangeNickname.module.scss';
import useUserInfoStore from '@/stores/userInfo';
import {NicknameCheck} from '@/types/MyPage';
import ChangeCheckModal from '@/components/MyPage/Modal/ChangeCheckModal';

const ChangeNickname = () => {
  const {ZustandNickname, setZustandNickname, ZustandToken} =
    useUserInfoStore();
  const initNickname: string = ZustandNickname || ' ';
  const [valueNickname, setValueNickname] = useState<string>(initNickname);
  const [duplication, setDuplication] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const contents: JSX.Element = <>닉네임이 변경되었습니다.</>;
  const modalImg: string = '/Images/CheckRight.png';

  useEffect(() => {
    if (ZustandNickname) setValueNickname(ZustandNickname);
  }, [ZustandNickname]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newNickname = event.target.value;
    setValueNickname(newNickname);
    const checkNickname = encodeURIComponent(newNickname);
    /** 중복 체크 */
    axios
      .get<NicknameCheck>(
        `${process.env.NEXT_PUBLIC_BASE_URL}/user/nickname/check/${checkNickname}`,
        {
          headers: {
            Authorization: `Bearer ${ZustandToken}`,
          },
        },
      )
      .then(response => {
        if (response.data.data.isAvailable) {
          setDuplication(true);
        } else {
          setDuplication(false);
        }
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.error(error);
      });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleClick = () => {
    // TODO: 닉네임 보내기
    axios
      .post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/user/nickname`,
        {
          nickname: valueNickname,
        },
        {
          headers: {
            Authorization: `Bearer ${ZustandToken}`,
          },
        },
      )
      .then(response => {
        // eslint-disable-next-line no-console
        console.log(response);
      })
      .catch(Error => {
        // eslint-disable-next-line no-console
        console.error(Error);
      });
    setValueNickname(valueNickname);
    setZustandNickname(valueNickname);
    setIsModalOpen(true);
  };
  return (
    <div className={styles.firstContainer}>
      <div className={styles.name}>닉네임</div>
      <div className={styles.secondContainer}>
        <span className={styles.hidden}></span>
        <input
          className={styles.nickname}
          type="text"
          value={valueNickname}
          onChange={handleChange}
          maxLength={8}
        />
        {!duplication || ZustandNickname === valueNickname ? (
          <button
            disabled
            className={styles.unchangeButton}
            onClick={handleClick}
          >
            변경
          </button>
        ) : (
          <button className={styles.changeButton} onClick={handleClick}>
            변경
          </button>
        )}
      </div>
      <ChangeCheckModal
        contents={contents}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        ModalImg={modalImg}
      />
      {!duplication && ZustandNickname !== valueNickname && (
        <div style={{color: 'red'}}>중복된 닉네임입니다.</div>
      )}
      {duplication && ZustandNickname !== valueNickname && (
        <div style={{color: 'green'}}>사용 가능한 닉네임입니다.</div>
      )}
    </div>
  );
};

export default ChangeNickname;
