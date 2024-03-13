import { create } from "zustand";
import { persist } from "zustand/middleware";

import { Recommendations, Hardware } from '@/types/Recommendation';

interface IRecommendStore {
    ZustandRecommend: Hardware[]; // Recommendations['combination']과 동일한 타입.
    setZustandRecommend: (newRecommend: Hardware[]) => void; // Hardware[] 타입을 받도록 수정.
}



const useRecommendStore = create<IRecommendStore>()(
    persist(
        set => ({
            ZustandRecommend: [],
            setZustandRecommend: (newRecommend: Hardware[]) => 
            set({ ZustandRecommend: newRecommend }),
        }),
        {
            name: "recommend-store", 
        }
    ));


export default useRecommendStore
export type { IRecommendStore }