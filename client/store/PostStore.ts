import { create } from "zustand";

type EditData = {
  id: number;
  title: string;
  desc: string;
  image: string;
  category: string;
};

export type State = {
  category: string;
  editData: EditData | null;
};

const initialState: State = {
  category: "",
  editData: null,
};

const usePostStore = create((set) => ({
  ...initialState,
  setCategory: (payload: string) =>
    set(() => ({
      category: payload,
    })),
  setEditData: (payload: EditData) =>
    set(() => ({
      editData: payload,
    })),
}));

export default usePostStore;
