import config from "@/config";
import { getIdToken } from "@/utils/api/api";
import axios from "axios";

export const inviteUser = async (data: any): Promise<any> => {
  const token = await getIdToken();
  try {
    const response: any = await axios.post(`${config.API_HOST}/user/invitation/user/email`, data, {
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
