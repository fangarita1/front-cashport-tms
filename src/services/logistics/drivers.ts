import axios, { AxiosResponse } from "axios";
import config from "@/config";
import { getIdToken } from "@/utils/api/api";
import { IListData } from "@/types/logistics/schema";

export const getAllDrivers = async (): Promise<IListData> => {
  try {
    const response: IListData = await axios.get(`${config.API_HOST}/driver/all`, {
      headers: {
        Accept: "application/json, text/plain, */*",
      }
    });
    return response;
  } catch (error) {
    console.log("Error get all Drivers: ", error);
    return error as any;
  }
};
