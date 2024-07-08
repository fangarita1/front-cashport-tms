import axios, { AxiosResponse } from "axios";
import config from "@/config";
import { IListData } from "@/types/logistics/schema";

export const getAllVehicles = async (): Promise<IListData> => {
  try {
    const response: IListData = await axios.get(`${config.API_HOST}/vehicle/all`, {
      headers: {
        Accept: "application/json, text/plain, */*",
      }
    });
    return response;
  } catch (error) {
    console.log("Error get all vehicles: ", error);
    return error as any;
  }
};
