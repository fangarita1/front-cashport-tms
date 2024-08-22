import { fetcher } from "@/utils/api/api";
import { IViewClientsTable } from "@/types/clients/IViewClientsTable";
import useSWR from "swr";
import { useAppStore } from "@/lib/store/store";

interface Props {
  page?: number;
  limit?: number;
  holding?: number;
  searchQuery?: string;
  client_group?: number;
}

export const usePortfolios = ({ page, limit = 50, holding, searchQuery, client_group }: Props) => {
  const { ID } = useAppStore((state) => state.selectedProject);

  const buildQueryString = () => {
    const params = new URLSearchParams({
      page: page?.toString() || "1",
      limit: limit.toString()
    });

    if (holding) params.append("holding", holding.toString());
    if (searchQuery) params.append("searchQuery", searchQuery);
    if (client_group) params.append("client_group", client_group.toString());

    return params.toString();
  };

  const pathKey = `/portfolio/client/project/${ID}?${buildQueryString()}`;
  const { data, isLoading, error } = useSWR<IViewClientsTable>(pathKey, fetcher);

  return {
    data,
    loading: isLoading,
    error
  };
};
