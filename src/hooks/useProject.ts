import useSWR from "swr";

import { fetcher } from "@/utils/api/api";
import { IProjectById } from "@/types/projects/IProject";
import { useEffect } from "react";
import { useAppStore } from "@/lib/store/store";
import { ISelectedProject } from "@/lib/slices/createProjectSlice";

interface Props {
  id: string;
}

export const useProject = ({ id }: Props) => {
  const { projectsBasicInfo, setSelectedProject } = useAppStore((state) => state);
  const { data, isLoading } = useSWR<IProjectById>(`/project/${id}`, fetcher);

  useEffect(() => {
    if (!data?.data[0] || !projectsBasicInfo) return;

    const selectedProject = projectsBasicInfo?.find((project) => project.ID === data.data[0].ID);
    if (selectedProject) {
      const projectInfo: ISelectedProject = {
        ID: selectedProject.ID,
        NAME: selectedProject.NAME,
        LOGO: selectedProject.LOGO,
        views_permissions: selectedProject.views_permissions,
        action_permissions: selectedProject.action_permissions,
        isSuperAdmin: selectedProject.isSuperAdmin
      };
      setSelectedProject(projectInfo);
    } else {
      console.warn(`Project with ID: ${id} not found in fetched projects`);
    }
  }, [data, projectsBasicInfo, setSelectedProject]);

  return {
    data: data?.data[0] || ([] as any),
    loading: isLoading
  };
};
