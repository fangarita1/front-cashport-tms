import { UserByTokenResponse } from "@/types/users/IUserByToken";

export interface UserSlice {
  user: UserByTokenResponse;
  // eslint-disable-next-line no-unused-vars
  setUser: (u: any) => void;
}

export const createUserSlice = (set: any): UserSlice => ({
  user: {} as any,
  setUser: (u: any) => set(() => ({ user: u }))
});
