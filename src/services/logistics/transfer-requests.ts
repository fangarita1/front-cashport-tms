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
  
  export const getTransferRequestById = async (id: string): Promise<IListData> => {
    const token = await getIdToken();
    try {
      const response: IListData = await axios.get(`${config.API_HOST}/carrier/${id}`,
        {
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