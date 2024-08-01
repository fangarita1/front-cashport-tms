import { IProject } from "@/types/projects/IProjects";

export type ISelectedProject = {
  ID: number;
  NAME: string;
  LOGO: string;
};
export interface ProjectSlice {
  projects: IProject[];
  selectedProject: ISelectedProject;
  projectsBasicInfo: ISelectedProject[];
  // eslint-disable-next-line no-unused-vars
  setProjects: (by: IProject[]) => void;
  // eslint-disable-next-line no-unused-vars
  setSelectedProject: (by: ISelectedProject) => void;
  // eslint-disable-next-line no-unused-vars
  setProjectsBasicInfo: (by: ISelectedProject[]) => void;
}

export const createProjectSlice = (set: any): ProjectSlice => ({
  projects: [],
  selectedProject: {} as ISelectedProject,
  projectsBasicInfo: [],
  setProjects: (by: IProject[]) => set({ projects: by }),
  setSelectedProject: (by: ISelectedProject) => set({ selectedProject: by }),
  setProjectsBasicInfo: (by: ISelectedProject[]) => set({ projectsBasicInfo: by })
});
