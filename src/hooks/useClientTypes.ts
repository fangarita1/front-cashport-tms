import { useAppStore } from "@/lib/store/store";
import { addClientType, addDocumentsClientType } from "@/services/clientTypes/clientTypes";
import { IClientTypes } from "@/types/clientTypes/clientTypes";
import { API } from "@/utils/api/api";
import { MessageInstance } from "antd/es/message/interface";
import useSWR from "swr";

export const useClientTypes = () => {
  const { ID: projetId } = useAppStore((state) => state.selectProject);
  const { data, isLoading, mutate } = useSWR<IClientTypes>(
    `/client/types/project/${projetId}`,
    API
  );

  const addClient = async (clientTypeName: string, messageApi: MessageInstance) => {
    await addClientType(clientTypeName, projetId, messageApi);
    mutate();
  };

  const addDocument = async (formData: FormData, messageApi: MessageInstance) => {
    await addDocumentsClientType(formData, messageApi);
    mutate();
  };

  return {
    data: data?.data,
    loading: isLoading,
    addClient,
    addDocument
  };
};
