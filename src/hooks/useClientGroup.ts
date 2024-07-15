import config from "@/config";
import { useAppStore } from "@/lib/store/store";
import { updateGroup } from "@/services/groupClients/groupClients";
import { ISingleClientGroupResponse } from "@/types/clientsGroups/IClientsGroups";
import { fetcher } from "@/utils/api/api";
import useSWR from "swr";

export const useClientGroup = (groupId: number) => {
  const { ID: projectId } = useAppStore((state) => state.selectProject);

  const pathKey = `${config.API_HOST}/group-client/${groupId}/project/${projectId}`;

  const { data, error, isLoading, mutate } = useSWR<ISingleClientGroupResponse>(
    pathKey,
    fetcher,
    {}
  );

  const updateClientsGroup = async (clients: string[]) => {
    console.log("modelDataPUT:", data);
    await updateGroup(groupId, clients, projectId);
    mutate();
  };

  return {
    data: data,
    loading: isLoading,
    error,
    updateClientsGroup
  };
};
