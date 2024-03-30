/* eslint-disable no-alert */
import {create} from 'zustand';
import {persist} from 'zustand/middleware';

interface IBoardProductStore {
  zustandLikedCombination: number[];
  setZustandLikedCombination: (newCombination: number | number[]) => void;
  deleteZustandLikedCombination: (targetCombination: number) => void;
}

const useBoardProductStore = create<IBoardProductStore>()(
  persist(
    set => ({
      zustandLikedCombination: [],
      setZustandLikedCombination: newCombination =>
        set(state => {
          // 새 조합이 숫자인 경우, 처리
          if (typeof newCombination === 'number') {
            // 배열의 길이가 이미 2 이상이면 추가하지 않음
            if (state.zustandLikedCombination.length >= 2) {
              // console.log('조합은 최대 2개까지만 선택 가능합니다.');
              alert('조합은 최대 2개까지만 선택 가능합니다.');
              return state; // 상태 변경 없음
            }
            // 이미 존재하는 경우, 상태 변경 없음
            if (state.zustandLikedCombination.includes(newCombination)) {
              return state;
            }
            // 새 조합 추가
            return {
              ...state,
              zustandLikedCombination: [
                ...state.zustandLikedCombination,
                newCombination,
              ],
            };
          }
          // 새 조합이 빈 배열인 경우, 상태를 빈 배열로 초기화
          if (Array.isArray(newCombination) && newCombination.length === 0) {
            return {...state, zustandLikedCombination: []};
          }
          // 그 외의 경우, 상태 변경 없음
          return state;
        }),
      deleteZustandLikedCombination: (targetCombination: number) =>
        set(state => ({
          ...state,
          zustandLikedCombination: state.zustandLikedCombination.filter(
            combination => combination !== targetCombination,
          ),
        })),
    }),
    {
      name: 'boardProduct',
    },
  ),
);

export default useBoardProductStore;
