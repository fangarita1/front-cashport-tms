import config from "@/config";
import {
  DiscountRequestBody,
  GetMotivesResponse
} from "@/types/accountingAdjustment/IAccountingAdjustment";
import { API, getIdToken } from "@/utils/api/api";
import { AxiosResponse } from "axios";

export const createAccountingAdjustment = async (
  requestBody: DiscountRequestBody
): Promise<AxiosResponse<any>> => {
  const token = await getIdToken();
  try {
    const response: AxiosResponse<any> = await API.post(
      `${config.API_HOST}/project/${requestBody.project_id}/client/${requestBody.client_id}`,
      requestBody,
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

export const getMotives = async (): Promise<AxiosResponse<GetMotivesResponse>> => {
  const token = await getIdToken();

  try {
    const response: AxiosResponse<GetMotivesResponse> = await API.get(
      `${config.API_HOST}/motives`,
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
