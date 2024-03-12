import LoginButton from "@/components/User/login/LoginButton";
import Image from "next/image";
import styles from "@/components/User/login/index.module.scss";


function Form() {

    const loginlinks = [
        {
            id: '1',
            link: `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&response_type=code&scope=email profile`,
            image: '/images/LoginGoogleButton.png',
        },
        {
            id: '2',
            link: `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}&state=sdwirnsfk4563&redirect_uri=http://localhost:3000`,
            image: '/images/LoginNaverButton.png',
        },
        {
            id: '3',
            link: `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}&response_type=code`,
            image: '/images/LoginKakaoButton.png',
        },
    ]

    return (
        <div className={styles.login}>
            <a href="/">
                <Image
                    src="/images/zipjung_logo.png"
                    width={150}
                    height={80}
                    alt='zipjung_logo'
                    className={styles.logo}
                />
            </a>
            <div className={styles.loginText}>Login</div>
            <div className={styles.loginContent}>소셜 계정으로 쉽게 로그인하세요.</div>
            <div className={styles.loginButtons}>       
                {loginlinks.map(({ id, link, image }) => <LoginButton key={id} loginLink={link} loginImg={image} />)}
            </div>
        </div>
    );
};

export default Form;
