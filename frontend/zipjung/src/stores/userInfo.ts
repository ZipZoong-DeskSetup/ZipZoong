import {create} from 'zustand';
import {persist} from 'zustand/middleware';

import {UserInfo} from '@/types/UserInfo';

interface IUserInfoStore {
  ZustandNickname?: UserInfo['nickname'];
  setZustandNickname: (newNickname: string) => void;
  ZustandImageUrl: UserInfo['imageUrl'];
  setZustandImageUrl: (newImageUrl: string) => void;
  ZustandId: UserInfo['id'];
  setZustandId: (newId: number) => void;
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
      ZustandId: 0,
      setZustandId: (newId: number) => set({ZustandId: newId}),
    }),
    {
      name: 'UserInfo',
    },
  ),
);

export default useUserInfoStore;
export type {IUserInfoStore};
