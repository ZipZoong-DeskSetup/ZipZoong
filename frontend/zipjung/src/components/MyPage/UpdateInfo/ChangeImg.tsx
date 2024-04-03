/* eslint-disable no-console */
// import {useState} from 'react';
import {useEffect, useRef} from 'react';
import Image from 'next/image';
// import axios from 'axios';
import styles from '@/components/MyPage/UpdateInfo/ChangeImg.module.scss';
import useUserInfoStore from '@/stores/userInfo';

const ChangeImg = ({pUserImg}: {pUserImg: string}) => {
  const {ZustandImageUrl, setZustandImageUrl} = useUserInfoStore();
  const imgRef = useRef<HTMLInputElement>(null);
  // const [presentImgUrl, setPresentImgUrl] = useState<string>(pUserImg);
  console.log(pUserImg);
  useEffect(() => {
    // setPresentImgUrl(ZustandImageUrl);
  }, [ZustandImageUrl]);

  const saveImgFile = () => {
    // console.log('File');
    if (imgRef.current && imgRef.current.files && imgRef.current.files[0]) {
      const file = imgRef.current.files[0];
      const reader = new FileReader();
      const imageUrl = URL.createObjectURL(file);
      setZustandImageUrl(imageUrl);
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          // TODO: 서버에도 저장
          // axios
          //   .post(`${process.env.NEXT_PUBLIC_BASE_URL}/profile`, {
          //     userImg: reader.result,
          //   })
          //   .then(response => {
          //     console.log(response);
          //   })
          //   .catch(Error => {
          //     console.error(Error);
          //   });
        }
      };
    }
  };

  return (
    <div className={styles.profileContainer}>
      <div className={styles.name}>프로필 사진</div>
      <div className={styles.secondContainer}>
        <div className={styles.hidden}></div>
        <div className={styles.profileImageContainer}>
          <Image
            className={styles.profileImg}
            src={ZustandImageUrl}
            alt="프로필 사진"
            width={200}
            height={200}
          />
        </div>
        <input
          type="file"
          accept="image/*"
          id="profileImg"
          onChange={saveImgFile}
          ref={imgRef}
          hidden
        />
        <button className={styles.changButton}>
          <label className={styles.changeLabel} htmlFor="profileImg">
            <div className={styles.sort}>변경</div>
          </label>
        </button>
      </div>
    </div>
  );
};

export default ChangeImg;
