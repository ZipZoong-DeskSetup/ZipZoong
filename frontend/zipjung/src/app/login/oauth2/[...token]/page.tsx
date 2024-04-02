'use client';

import {useRouter, useSearchParams} from 'next/navigation';
import useUserInfoStore from '@/stores/userInfo';

// ('https://back.zipzoong.store/oauth2/redirect?isNewUser=true&accessToken=accessToken&refreshToken=refreshToken');

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const {setZustandToken, setZustandRFToken} = useUserInfoStore();
  const user = searchParams.get('isNewUser');
  const accessToken = searchParams.get('accessToken');
  const refreshToken = searchParams.get('refreshToken');

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

  return <div></div>;
}
