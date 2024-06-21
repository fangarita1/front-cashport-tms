import { fetcher } from "@/utils/api/api";
import { IViewClientsTable } from "@/types/clients/IViewClientsTable";
import useSWR from "swr";
import { useAppStore } from "@/lib/store/store";

export const usePortfolios = () => {
  const { ID } = useAppStore((state) => state.selectProject);
  const { data, isLoading } = useSWR<IViewClientsTable>(`/portfolio/client/project/${ID}`, fetcher);

  return {
    data: data?.data,
    loading: isLoading
  };
};
