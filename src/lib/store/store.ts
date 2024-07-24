import { UserSlice, createUserSlice } from "@/lib/slices/createProductSlice";
import { ProjectSlice, createProjectSlice } from "@/lib/slices/createProjectSlice";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AppStore extends ProjectSlice, UserSlice {}

export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      ...createUserSlice(set),
      ...createProjectSlice(set)
    }),
    {
      name: "project",
      storage: createJSONStorage(() => sessionStorage)
    }
  )
);
