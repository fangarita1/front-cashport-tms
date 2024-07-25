import { useAppStore } from "@/lib/store/store";
import { addClientType, removeClientType } from "@/services/clientTypes/clientTypes";
import { IClientTypes } from "@/types/clientTypes/clientTypes";
import { API } from "@/utils/api/api";
import { MessageInstance } from "antd/es/message/interface";
import useSWR from "swr";

export const useClientTypes = () => {
  const { ID: projetId } = useAppStore((state) => state.selectedProject);
  const { data, isLoading, mutate } = useSWR<IClientTypes>(
    `/client/types/project/${projetId}`,
    API
  );

  const addClient = async (clientTypeName: string, messageApi: MessageInstance) => {
    await addClientType(clientTypeName, projetId, messageApi);
    mutate();
  };

  const removeClient = async (id: number, messageApi: MessageInstance) => {
    await removeClientType(id, messageApi);
    mutate();
  };

  return {
    data: data?.data,
    loading: isLoading,
    addClient,
    removeClient
  };
};
