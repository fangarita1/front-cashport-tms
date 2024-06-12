import axios, { AxiosResponse } from "axios";
import config from "@/config";
import { getIdToken } from "@/utils/api/api";
import { ICreateLocation } from "@/types/locations/ILocations";
import { CREATED } from "@/utils/constants/globalConstants";
import { MessageInstance } from "antd/es/message/interface";

export const createLocation = async (data: any, clientId: number): Promise<any> => {
  const modelData: any = {
    address: data.address,
    city: data.city,
    nit: data.nit ? data.nit : `${clientId}`,
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
    console.log("Error creating new location: ", error);
    return error as any;
  }
};

export const addAddressToLocation = async (
  data: any,
  projectId: number,
  messageApi: MessageInstance
): Promise<any> => {
  const modelData: ICreateLocation = {
    address: data.address,
    city: data.id,
    complement: data.complement,
    project_id: projectId
  };

  const token = await getIdToken();

  try {
    const response: AxiosResponse = await axios.post(`${config.API_HOST}/location`, modelData, {
      headers: {
        Accept: "application/json, text/plain, */*",
        Authorization: `Bearer ${token}`
      }
    });

    if (response.status === CREATED) {
      messageApi.open({
        type: "success",
        content: `Direccion añadida exitosamente.`
      });
    } else {
      messageApi.open({
        type: "error",
        content: "Oops ocurrio un error."
      });
    }
    return response;
  } catch (error) {
    console.log("Error creating new location: ", error);
    return error as any;
  }
};
