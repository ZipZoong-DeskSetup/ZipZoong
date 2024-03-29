import {create} from 'zustand';
import {persist} from 'zustand/middleware';

// 키배열, 유무선, 손목건강
interface ISImpleSurveyStore {
  zustandKeyboardLayout: -1 | 2 | 4;
  setZustandKeyboardLayout: (newLayout: 2 | 4) => void;
  zustandKeyboardConnection: 'INIT' | 'WIRE' | 'WIRELESS' | 'BOTH';
  setZustandKeyboardConnection: (
    newConnection: 'WIRE' | 'WIRELESS' | 'BOTH',
  ) => void;
  zustandMouseConnection: 'INIT' | 'WIRE' | 'WIRELESS' | 'BOTH';
  setZustandMouseConnection: (
    newConnection: 'WIRE' | 'WIRELESS' | 'BOTH',
  ) => void;
  zustandKeyboardHealth: boolean | 'INIT';
  setZustandKeyboardHealth: (newHealth: boolean) => void;
  zustandMouseHealth: 'INIT' | boolean;
  setZustandMouseHealth: (newHealth: boolean) => void;
  resetSimpleSurvey: () => void;
}

const useSimpleSurveyStore = create<ISImpleSurveyStore>()(
  persist(
    set => ({
      zustandKeyboardLayout: -1,
      setZustandKeyboardLayout: (newLayout: 2 | 4) =>
        set({zustandKeyboardLayout: newLayout}),
      zustandKeyboardConnection: 'INIT',
      setZustandKeyboardConnection: (
        newConnection: 'WIRE' | 'WIRELESS' | 'BOTH',
      ) => set({zustandKeyboardConnection: newConnection}),
      zustandMouseConnection: 'INIT',
      setZustandMouseConnection: (
        newConnection: 'WIRE' | 'WIRELESS' | 'BOTH',
      ) => set({zustandMouseConnection: newConnection}),
      zustandKeyboardHealth: 'INIT',
      setZustandKeyboardHealth: (newHealth: boolean) =>
        set({zustandKeyboardHealth: newHealth}),
      zustandMouseHealth: 'INIT',
      setZustandMouseHealth: (newHealth: boolean) =>
        set({zustandMouseHealth: newHealth}),
      resetSimpleSurvey: () =>
        set({
          zustandKeyboardLayout: -1,
          zustandKeyboardConnection: 'INIT',
          zustandMouseConnection: 'INIT',
          zustandKeyboardHealth: 'INIT',
          zustandMouseHealth: 'INIT',
        }),
    }),
    {name: 'SimpleSurvey'},
  ),
);

export default useSimpleSurveyStore;
export type {ISImpleSurveyStore};
