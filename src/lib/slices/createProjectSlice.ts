import { IProject } from "@/types/projects/IProjects";
import { IProject as ISingleProject } from "@/types/projects/IProject";

export interface ProjectSlice {
  projects: IProject[];
  selectProject: ISingleProject;
  // eslint-disable-next-line no-unused-vars
  getProjects: (by: IProject[]) => void;
  // eslint-disable-next-line no-unused-vars
  setSelectedProject: (by: ISingleProject) => void;
}

export const createProjectSlice = (set: any): ProjectSlice => ({
  projects: [],
  selectProject: {} as ISingleProject,
  getProjects: (by: IProject[]) => set({ projects: by }),
  setSelectedProject: (by: ISingleProject) => set({ selectProject: by })
});
