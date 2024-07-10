import useSWR from "swr";
import { API, fetcher } from "@/utils/api/api";
import { IClientsGroupsFull } from "@/types/clientsGroups/IClientsGroups";
import { useAppStore } from "@/lib/store/store";
import { getOneGroup, updateGroup } from "@/services/groupClients/groupClients";

interface Props {
  page?: number;
  clients?: any[];
  subscribers?: any[];
  activeUsers?: "all" | "active" | "inactive";
  noLimit?: boolean;
}

export const useClientsGroups = ({ page, clients, subscribers, activeUsers, noLimit }: Props) => {
  const { ID: projectId } = useAppStore((state) => state.selectProject);

  const clientsQuery = (clients?.length ?? 0) > 0 ? `&zone=${clients?.join(",")}` : "";
  const subsQuery = (subscribers?.length ?? 0) > 0 ? `&rol=${subscribers?.join(",")}` : "";

  const statusQuery =
    activeUsers === "active" || activeUsers === "inactive"
      ? `&active=${activeUsers === "active" ? 1 : 0}`
      : "";

  const pageQuery = page ? `&page=${page}` : "";
  const limitQuery = noLimit ? "&noLimit=true" : "";

  const pathKey = `/group-client/?project_id=${projectId}${pageQuery}${clientsQuery}${subsQuery}${statusQuery}${limitQuery}`;

  const { data, error, isLoading, mutate } = useSWR<IClientsGroupsFull>(pathKey, fetcher, {});

  const getGroup = async (groupId: number) => {
    const response = await getOneGroup(groupId, projectId);
    return response;
  };

  const updateClientsGroup = async (data: { group_id: number; clients: string[] }) => {
    console.log("modelDataPUT:", data);

    const response = await updateGroup(data, projectId);
    mutate();
  };

  return {
    data: data,
    loading: isLoading,
    error,
    getGroup,
    updateClientsGroup
  };
};
