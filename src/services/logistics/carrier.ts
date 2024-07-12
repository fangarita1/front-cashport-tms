import axios, { AxiosResponse } from "axios";
import config from "@/config";
import { IListData } from "@/types/logistics/schema";

export const getAllCarriers = async (): Promise<IListData> => {
  try {
    const response: IListData = await axios.get(`${config.API_HOST}/carrier/all`, {
      headers: {
        Accept: "application/json, text/plain, */*",
      }
    });
    return response;
  } catch (error) {
    console.log("Error get all carriers: ", error);
    return error as any;
  }
};

export const getCarrierById = async (id: string): Promise<IListData> => {
  try {
    const response: IListData = await axios.get(`${config.API_HOST}/carrier/${id}`, {
      headers: {
        Accept: "application/json, text/plain, */*"
      }
    });
    return response;
  } catch (error) {
    console.log("Error get Driver: ", error);
    return error as any;
  }
};
