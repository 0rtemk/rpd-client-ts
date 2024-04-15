import create from 'zustand';
import { immer } from 'zustand/middleware/immer';

// Рекурсивный тип для JSON данных
type JsonValue = any;
interface JsonData {
  [key: string]: JsonValue;
}

interface StoreState {
  jsonData: JsonData;
  setJsonData: (data: JsonData) => void;
  updateJsonData: (key: string, value: JsonValue) => void;
}

const useStore = create<StoreState> () (immer((set) => ({
  jsonData: {},
  setJsonData: (data) => {
    set((state) => {
      state.jsonData = data;
    });
  },
  updateJsonData: (key, value) => {
    set((state) => {
      if (value !== undefined) {
        state.jsonData[key] = value;
      } else {
        delete state.jsonData[key];
      }
    });
  }
})));

export default useStore;