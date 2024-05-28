import useSWR from "swr";
import { IDocumentsByClientId } from "@/types/documentsByClientId/IDocumentsByClientId";
import { API } from "@/utils/api/api";
import { useAppStore } from "@/lib/store/store";

export const useDocumentByClient = (clientTypeId: number) => {
  const { ID } = useAppStore((state) => state.selectProject);
  const { data, isLoading } = useSWR<IDocumentsByClientId>(
    `/client/documents/bytype/${clientTypeId}/project/${ID}`,
    API
  );

  return {
    data,
    isLoading
  };
};
