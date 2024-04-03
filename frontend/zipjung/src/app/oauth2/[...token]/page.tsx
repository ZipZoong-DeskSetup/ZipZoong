/* eslint-disable @typescript-eslint/no-unsafe-assignment */

'use client';

// import dynamic from 'next/dynamic';
import {useRouter, useSearchParams} from 'next/navigation';
import {useEffect} from 'react';
import useUserInfoStore from '@/stores/userInfo';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// const useUserInfoStore = dynamic(() => import('@/stores/userInfo'), {
//   ssr: false,
// });

// ('https://back.zipzoong.store/oauth2/redirect?isNewUser=true&accessToken=accessToken&refreshToken=refreshToken');

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const {setZustandToken, setZustandRFToken} = useUserInfoStore();
  const user = searchParams.get('isNewUser');
  const accessToken = searchParams.get('accessToken');
  const refreshToken = searchParams.get('refreshToken');

  useEffect(() => {
    if (accessToken !== null) {
      setZustandToken(accessToken);
    }
    if (refreshToken !== null) {
      setZustandRFToken(refreshToken);
    }

    if (user === 'true') {
      router.push('/user/signUp');
    } else {
      router.push('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // eslint-disable-next-line no-console
  console.log(user, accessToken, refreshToken);

  return <div></div>;
}
