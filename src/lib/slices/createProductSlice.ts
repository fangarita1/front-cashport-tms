import { UserByTokenResponse } from "@/types/users/IUserByToken";
import { StateCreator } from "zustand";

export interface UserSlice {
  user: UserByTokenResponse;
  // eslint-disable-next-line no-unused-vars
  setUser: (u: any) => void;
}

export const createUserSlice: StateCreator<UserSlice> = (set) => ({
  user: {} as any,
  setUser: (u: any) => set(() => ({ user: u }))
});
