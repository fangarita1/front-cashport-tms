import { UserSlice, createUserSlice } from "@/lib/slices/createProductSlice";
import { ProjectSlice, createProjectSlice } from "@/lib/slices/createProjectSlice";

import { create } from "zustand";
interface AppStore extends ProjectSlice, UserSlice {}

export const useAppStore = create<AppStore>()((...a) => ({
  ...createUserSlice(...a),
  ...createProjectSlice(...a)
}));
