'use client';
import styles from '@/components/User/login/LoginButton.module.scss'

function LoginButton({loginLink, loginImg} :  {loginLink:string, loginImg:string}) {

    const loginHandler = () => {
        window.location.href = loginLink;
    }

    return (
        <div>
            <button onClick={loginHandler}><img src= {loginImg} alt="로그인" className={styles.loginButton}/></button>
        </div>
    )
};

export default LoginButton;