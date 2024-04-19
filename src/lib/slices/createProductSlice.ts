import { StateCreator } from "zustand";

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface UserSlice {
  user: User;
}

export const createUserSlice: StateCreator<UserSlice> = () =>
  // set
  ({
    user: {
      name: "felipe"
    } as User
  });
