import {useState, useEffect, useRef} from 'react';
import Image from 'next/image';
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
  border-radius: 200px;
  background-color: white;
  border: var(--main-color-dark) 2px solid;
  display: flex;
`;

const ChangeButton = styled.button`
  border-radius: 10px;
  width: 115px;
  height: 54px;
  display: flex;
  background-color: var(--button-main-color);
`;

const ProfileImg = styled(Image)`
  object-fit: cover;
  border-radius: 200px;
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
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: space-evenly;
`;

const Sort = styled.div`
  font-size: 16px;
  font-weight: bold;
`;

const Hidden = styled.div`
  width: 115px;
`;
const ChangeImg = ({pUserImg}: {pUserImg: string}) => {
  const {ZustandImageUrl, setZustandImageUrl} = useUserInfoStore();
  const imgRef = useRef<HTMLInputElement>(null);
  const [presentImgUrl, setPresentImgUrl] = useState<string>(pUserImg);

  useEffect(() => {
    setPresentImgUrl(ZustandImageUrl);
  }, [ZustandImageUrl]);

  const handleClick = () => {
    // console.log('ㄴㄹ');
  };
  const saveImgFile = () => {
    // console.log('File');
    if (imgRef.current && imgRef.current.files && imgRef.current.files[0]) {
      const file = imgRef.current.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setZustandImageUrl(reader.result);
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
            src={presentImgUrl}
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
        <ChangeButton onClick={handleClick}>
          <ChangeLabel htmlFor="profileImg">
            <Sort>변경</Sort>
          </ChangeLabel>
        </ChangeButton>
      </SecondContainer>
    </ProfileContainer>
  );
};

export default ChangeImg;
