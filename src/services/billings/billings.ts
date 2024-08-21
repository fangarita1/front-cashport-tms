import axios from "axios";

import { API, getIdToken } from "@/utils/api/api";
import config from "@/config";
import { IBillingsRequestList, IBillingDetails, IIncident, IJourney, ITripBilling } from "@/types/logistics/schema";
import { GenericResponse } from "@/types/global/IGlobal";

export const getAllBillingList = async (): Promise<IBillingsRequestList[]> => {
  try {
    const response: GenericResponse<IBillingsRequestList[]> = await API.get(`/logistic-billing/all`);
    return response.data
  } catch (error) {
    console.log("Error get all getAllBillingList: ", error);
    return error as any;
  }
};

export const getBillingDetailsById = async (id: string): Promise<IBillingDetails | undefined> => {
  try {
    const response: GenericResponse<IBillingDetails> = await API.get(`/logistic-billing/${id}`);
    if (response.data) {
      return response.data;
    } else {
      console.log(`Error: ${response.data}`);
    }
  } catch (error) {
    console.log(`Error getBillingDetailsById: `, error);
    return error as any;;
  }
};

