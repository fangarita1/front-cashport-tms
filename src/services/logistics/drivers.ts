import axios, { AxiosResponse } from "axios";
import config from "@/config";
import { getIdToken } from "@/utils/api/api";
import { IListData } from "@/types/logistics/schema";

export const getAllDrivers = async (): Promise<any> => {
  const token = await getIdToken();
  try {
    const response = await axios.get(`${config.API_HOST}/driver/all`, {
      headers: {
        Accept: "application/json, text/plain, */*",
        Authorization: `Bearer ${token}`
      }
    });
    return response;
  } catch (error) {
    console.log("Error get all drivers: ", error);
    return error as any;
  }
};
