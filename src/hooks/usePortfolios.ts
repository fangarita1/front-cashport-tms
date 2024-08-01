import { fetcher } from "@/utils/api/api";
import { IViewClientsTable } from "@/types/clients/IViewClientsTable";
import useSWR from "swr";
import { useAppStore } from "@/lib/store/store";

interface Props {
  page?: number;
}
export const usePortfolios = ({ page }: Props) => {
  const { ID } = useAppStore((state) => state.selectedProject);
  const limit = 250;
  const pathKey = `/portfolio/client/project/${ID}?page=${page}&limit=${limit}`;
  const { data, isLoading } = useSWR<IViewClientsTable>(pathKey, fetcher);

  return {
    data: data,
    loading: isLoading
  };
};
