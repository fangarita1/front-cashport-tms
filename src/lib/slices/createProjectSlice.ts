import { IProject } from "@/types/projects/IProject";

export interface ProjectSlice {
  projects: IProject[];
  selectProject: IProject;
  // eslint-disable-next-line no-unused-vars
  getProjects: (by: IProject[]) => void;
  // eslint-disable-next-line no-unused-vars
  setSelectedProject: (by: IProject) => void;
}

export const createProjectSlice = (set: any): ProjectSlice => ({
  projects: [],
  selectProject: {} as IProject,
  getProjects: (by: IProject[]) => set({ projects: by }),
  setSelectedProject: (by: IProject) => set({ selectProject: by })
});
