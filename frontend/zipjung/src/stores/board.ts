import {create} from 'zustand';
import {persist} from 'zustand/middleware';

interface IBoardState {
  ZustandboardId: number | null;
  setZustandBoardId: (id: number) => void;
}

const useBoardStore = create<IBoardState>()(
  persist(
    set => ({
      ZustandboardId: null,
      setZustandBoardId: (id: number) => set({ZustandboardId: id}),
    }),
    {
      name: 'board-store',
    },
  ),
);

export default useBoardStore;
export type {IBoardState};
