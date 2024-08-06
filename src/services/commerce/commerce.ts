import { GenericResponse } from "@/types/global/IGlobal";
import { API } from "@/utils/api/api";
import {
  IConfirmOrderData,
  ICreateOrderData,
  IEcommerceClient,
  IOrderConfirmedResponse,
  IProductData
} from "@/types/commerce/ICommerce";

export const getClients = async (projectId: number) => {
  const response: GenericResponse<IEcommerceClient[]> = await API.get(
    `/marketplace/projects/${projectId}/clients`
  );
  return response;
};

export const getProductsByClient = async (projectId: number, clientId: number) => {
  const response: GenericResponse<IProductData[]> = await API.get(
    `/marketplace/projects/${projectId}/clients/${clientId}/products`
  );
  return response;
};

export const getAdresses = async (projectId: number, clientId: number) => {
  const response: GenericResponse<any> = await API.get(
    `/marketplace/clients/${clientId}/other-addresses`
  );
  return response;
};

export const confirmOrder = async (
  projectId: number,
  clientId: number,
  data: IConfirmOrderData
) => {
  try {
    const response: GenericResponse<IOrderConfirmedResponse> = await API.post(
      `/marketplace/projects/${projectId}/clients/${clientId}/order-confirmation`,
      data
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const createOrder = async (projectId: number, clientId: number, data: ICreateOrderData) => {
  const response: GenericResponse<[]> = await API.post(
    `/marketplace/projects/${projectId}/clients/${clientId}/create-order`,
    data
  );
  return response;
};
