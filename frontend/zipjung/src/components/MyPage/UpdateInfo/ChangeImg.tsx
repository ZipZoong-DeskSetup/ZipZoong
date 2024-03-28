/* eslint-disable no-console */
// import {useState} from 'react';
import {useEffect, useRef} from 'react';
import Image from 'next/image';
// import axios from 'axios';
import styled from 'styled-components';
import useUserInfoStore from '@/stores/userInfo';

const ProfileContainer = styled.div`
  display: flex;
  width: 60%;
  flex-direction: column;
  align-items: center;
`;
const Name = styled.div`
  font-size: 25px;
  margin-bottom: 30px;
  margin-top: 20px;
`;

const ProfileImageContainer = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: white;
  border: var(--main-color-dark) 2px solid;
  display: flex;
`;

const ChangeButton = styled.button`
  border-radius: 10px;
  width: 103px;
  height: 48px;
  display: flex;
  background-color: var(--button-main-color);
`;

const ProfileImg = styled(Image)`
  object-fit: cover;
  border-radius: 50%;
`;

const ChangeLabel = styled.label`
  width: 100%;
  height: 100%;
  text-align: center;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SecondContainer = styled.div`
  width: 600px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`;

const Sort = styled.div`
  font-size: 16px;
  font-weight: bold;
`;

const Hidden = styled.div`
  width: 103px;
`;

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
    <ProfileContainer>
      <Name>프로필 사진</Name>
      <SecondContainer>
        <Hidden></Hidden>
        <ProfileImageContainer>
          <ProfileImg
            src={ZustandImageUrl}
            alt="프로필 사진"
            width={200}
            height={200}
          />
        </ProfileImageContainer>
        <input
          type="file"
          accept="image/*"
          id="profileImg"
          onChange={saveImgFile}
          ref={imgRef}
          hidden
        />
        <ChangeButton>
          <ChangeLabel htmlFor="profileImg">
            <Sort>변경</Sort>
          </ChangeLabel>
        </ChangeButton>
      </SecondContainer>
    </ProfileContainer>
  );
};

export default ChangeImg;
