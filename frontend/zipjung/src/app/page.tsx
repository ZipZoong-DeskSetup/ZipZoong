'use client';

import '@/styles/reset.css';
import Header from '@/components/Common/Header';
import useUserInfoStore from '@/stores/userInfo';
import Form from '@/components/MainPage';
import Footer from '@/components/Common/Footer/Footer';

export default function Page() {
  const {ZustandToken} = useUserInfoStore();
  if (ZustandToken !== '') {
    // eslint-disable-next-line no-console
    console.log(ZustandToken);
  }
  return (
    <div style={{ backgroundColor: '#FBF9F1' }}>
      <Header></Header>
      <Form></Form>
      <Footer></Footer>
    </div>
  );
}
