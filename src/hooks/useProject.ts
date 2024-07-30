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
  const { data, isLoading } = useSWR<IProjectById>(`/project/${id}`, fetcher);
  const setSelectProject = useAppStore((state) => state.setSelectedProject);

  useEffect(() => {
    if (!data?.data[0]) return;
    const projectInfo: ISelectedProject = {
      ID: data?.data[0].ID,
      NAME: data?.data[0].NAME,
      LOGO: data?.data[0].LOGO
    };
    setSelectProject(projectInfo);
  }, [data, setSelectProject]);

  return {
    data: data?.data[0] || ([] as any),
    loading: isLoading
  };
};
