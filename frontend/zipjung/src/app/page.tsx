'use client';

import '@/styles/reset.css';
import Header from '@/components/Common/Header';
import useUserInfoStore from '@/stores/userInfo';

export default function Page() {
  const {ZustandToken} = useUserInfoStore();
  if (ZustandToken !== '') {
    // eslint-disable-next-line no-console
    console.log(ZustandToken);
  }
  return (
    <>
      <Header></Header>
    </>
  );
}

// export default function Page() {

//   return <><h2>시작</h2></>
//   };
