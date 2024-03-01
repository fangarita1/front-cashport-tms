import config from "@/config";
import { IListCurrencies } from "@/types/currencies/IListCurrencies";
import { getIdToken } from "@/utils/api/api";
import axios, { AxiosResponse } from "axios";

export const getAllCurrencies = async (): Promise<AxiosResponse<IListCurrencies>> => {
  const token = await getIdToken();
  try {
    const response: AxiosResponse<IListCurrencies> = await axios.get(
      `${config.API_HOST}/currency`,
      {
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json; charset=utf-8",
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response;
  } catch (error) {
    return error as any;
  }
};
