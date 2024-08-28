import useSWR from "swr";
import { fetcher } from "@/utils/api/api";
import { IClientsGroupsFull } from "@/types/clientsGroups/IClientsGroups";
import { useAppStore } from "@/lib/store/store";
import { changeGroupState, deleteGroups } from "@/services/groupClients/groupClients";

interface Props {
  page?: number;
  clients?: any[];
  subscribers?: any[];
  activeUsers?: "all" | "active" | "inactive";
  noLimit?: boolean;
}

export const useClientsGroups = ({ page, clients, subscribers, activeUsers, noLimit }: Props) => {
  const { ID: projectId } = useAppStore((state) => state.selectedProject);

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

  const deleteSelectedGroups = async (selectedGroups: number[]) => {
    await deleteGroups(selectedGroups, projectId);
    mutate();
  };

  const changeGroupsState = async (groups_id: number[], status: 0 | 1) => {
    await changeGroupState(groups_id, status, projectId);
    mutate();
  };

  return {
    data: data,
    loading: isLoading,
    error,
    deleteSelectedGroups,
    changeGroupsState
  };
};
