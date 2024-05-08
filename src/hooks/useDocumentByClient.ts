import useSWR from "swr";
import { IDocumentsByClientId } from "@/types/documentsByClientId/IDocumentsByClientId";
import { fetcher } from "@/utils/api/api";

export const useDocumentByClient = (clientTypeId: number) => {
  const { data, isLoading } = useSWR<IDocumentsByClientId>(
    `/client/documents/bytype/${clientTypeId}`,
    fetcher,
    {}
  );

  return {
    data,
    isLoading
  };
};
