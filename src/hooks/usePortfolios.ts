import { fetcher } from "@/utils/api/api";
import { IViewClientsTable } from "@/types/clients/IViewClientsTable";
import useSWR from "swr";
import { useAppStore } from "@/lib/store/store";

interface Props {
  page?: number;
  limit?: number;
  holding?: string[];
  searchQuery?: string;
  client_group?: string[];
}

export const usePortfolios = ({
  page = 1,
  limit = 450,
  holding,
  searchQuery,
  client_group
}: Props) => {
  const { ID } = useAppStore((state) => state.selectedProject);

  const pageQuery = `page=${page}`;
  const limitQuery = `&limit=${limit}`;
  const holdingQuery = holding && holding.length > 0 ? `&holding=${holding.join(",")}` : "";
  const searchQueryParam = searchQuery
    ? `&searchQuery=${encodeURIComponent(searchQuery.toLowerCase().trim())}`
    : "";
  const clientGroupQuery =
    client_group && client_group.length > 0 ? `&client_group=${client_group.join(",")}` : "";

  const pathKey = `/portfolio/client/project/${ID}?${pageQuery}${limitQuery}${holdingQuery}${searchQueryParam}${clientGroupQuery}`;

  const { data, error } = useSWR<IViewClientsTable>(pathKey, fetcher);

  return {
    data,
    loading: !error && !data,
    error
  };
};
