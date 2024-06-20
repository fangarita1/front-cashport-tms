import axios, { AxiosResponse } from "axios";
import config from "@/config";
import { getIdToken } from "@/utils/api/api";
import { ILocation } from "@/types/logistics/schema";

export const getAllLocations = async (): Promise<ILocation> => {
  const token = await getIdToken();
  try {
    const response: ILocation = await axios.get(`${config.API_HOST}/logistic-location/all/locations`, {
      headers: {
        Accept: "application/json, text/plain, */*",
        Authorization: `Bearer ${token}`
      }
    });
    return response;
  } catch (error) {
    console.log("Error creating new location: ", error);
    return error as any;
  }
};
