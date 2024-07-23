import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

type JsonValue = any;
interface JsonData {
  [key: string]: JsonValue;
}

export interface SelectedTemplateData {
  faculty: string | undefined;
  levelEducation: string | undefined;
  directionOfStudy: string | undefined;
  profile: string | undefined;
  formEducation: string | undefined;
  year: string | undefined;
}

export interface SelectTeacherParams {
  id: number;
  teacher: string;
  userName: string | undefined;
}

interface CreateByCriteria {
  faculty?: string | undefined;
  year?: string | undefined;
}

interface StoreState {
  jsonData: JsonData;
  selectedTemplateData: SelectedTemplateData;
  createByCriteria: CreateByCriteria;
  complectId: number | undefined;
  setJsonData: (data: JsonData) => void;
  updateJsonData: (key: string, value: JsonValue) => void;
  setSelectedTemplateData: (
    faculty: string | undefined,
    levelEducation: string | undefined,
    directionOfStudy: string | undefined,
    profile: string | undefined,
    formEducation: string | undefined,
    year: string | undefined
  ) => void;
  setCreateByCriteria: (
    faculty?: string | undefined,
    year?: string | undefined
  ) => void;
  setComplectId: (id: number) => void;
}

const useStore = create<StoreState>()(immer((set) => ({
  jsonData: {},
  selectedTemplateData: {
    faculty: undefined,
    levelEducation: undefined,
    directionOfStudy: undefined,
    profile: undefined,
    formEducation: undefined,
    year: undefined
  },
  createByCriteria: {
    faculty: undefined,
    year: undefined
  },
  complectId: undefined,
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
  },
  setSelectedTemplateData: (faculty, levelEducation, directionOfStudy, profile, formEducation, year) => {
    set((state) => {
      if (faculty && levelEducation && directionOfStudy && profile && formEducation && year) {
        state.selectedTemplateData = {
          faculty: faculty,
          levelEducation: levelEducation,
          directionOfStudy: directionOfStudy,
          profile: profile,
          formEducation: formEducation,
          year: year
        }
      }
    });
  },
  setCreateByCriteria: (faculty, year) => {
    set((state) => {
      if (faculty) state.createByCriteria.faculty = faculty;
      if (year) state.createByCriteria.year = year;
    })
  },
  setComplectId: (id) => {
    set((state) => {
      state.complectId = id;
    })
  }
})));

export default useStore;