import useSWR from "swr";

import { fetcher } from "@/utils/api/api";
import { IUsers } from "@/types/users/IUsers";

interface Props {
  page?: number;
  idProject: string;
  rolesId: string[];
  zonesId: string[];
}

export const useUsers = ({ page, idProject, zonesId, rolesId }: Props) => {
  const pathKey = `/user/project/${idProject}?page=${page}${zonesId.length > 0 ? `&zone=${zonesId.join(",")}` : ""}${rolesId.length > 0 ? `${`&rol=${rolesId.join(",")}`}` : ""}`;
  const { data, error } = useSWR<IUsers>(pathKey, fetcher, {});

  return {
    data: data?.data || ([] as any),
    loading: !error && !data
  };
};
