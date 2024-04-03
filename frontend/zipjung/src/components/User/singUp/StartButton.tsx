import axios from 'axios';
import styles from '@/components/User/singUp/StartButton.module.scss';
import useUserInfoStore from '@/stores/userInfo';

function StartButton({
  detail,
  address,
  styleName,
  firstImg,
}: {
  detail: string;
  address: string;
  styleName: string;
  firstImg: string;
}) {
  const {ZustandNickname, setZustandImageUrl, ZustandToken} =
    useUserInfoStore();

  const handleClick = async (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault(); // <a> 태그의 기본 동작 방지
    // 닉네임과 프로필 이미지를 서버에 POST 요청
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/nickname`, {
        nickname: ZustandNickname,
        headers: {
          Authorization: `Bearer ${ZustandToken}`,
        },
      });
      if (firstImg) {
        await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/profile`, {
          userImg: firstImg,
          headers: {
            Authorization: `Bearer ${ZustandToken}`,
          },
        });
        setZustandImageUrl(firstImg);
      } else {
        // eslint-disable-next-line no-console
        console.log('no Img');
      }
      window.location.href = address; // 요청 성공 후 페이지 이동
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error posting data:', error);
    }
    // setZustandImageUrl(firstImg);
  };

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <a href={address} onClick={handleClick}>
      <button className={styles[styleName]}>{detail}</button>
    </a>
  );
}

export default StartButton;
