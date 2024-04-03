import Image from 'next/image';
import LoginButton from '@/components/User/login/LoginButton';
import styles from '@/components/User/login/index.module.scss';

function Form() {
  const loginlinks = [
    {
      id: '1',
      link: `https://back.zipzoong.store/oauth2/authorization/google`,
      image: '/Images/LoginGoogleButton.png',
    },
    {
      id: '2',
      link: `https://back.zipzoong.store/oauth2/authorization/kakao`,
      image: '/Images/LoginKakaoButton.png',
    },
  ];

  return (
    <div className={styles.login}>
      <a href="/">
        <Image src="/Images/LOGO3.png" width={120} height={40} alt="logo" />
      </a>
      <div className={styles.loginText}>Login</div>
      <div className={styles.loginContent}>
        소셜 계정으로 쉽게 로그인하세요.
      </div>
      <div className={styles.loginButtons}>
        {loginlinks.map(({id, link, image}) => (
          <LoginButton key={id} loginLink={link} loginImg={image} />
        ))}
      </div>
    </div>
  );
}

export default Form;
