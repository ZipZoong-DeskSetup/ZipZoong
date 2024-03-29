import {create} from 'zustand';
import {persist} from 'zustand/middleware';
// 모니터-사이즈, 비율, 패널 형태
// 키보드-키배열, 접점(축), 유/무선
// 마우스- 유/무선
// 손목 건강, 소음
interface IComplicateSurveyStore {
  zustandMonitorSize: (-1 | 1 | 2 | 4 | 8 | 16)[];
  setZustandMonitorSize: (newSize: (1 | 2 | 4 | 8 | 16)[]) => void;
  zustandMonitorRatio: (-1 | 1 | 2 | 4 | 8)[];
  setZustandMonitorRatio: (newRatio: (1 | 2 | 4 | 8)[]) => void;
  zustandMonitorPanel: 'INIT' | 'FLAT' | 'CURVED';
  setZustandMonitorPanel: (newPanel: 'FLAT' | 'CURVED') => void;
  zustandKeyboardLayout: -1 | 0 | 1 | 2 | 3 | 4;
  setZustandKeyboardLayout: (newLayout: 0 | 1 | 2 | 3 | 4) => void;
  zustandKeyboardType: 'MEMBRANE' | 'MECHANICAL' | 'PANTOGRAPH' | 'INIT';
  setZustandKeyboardType: (
    newType: 'MEMBRANE' | 'MECHANICAL' | 'PANTOGRAPH',
  ) => void;
  // FIXME: keyboard sound null 가능?(멤브레인이면?)
  zustandKeyboardSound: 'RED' | 'BLACK' | 'BROWN' | 'BLUE' | 'INIT';
  setZustandKeyboardSound: (
    newSound: 'RED' | 'BLACK' | 'BROWN' | 'BLUE',
  ) => void;
  zustandKeyboardConnection: 'WIRE' | 'WIRELESS' | 'BOTH' | 'INIT';
  setZustandKeyboardConnection: (
    newConnection: 'WIRE' | 'WIRELESS' | 'BOTH',
  ) => void;
  zustandSound: boolean | 'INIT';
  setZustandSound: (newSound: boolean) => void;
  zustandMouseConnection: 'WIRE' | 'WIRELESS' | 'BOTH' | 'INIT';
  setZustandMouseConnection: (
    newConnection: 'WIRE' | 'WIRELESS' | 'BOTH',
  ) => void;
  zustandHealth: boolean | 'INIT';
  setZustandHealth: (newHealth: boolean) => void;
  resetComplicateSurvey: () => void;
}

const useComplicateSurveyStore = create<IComplicateSurveyStore>()(
  persist(
    set => ({
      zustandMonitorSize: [-1],
      setZustandMonitorSize: (newSize: (1 | 2 | 4 | 8 | 16)[]) =>
        set({zustandMonitorSize: newSize}),
      zustandMonitorRatio: [-1],
      setZustandMonitorRatio: (newRatio: (1 | 2 | 4 | 8)[]) =>
        set({zustandMonitorRatio: newRatio}),
      zustandMonitorPanel: 'INIT',
      setZustandMonitorPanel: (newPanel: 'FLAT' | 'CURVED') =>
        set({zustandMonitorPanel: newPanel}),
      zustandKeyboardLayout: -1,
      setZustandKeyboardLayout: (newLayout: 0 | 1 | 2 | 3 | 4) =>
        set({zustandKeyboardLayout: newLayout}),
      zustandKeyboardType: 'INIT',
      setZustandKeyboardType: (
        newType: 'MEMBRANE' | 'MECHANICAL' | 'PANTOGRAPH',
      ) => set({zustandKeyboardType: newType}),
      // FIXME: keyboard sound null 가능?(멤브레인이면?)
      zustandKeyboardSound: 'INIT',
      setZustandKeyboardSound: (newSound: 'RED' | 'BLACK' | 'BROWN' | 'BLUE') =>
        set({zustandKeyboardSound: newSound}),
      zustandKeyboardConnection: 'INIT',
      setZustandKeyboardConnection: (
        newConnection: 'WIRE' | 'WIRELESS' | 'BOTH',
      ) => set({zustandKeyboardConnection: newConnection}),
      zustandSound: 'INIT',
      setZustandSound: (newSound: boolean) => set({zustandSound: newSound}),
      zustandMouseConnection: 'INIT',
      setZustandMouseConnection: (
        newConnection: 'WIRE' | 'WIRELESS' | 'BOTH',
      ) => set({zustandMouseConnection: newConnection}),
      zustandHealth: 'INIT',
      setZustandHealth: (newHealth: boolean) => set({zustandHealth: newHealth}),
      resetComplicateSurvey: () =>
        set({
          zustandSound: 'INIT',
          zustandMouseConnection: 'INIT',
          zustandHealth: 'INIT',
          zustandMonitorSize: [-1],
          zustandMonitorRatio: [-1],
          zustandMonitorPanel: 'INIT',
          zustandKeyboardLayout: -1,
          zustandKeyboardType: 'INIT',
          zustandKeyboardSound: 'INIT',
          zustandKeyboardConnection: 'INIT',
        }),
    }),
    {name: 'ComplicateSurvey'},
  ),
);
export default useComplicateSurveyStore;
export type {IComplicateSurveyStore};
