import config from "@/config";
import { IListCountries } from "@/types/countries/IListCountries";
import { getIdToken } from "@/utils/api/api";
import axios from "axios";

export const getAllCountries = async (): Promise<IListCountries> => {
  const token = await getIdToken();
  try {
    const response: IListCountries = await axios.get(`${config.API_HOST}/country`, {
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json; charset=utf-8",
        Authorization: `Bearer ${token}`
      }
    });
    return response;
  } catch (error) {
    return error as any;
  }
};
