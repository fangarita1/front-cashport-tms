import config from "@/config";
import { API, getIdToken } from "@/utils/api/api";
import { CREATED, SUCCESS } from "@/utils/constants/globalConstants";
import { MessageInstance } from "antd/es/message/interface";
import axios, { AxiosResponse } from "axios";

export interface IHoldingResponse {
  status: number;
  message: string;
  data: Array<{
    id: number;
    name: string;
  }>;
}

export const addHolding = async ({
  name,
  projectId,
  messageApi
}: {
  name: string;
  projectId: number;
  messageApi: MessageInstance;
}): Promise<AxiosResponse<any>> => {
  try {
    const response: AxiosResponse<any> = await API.post(`/holding`, {
      name,
      project_id: projectId
    });
    if (response.status === CREATED) {
      messageApi.open({
        type: "success",
        content: `El holding fue creado exitosamente.`
      });
    } else {
      messageApi.open({
        type: "error",
        content: "Oops ocurrio un error."
      });
    }

    return response;
  } catch (error) {
    return error as any;
  }
};

export const removeHoldingById = async ({
  idHolding,
  messageApi
}: {
  idHolding: string;
  messageApi: MessageInstance;
}): Promise<AxiosResponse<any>> => {
  const token = await getIdToken();
  try {
    const response: AxiosResponse<any> = await axios.delete(
      `${config.API_HOST}/holding/${idHolding}`,
      {
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json; charset=utf-8",
          Authorization: `Bearer ${token}`
        }
      }
    );
    if (response.status === SUCCESS) {
      messageApi.open({
        type: "success",
        content: `El holding fue eliminado exitosamente.`
      });
    } else {
      messageApi.open({
        type: "error",
        content: "Oops ocurrio un error."
      });
    }

    return response;
  } catch (error) {
    return error as any;
  }
};


export const getHoldingsByProjectId = async (
  projectId: number
): Promise<AxiosResponse<IHoldingResponse>> => {
  const token = await getIdToken();
  try {
    const response: AxiosResponse<IHoldingResponse> = await axios.get(
      `${config.API_HOST}/holding/project/${projectId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response;
  } catch (error) {
    return error as any;
  }
};
