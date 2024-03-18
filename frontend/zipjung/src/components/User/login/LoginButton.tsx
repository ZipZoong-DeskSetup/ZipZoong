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
  // TODO: 요청 응답 후 Zustand 닉네임, 이미지, 로그인 상태변화 하기
  const loginHandler = () => {
    window.location.href = loginLink;
  };

  return (
    <div>
      <button onClick={loginHandler}>
        <img src={loginImg} alt="로그인" className={styles.loginButton} />
      </button>
    </div>
  );
}

export default LoginButton;
