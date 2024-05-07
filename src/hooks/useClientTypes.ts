import { addClientType, addDocumentsClientType } from "@/services/clientTypes/clientTypes";
import { IClientTypes } from "@/types/clientTypes/clientTypes";
import { fetcher } from "@/utils/api/api";
import { MessageInstance } from "antd/es/message/interface";
import useSWR from "swr";

export const useClientTypes = () => {
  const { data, isLoading, mutate } = useSWR<IClientTypes>("/client/types", fetcher);

  const addClient = async (clientTypeName: string, messageApi: MessageInstance) => {
    await addClientType(clientTypeName, messageApi);
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
