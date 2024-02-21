import useSWR from "swr";

import { fetcher } from "@/utils/api/api";
import { IUsers } from "@/types/users/IUsers";

interface Props {
  page?: number;
  idProject: string;
}

export const useUsers = ({ page, idProject }: Props) => {
  const pathKey = `/user/project/${idProject}?page=${page}`;
  const { data, error } = useSWR<IUsers>(pathKey, fetcher, {});

  return {
    data: data?.data || ([] as any),
    loading: !error && !data
  };
};
