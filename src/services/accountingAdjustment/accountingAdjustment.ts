import config from "@/config";
import { DiscountRequestBody } from "@/types/accountingAdjustment/IAccountingAdjustment";
import { API, getIdToken } from "@/utils/api/api";
import { AxiosResponse } from "axios";

export const createAccountingAdjustment = async (
  requestBody: DiscountRequestBody
): Promise<AxiosResponse<any>> => {
  const token = await getIdToken();
  try {
    console.log("requestBody", requestBody);

    const response: AxiosResponse<any> = await API.post(
      `${config.API_HOST}/financial-discount/project/${requestBody.project_id}/client/${requestBody.client_id}`,
      requestBody,
      {
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json; charset=utf-8",
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response.data;
  } catch (error) {
    return error as any;
  }
};
