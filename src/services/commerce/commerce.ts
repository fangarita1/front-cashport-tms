import { GenericResponse } from "@/types/global/IGlobal";
import { API } from "@/utils/api/api";
import { IEcommerceClient } from "@/types/commerce/ICommerce";

export const getClients = async (projectId: number) => {
  const response: GenericResponse<IEcommerceClient[]> = await API.get(
    `/marketplace/projects/${projectId}/clients`
  );
  return response;
};
