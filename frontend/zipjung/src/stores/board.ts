import {create} from 'zustand';
import {persist} from 'zustand/middleware';

interface Board {
  boardId: number;
  boardTitle: string | null;
  boardContent: string | null;
  boardHit: number;
  boardThumbnail: string | null;
  boardCreator: string | null;
  boardCreatorId: string;
  boardCreatorImg: string | null;
  boardCreatedAt: string;
  boardCombinations: [];
}

interface IBoardState {
  ZustandboardId: number | null;
  setZustandBoardId: (id: number) => void;
  ZustandboardModifyId: number | null;
  setZustandboardModifyId: (id: number) => void;
  ZustandsurroundingBoards: Board[];
  setZustandsurroundingBoards: (boards: Board[]) => void;
}

const useBoardStore = create<IBoardState>()(
  persist(
    set => ({
      ZustandboardId: null,
      setZustandBoardId: (id: number) => set({ZustandboardId: id}),
      ZustandboardModifyId: null,
      setZustandboardModifyId: (id: number) => set({ZustandboardModifyId: id}),
      ZustandsurroundingBoards: [],
      setZustandsurroundingBoards: (boards: Board[]) =>
        set({ZustandsurroundingBoards: boards}),
    }),
    {
      name: 'board-store',
    },
  ),
);

export default useBoardStore;
export type {IBoardState};
