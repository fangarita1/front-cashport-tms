import { IProject } from "@/types/projects/IProject";
import { StateCreator } from "zustand";

export interface ProjectSlice {
  projects: IProject[];
  selectProject: IProject;
  // eslint-disable-next-line no-unused-vars
  getProjects: (by: any) => void;
  // eslint-disable-next-line no-unused-vars
  setSelectedProject: (by: IProject) => void;
}

export const createProjectSlice: StateCreator<ProjectSlice> = (set) =>
  // set
  ({
    projects: [],
    selectProject: {} as IProject,
    getProjects: (by: IProject[]) =>
      set(() => ({
        projects: by
      })),
    setSelectedProject: (by: IProject) =>
      set(() => ({
        selectProject: by
      }))
  });
