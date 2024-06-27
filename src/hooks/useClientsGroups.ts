import useSWR from "swr";
import { fetcher } from "@/utils/api/api";
import { IClientsGroups, IClientsGroupsFull } from "@/types/clientsGroups/IClientsGroups";

interface Props {
  page?: number;
  idProject: string;
  clients?: any[];
  subscribers?: any[];
  activeUsers?: "all" | "active" | "inactive";
}

export const useClientsGroups = ({ page, idProject, clients, subscribers, activeUsers }: Props) => {
  const clientsQuery = (clients?.length ?? 0) > 0 ? `&zone=${clients?.join(",")}` : "";
  const subsQuery = (subscribers?.length ?? 0) > 0 ? `&rol=${subscribers?.join(",")}` : "";

  const statusQuery =
    activeUsers === "active" || activeUsers === "inactive"
      ? `&active=${activeUsers === "active" ? 1 : 0}`
      : "";

  const pageQuery = page ? `&page=${page}` : "";

  const pathKey = `/group-client/?project_id=${idProject}${pageQuery}${clientsQuery}${subsQuery}${statusQuery}`;

  const { data, error, isLoading } = useSWR<IClientsGroupsFull>(pathKey, fetcher, {});

  return {
    data: data,
    loading: isLoading,
    error
  };
};
