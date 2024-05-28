/* eslint-disable @next/next/no-img-element */

'use client';

import styles from '@/components/User/login/LoginButton.module.scss';

function LoginButton({
  loginLink,
  loginImg,
}: {
  loginLink: string;
  loginImg: string;
}) {
  return (
    <div>
      <a href={loginLink}>
        <button>
          <img src={loginImg} alt="로그인" className={styles.loginButton} />
        </button>
      </a>
    </div>
  );
}

export default LoginButton;
