
import styles from '@/components/User/singUp/StartButton.module.scss';
import useUserInfoStore from '@/stores/userInfo';
import axios from 'axios';


function StartButton({ detail, address, styleName, firstImg }: { detail: string, address: string, styleName: string, firstImg: string | null }) {

    const { ZustandNickname, setZustandImageUrl } = useUserInfoStore();

    const handleClick = async (event: React.MouseEvent<HTMLAnchorElement>) => {
        // event.preventDefault(); // <a> 태그의 기본 동작 방지

        // 닉네임과 프로필 이미지를 서버에 POST 요청
        // try {
        //     await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/nickname`, {
        //         nickname: ZustandNickname
        //     });
        //     if (firstImg) {
        //         await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/profile`, {
        //             userImg: firstImg
        //         });
        //         setZustandImageUrl(firstImg);   
        //     }
        //     window.location.href = address; // 요청 성공 후 페이지 이동
        // } catch (error) {
        //     console.error("Error posting data:", error);
        // }
        // setZustandImageUrl(firstImg);  
    };

    return (
        <a href={address} onClick={handleClick}>
            <button className={styles[styleName]}>{detail}</button>
        </a>
    )
}

export default StartButton;