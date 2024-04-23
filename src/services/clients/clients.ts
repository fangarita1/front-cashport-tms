import axios, { AxiosResponse } from "axios";
import config from "@/config";
import { getIdToken } from "@/utils/api/api";
import { IClientAxios } from "@/types/clients/IClients";

// create

export const createClient = async (data: any): Promise<any> => {
  const modelData = {
    // QUE DATA NECESITO PARA CREAR UN CLIENTE?
    nit: data.number,
    project_id: data.project_id,
    client_name: data.client_name,
    business_name: data.business_name,
    phone: data.phone,
    condition_payment: data.condition_payment,
    email: data.email,
    billing_period: data.billing_period,
    radication_type: data.radication_type,
    document_type: data.document_type,
    locations: data.locations,
    documents: data.documents,
    client_type_id: data.client_type_id
  };

  const token = await getIdToken();

  try {
    const response: AxiosResponse = await axios.post(`${config.API_HOST}/client`, modelData, {
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json; charset=utf-8",
        Authorization: `Bearer ${token}`
      }
    });
    return response;
  } catch (error) {
    console.log("Error creating new client: ", error);
    return error as any;
  }
};

export const getClientById = async (idUser: string, projectId: string): Promise<IClientAxios> => {
  const token = await getIdToken();
  try {
    const response: IClientAxios = await axios.get(
      `${config.API_HOST}/client/${idUser}/project/${projectId}`,
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
    console.log("Error getting client by Id: ", error);
    return error as any;
  }
};
