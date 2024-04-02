import {create} from 'zustand';
import {persist} from 'zustand/middleware';

import {UserInfo} from '@/types/UserInfo';

interface IUserInfoStore {
  ZustandNickname?: UserInfo['nickname'];
  setZustandNickname: (newNickname: string) => void;
  ZustandImageUrl: UserInfo['imageUrl'];
  setZustandImageUrl: (newImageUrl: string) => void;
  ZustandId: UserInfo['id'];
  setZustandId: (newId: string) => void;
  ZustandToken: string;
  setZustandToken: (newToken: string) => void;
  ZustandRFToken: string;
  setZustandRFToken: (newRF: string) => void;
}

const useUserInfoStore = create<IUserInfoStore>()(
  persist(
    set => ({
      ZustandNickname: undefined,
      setZustandNickname: (newNickname: string) =>
        set({ZustandNickname: newNickname}),
      ZustandImageUrl: '/Images/profileImg.png',
      setZustandImageUrl: (newImageUrl: string) =>
        set({ZustandImageUrl: newImageUrl}),
      ZustandId: '',
      setZustandId: (newId: string) => set({ZustandId: newId}),
      ZustandToken: '',
      setZustandToken: (newToken: string) => set({ZustandToken: newToken}),
      ZustandRFToken: '',
      setZustandRFToken: (newRF: string) => set({ZustandRFToken: newRF}),
    }),
    {
      name: 'UserInfo',
    },
  ),
);

export default useUserInfoStore;
export type {IUserInfoStore};
