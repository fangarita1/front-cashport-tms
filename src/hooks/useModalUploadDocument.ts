import { useAppStore } from "@/lib/store/store";
import { IDocumentsByClientId } from "@/types/documentsByClientId/IDocumentsByClientId";
import { API } from "@/utils/api/api";
import useSWR from "swr";

const useModalUploadDocument = (clientTypeId: string | number | undefined) => {
  const { ID } = useAppStore((state) => state.selectedProject);

  const { data, isLoading, error } = useSWR<IDocumentsByClientId>(
    `/client/documents/bytype/${clientTypeId}/project/${ID}`,
    API
  );

  return { data, isLoading, error };
};

export default useModalUploadDocument;
