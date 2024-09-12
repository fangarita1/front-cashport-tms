import formatDocuments from "@/components/organisms/logistics/orders/CreateOrderView/controllers/formatDocuments";
import { GenericResponse } from "@/types/global/IGlobal";
import { IDocumentsAPI } from "@/types/logistics/schema";
import { API } from "@/utils/api/api";

export const getCarrierDocumentsByMaterialsAndLocations = async (
  locationOrigin: any,
  locationDestination: any,
  materials: any[]
): Promise<IDocumentsAPI[]> => {
  try {
    const form = formatDocuments({ locationDestination, locationOrigin, materials });
    const response: GenericResponse = await API.post(`/carrier/required-documents`, form);
    return response.data;
  } catch (error) {
    console.log("Error get Certificates: ", error);
    return error as any;
  }
};
