import { create } from "zustand";
import { persist } from "zustand/middleware";

import { Recommendations, Hardware } from '@/types/Recommendation';

interface IRecommendStore {
    ZustandRecommendList: Hardware[]; // Recommendations['combination']과 동일한 타입.
    setZustandRecommendList: (newRecommendList: Hardware[]) => void; // Hardware[] 타입을 받도록 수정.
    ZustandRecommendDetail: Hardware | undefined;
    setZustandRecommendDetail: (newRecommendDetail: Hardware) => void;
}



const useRecommendStore = create<IRecommendStore>()(
    persist(
        set => ({
            ZustandRecommendList: [],
            setZustandRecommendList: (newRecommendList: Hardware[]) => 
            set({ ZustandRecommendList: newRecommendList }),
            ZustandRecommendDetail: undefined,
            setZustandRecommendDetail: (newRecommendDetail: Hardware) => 
            set({ ZustandRecommendDetail: newRecommendDetail }),
        }),
        {
            name: "recommend-store", 
        }
    ));


export default useRecommendStore
export type { IRecommendStore }