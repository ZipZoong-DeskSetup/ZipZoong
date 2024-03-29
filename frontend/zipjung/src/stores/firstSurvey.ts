import {create} from 'zustand';

import {persist} from 'zustand/middleware';
// 용도, 가격, 색
interface IFirstSurveyStore {
  zustandMonitorUsage: -1 | 1 | 2 | 4 | 8 | 16;
  setZustandMonitorUsage: (newUsage: -1 | 1 | 2 | 4 | 8 | 16) => void;
  zustandKeyboardUsage: -1 | 1 | 2 | 4 | 8 | 16;
  setZustandKeyboardUsage: (newUsage: -1 | 1 | 2 | 4 | 8 | 16) => void;
  zustandMouseUsage: -1 | 1 | 2 | 4 | 8 | 16;
  setZustandMouseUsage: (newUsage: -1 | 1 | 2 | 4 | 8 | 16) => void;
  zustandTotalPrice: number;
  setZustandTotalPrice: (newPrice: number) => void;
  zustandColor: 'INIT' | 'BLACK' | 'WHITE' | 'COLOR' | 'NONE';
  setZustandColor: (
    newColor: 'INIT' | 'BLACK' | 'WHITE' | 'COLOR' | 'NONE',
  ) => void;
  resetFirstSurvey: () => void;
}

const useFirstSurveyStore = create<IFirstSurveyStore>()(
  persist(
    set => ({
      zustandMonitorUsage: -1,
      setZustandMonitorUsage: (newUsage: -1 | 1 | 2 | 4 | 8 | 16) =>
        set({zustandMonitorUsage: newUsage}),
      zustandKeyboardUsage: -1,
      setZustandKeyboardUsage: (newUsage: -1 | 1 | 2 | 4 | 8 | 16) =>
        set({zustandKeyboardUsage: newUsage}),
      zustandMouseUsage: -1,
      setZustandMouseUsage: (newUsage: -1 | 1 | 2 | 4 | 8 | 16) =>
        set({zustandMouseUsage: newUsage}),
      zustandTotalPrice: 0,
      setZustandTotalPrice: (newPrice: number) =>
        set({zustandTotalPrice: newPrice}),
      zustandColor: 'INIT',
      setZustandColor: (
        newColor: 'INIT' | 'BLACK' | 'WHITE' | 'COLOR' | 'NONE',
      ) => set({zustandColor: newColor}),
      resetFirstSurvey: () => {
        set({
          zustandMonitorUsage: -1,
          zustandKeyboardUsage: -1,
          zustandMouseUsage: -1,
          zustandTotalPrice: 0,
          zustandColor: 'INIT',
        });
      },
    }),
    {name: 'FirstSurvey'},
  ),
);

export default useFirstSurveyStore;
export type {IFirstSurveyStore};
