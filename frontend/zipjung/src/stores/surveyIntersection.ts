import {create} from 'zustand';
import {persist} from 'zustand/middleware';

interface ISurveyIntersectionStore {
  ZustandSelection: string;
  setZustandSelection: (newSelection: string) => void;
  resetSelection: () => void;
}

const useSurveyIntersectionStore = create<ISurveyIntersectionStore>()(
  persist(
    set => ({
      ZustandSelection: 'INIT',
      setZustandSelection: (newSelection: string) =>
        set({ZustandSelection: newSelection}),
      resetSelection: () => set({ZustandSelection: 'INIT'}),
    }),
    {
      name: 'SurveyInterSection',
    },
  ),
);
export default useSurveyIntersectionStore;
export type {ISurveyIntersectionStore};
