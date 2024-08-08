import { GenericResponsePage } from "@/types/global/IGlobal";
import { ITransferOrdersRequest } from "@/types/logistics/schema";
import { API } from "@/utils/api/api";
import { SUCCESS } from "@/utils/constants/globalConstants";
import { MessageInstance } from "antd/es/message/interface";
import { AxiosResponse } from "axios";

{/*export const transferOrderMerge = async (orders: number[]) => {
  try {
    const response: AxiosResponse = await API.post(`/transfer-order/merge`, orders);
    return response;
  } catch (error) {
    return error as any;
  }
};*/}

export const transferOrderMerge = async (ordersId: number[]): Promise<GenericResponsePage<ITransferOrdersRequest>> => {
  const response: GenericResponsePage<ITransferOrdersRequest> = await API.post(`/transfer-order/merge`, {orders: ordersId});
  return response;
};
