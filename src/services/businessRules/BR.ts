import config from "@/config";
import { IBRE } from "@/types/bre/IBRE";
import { getIdToken } from "@/utils/api/api";
import axios, { AxiosResponse } from "axios";

export const getBusinessRulesByProjectId = async (
  idProject: number
): Promise<AxiosResponse<IBRE>> => {
  const token = await getIdToken();
  try {
    const response: AxiosResponse<IBRE> = await axios.get(
      `${config.API_HOST}/bussines-rule/project/${idProject}`,
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
