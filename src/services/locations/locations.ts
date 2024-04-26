import axios, { AxiosResponse } from "axios";
import config from "@/config";
import { getIdToken } from "@/utils/api/api";

export const createLocation = async (data: any): Promise<any> => {
  console.log("dataCreateLoc: ", data);
  const modelData = {
    address: data.address,
    city: data.city,
    nit: data.nit,
    position: {}
  };

  const token = await getIdToken();

  try {
    const response: AxiosResponse = await axios.post(`${config.API_HOST}/location`, modelData, {
      headers: {
        Accept: "application/json, text/plain, */*",
        Authorization: `Bearer ${token}`
      }
    });
    return response;
  } catch (error) {
    console.log("Error creating new client: ", error);
    return error as any;
  }
};
