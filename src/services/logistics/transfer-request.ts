import { GenericResponsePage } from "@/types/global/IGlobal";
import {
  ITrackingPartial,
  ITransferOrdersRequest,
  ITransferRequestCreation,
  IVehiclesPricingList
} from "@/types/logistics/schema";
import { API } from "@/utils/api/api";

{
  /*export const transferOrderMerge = async (orders: number[]) => {
  try {
    const response: AxiosResponse = await API.post(`/transfer-order/merge`, orders);
    return response;
  } catch (error) {
    return error as any;
  }
};*/
}

export const transferOrderMerge = async (
  ordersId: number[]
): Promise<GenericResponsePage<ITransferOrdersRequest>> => {
  const response: GenericResponsePage<ITransferOrdersRequest> = await API.post(
    `/transfer-order/merge`,
    { orders: ordersId }
  );
  return response;
};

export const createTransferRequest = async (
  transferOrderIds: number[],
  trackingPartial: ITrackingPartial[]
): Promise<GenericResponsePage<ITransferRequestCreation>> => {
  const response: GenericResponsePage<ITransferRequestCreation> = await API.post(
    `/transfer-request/create`,
    { transferOrderIds, trackingPartial }
  );
  return response;
};

export const getTransferRequestVehicles = async (
  id_journey: number
): Promise<GenericResponsePage<any>> => {
  const response: GenericResponsePage<any> = await API.get(
    `/transfer-request/vehicles/${id_journey}`
  );
  return response;
};

export const getTransferRequestSteps = async (
  transfer_request: number
): Promise<GenericResponsePage<ITransferRequestCreation>> => {
  const response: GenericResponsePage<ITransferRequestCreation> = await API.get(
    `/transfer-request/steps/6`
  );
  return response;
};