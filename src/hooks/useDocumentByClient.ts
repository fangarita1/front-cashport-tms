import useSWR from "swr";
import { IDocumentsByClientId } from "@/types/documentsByClientId/IDocumentsByClientId";
import { API } from "@/utils/api/api";
import { useAppStore } from "@/lib/store/store";
import {
  addDocumentsClientType,
  removeDocumentsClientType
} from "@/services/clientTypes/clientTypes";
import { MessageInstance } from "antd/es/message/interface";

export const useDocumentByClient = (clientTypeId: number) => {
  const { ID } = useAppStore((state) => state.selectedProject);
  const { data, isLoading, mutate } = useSWR<IDocumentsByClientId>(
    `/client/documents/bytype/${clientTypeId}/project/${ID}`,
    API
  );

  const addDocument = async (formData: FormData, messageApi: MessageInstance) => {
    await addDocumentsClientType(formData, messageApi);
    mutate();
  };

  const removeDocument = async (id: number, messageApi?: MessageInstance) => {
    await removeDocumentsClientType(id, messageApi);
    mutate();
  };

  return {
    data,
    removeDocument,
    addDocument,
    isLoading
  };
};
