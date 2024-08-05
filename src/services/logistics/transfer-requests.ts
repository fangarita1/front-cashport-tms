import axios from "axios";

import { getIdToken } from "@/utils/api/api";
import config from "@/config";
import { IListData } from "@/types/logistics/schema";

export const getAllTransferRequestList = async (): Promise<IListData> => {
  const token = await getIdToken();
  try {
    const response: IListData = await axios.get(`${config.API_HOST}/transfer-request/list`, {
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`
      }
    });
    return response;
  } catch (error) {
    console.log("Error get all getAllTransferRequestList: ", error);
    return error as any;
  }
};

export const getAllTransferRequest = async (): Promise<IListData> => {
  const token = await getIdToken();
  try {
    const response: IListData = await axios.get(`${config.API_HOST}/transfer-request/all`, {
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`
      }
    });
    return response;
  } catch (error) {
    console.log("Error get all getAllTransferRequestList: ", error);
    return error as any;
  }
};

export const getAllTransferRequestCostCenter = async (): Promise<IListData> => {
  const token = await getIdToken();
  try {
    const response: IListData = await axios.get(
      `${config.API_HOST}/transfer-request/all/cost-center`,
      {
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response;
  } catch (error) {
    console.log("Error get all getAllTransferRequest: ", error);
    return error as any;
  }
};

export const getAllTransferRequestProduct = async (): Promise<IListData> => {
  const token = await getIdToken();
  try {
    const response: IListData = await axios.get(
      `${config.API_HOST}/transfer-request/all/product`,
      {
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response;
  } catch (error) {
    console.log("Error get all getAllTransferRequest: ", error);
    return error as any;
  }
};

export const getTransferRequestById = async (id: string): Promise<IListData> => {
  const token = await getIdToken();
  try {
    const form = new FormData();
    form.append("id", id);

    const response: IListData = await axios.post(`${config.API_HOST}/transfer-request/id`, form, {
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`
      }
    });
    return response;
  } catch (error) {
    console.log("Error get getTransferRequestById: ", error);
    return error as any;
  }
};
