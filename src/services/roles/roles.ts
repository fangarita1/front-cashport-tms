import config from "@/config";
import { IRoles } from "@/types/roles/IRoles";
import { getIdToken } from "@/utils/api/api";
import axios, { AxiosResponse } from "axios";

export const getAllRoles = async (): Promise<AxiosResponse<IRoles>> => {
  const token = await getIdToken();
  try {
    const response: AxiosResponse<IRoles> = await axios.get(`${config.API_HOST}/role`, {
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
