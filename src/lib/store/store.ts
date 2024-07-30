import { UserSlice, createUserSlice } from "@/lib/slices/createProductSlice";
import { ProjectSlice, createProjectSlice } from "@/lib/slices/createProjectSlice";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AppStore extends ProjectSlice, UserSlice {
  resetStore: () => void;
}

export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      ...createUserSlice(set),
      ...createProjectSlice(set),
      resetStore: () => {
        // Clear the session storage
        sessionStorage.removeItem("project");
        // Reset the Zustand store to initial state
        set({
          ...createUserSlice(set),
          ...createProjectSlice(set)
        });
      }
    }),
    {
      name: "project",
      storage: createJSONStorage(() => sessionStorage)
    }
  )
);
