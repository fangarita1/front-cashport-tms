import { GenericResponse } from "@/types/global/IGlobal";
import { ITransferJourney } from "@/types/transferJourney/ITransferJourney";
import { API } from "@/utils/api/api";

export const getTransferJourney = async (transferRequestId: number): Promise<ITransferJourney[]> => {
  try {
    const { success, data }: GenericResponse<ITransferJourney[]> = await API.get(`/transfer-request/journey/${transferRequestId}`);
    if (success) return data;
    return [];
  } catch (error) {
    console.error("Error get request/journey/:transferRequestId/: ", error);
    throw error as any;
  }
}