import config from "@/config";
import { IZones } from "@/types/zones/IZones";
import { getIdToken } from "@/utils/api/api";
import { SUCCESS } from "@/utils/constants/globalConstants";
import { MessageInstance } from "antd/es/message/interface";
import axios, { AxiosResponse } from "axios";

export const getAllZones = async ({
  idProject
}: {
  idProject: string;
}): Promise<AxiosResponse<IZones>> => {
  const token = await getIdToken();
  try {
    const response: AxiosResponse<IZones> = await axios.get(
      `${config.API_HOST}/zone/project/${idProject}`,
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

export const addZone = async ({
  name,
  project_id,
  messageApi
}: {
  name: string;
  project_id: string;
  messageApi: MessageInstance;
}): Promise<AxiosResponse<any>> => {
  const token = await getIdToken();
  try {
    const response: AxiosResponse<any> = await axios.post(
      `${config.API_HOST}/zone/`,
      { zone_description: name, project_id },
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
        content: `La zona fue creada exitosamente.`
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

export const removeZoneById = async ({
  idZone,
  messageApi
}: {
  idZone: string;
  messageApi: MessageInstance;
}): Promise<AxiosResponse<any>> => {
  const token = await getIdToken();
  try {
    const response: AxiosResponse<any> = await axios.delete(`${config.API_HOST}/zone/${idZone}`, {
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json; charset=utf-8",
        Authorization: `Bearer ${token}`
      }
    });
    if (response.status === SUCCESS) {
      messageApi.open({
        type: "success",
        content: `La zona fue eliminada exitosamente.`
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
