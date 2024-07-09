import axios, { AxiosResponse } from "axios";
import config from "@/config";
import { getIdToken } from "@/utils/api/api";
import { IDriver, IListData } from "@/types/logistics/schema";

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

export const getDriverById = async (id: string): Promise<IListData> => {
  try {
    const response: IListData = await axios.get(`${config.API_HOST}/driver/driver/${id}`, {
      headers: {
        Accept: "application/json, text/plain, */*",
      }
    });
    return response;
  } catch (error) {
    console.log("Error get Driver: ", error);
    return error as any;
  }
};

export const updateDriver = async (data: IDriver): Promise<IListData> => {
  try {
    const response: IListData = await axios.put(`${config.API_HOST}/driver/update`, data ,{
      headers: {
        Accept: "application/json, text/plain, */*",
      }
    });
    return response;
  } catch (error) {
    console.log("Error get Driver: ", error);
    return error as any;
  }
};

export const addDriver = async (data: IDriver): Promise<IListData> => {
  try {
    const response: IListData = await axios.post(`${config.API_HOST}/driver/create`,data ,{
      headers: {
        Accept: "application/json, text/plain, */*",
      }
    });
    return response;
  } catch (error) {
    console.log("Error get Driver: ", error);
    return error as any;
  }
};