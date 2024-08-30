import { GenericResponse } from "@/types/global/IGlobal";
import { BillingByCarrier } from "@/types/logistics/billing/billing";
import { API } from "@/utils/api/api";

export const getBillingByTransferRequest = async (
  transferRequestId: number
): Promise<BillingByCarrier[]> => {
  try {
    const { success, data }: GenericResponse<any> = await API.get(
      `/logistic-billing/ByTransferRequest/${transferRequestId}`
    );
    if (success && data?.billings) return data.billings;
    return [];
  } catch (error) {
    console.error("Error get logistic-billing/ByTransferRequest/: ", error);
    throw error as any;
  }
};
