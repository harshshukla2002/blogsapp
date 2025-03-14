import { create } from "zustand";

type User = {
  username: string;
  email: string;
  image: string;
};

export type State = {
  isLoading: boolean;
  isError: boolean;
  user: User | null;
  token: string | null;
};

const initialState: State = {
  isLoading: false,
  isError: false,
  user: null,
  token: null,
};

const useUser = create((set) => ({
  ...initialState,
  setIsLoading: () => set({ isLoading: true }),
  setIsError: () => set({ isLoading: false, isError: true }),
  setUser: (payload: User) =>
    set(() => ({
      isLoading: false,
      isError: false,
      user: payload,
    })),
  setToken: (payload: string) =>
    set(() => ({
      token: payload,
    })),
}));

export default useUser;
