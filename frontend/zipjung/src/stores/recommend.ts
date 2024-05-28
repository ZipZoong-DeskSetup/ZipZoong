import {create} from 'zustand';
import {persist} from 'zustand/middleware';

import {Hardware} from '@/types/Recommendation';

interface CombinationDetail {
  combinationId: number;
  monitors: MonitorDetail[];
  keyboard: KeyboardDetail;
  mouse: MouseDetail;
  totalPrice: string;
}

interface MonitorDetail {
  id: number;
  name: string;
  price: string; // 가격을 숫자가 아닌 문자열로 처리
  img: string;
  brand: string;
  url: string;
  category: string;
  size: number;
  resolution: string;
  aspectRatio: string;
  refreshRate: number;
  panelType: string;
  panelFormType: string;
}

interface KeyboardDetail {
  id: number;
  name: string;
  price: string; // 가격을 숫자가 아닌 문자열로 처리
  img: string;
  brand: string;
  url: string;
  category: string;
  connect: string;
  connectInterface?: string | null;
  keySwitch: string;
  led: string;
  num: number;
  force?: string | null;
  color: string;
  form: string;
  contact: string;
}

interface MouseDetail {
  id: number;
  name: string;
  price: string; // 가격을 숫자가 아닌 문자열로 처리
  img: string;
  brand: string;
  url: string;
  category: string;
  connect: string;
  connectInterface?: string | null;
  mouseType: string;
  dpi?: string | null;
  color: string;
  weight?: string | null;
  width: number;
  length: number;
  height: number;
  isSound: boolean;
}

interface IRecommendStore {
  ZustandRecommendList: Hardware[];
  setZustandRecommendList: (newRecommendList: Hardware[]) => void;
  ZustandRecommendDetail: CombinationDetail | undefined;
  setZustandRecommendDetail: (newRecommendDetail: CombinationDetail) => void;
}

const useRecommendStore = create<IRecommendStore>()(
  persist(
    set => ({
      ZustandRecommendList: [],
      setZustandRecommendList: (newRecommendList: Hardware[]) =>
        set({ZustandRecommendList: newRecommendList}),
      ZustandRecommendDetail: undefined,
      setZustandRecommendDetail: (newRecommendDetail: CombinationDetail) =>
        set({ZustandRecommendDetail: newRecommendDetail}),
    }),
    {
      name: 'recommend-store',
    },
  ),
);

export default useRecommendStore;
export type {IRecommendStore};
