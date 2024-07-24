import { IProject } from "@/types/projects/IProjects";

export type ISelectedProject = {
  ID: number;
  NAME: string;
  LOGO: string;
};
export interface ProjectSlice {
  projects: IProject[];
  selectProject: ISelectedProject;
  // eslint-disable-next-line no-unused-vars
  getProjects: (by: IProject[]) => void;
  // eslint-disable-next-line no-unused-vars
  setSelectedProject: (by: ISelectedProject) => void;
}

export const createProjectSlice = (set: any): ProjectSlice => ({
  projects: [],
  selectProject: {} as ISelectedProject,
  getProjects: (by: IProject[]) => set({ projects: by }),
  setSelectedProject: (by: ISelectedProject) => set({ selectProject: by })
});
