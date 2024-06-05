import axios, { AxiosError, AxiosResponse } from "axios";
import config from "@/config";
import { API, getIdToken } from "@/utils/api/api";

import { SUCCESS } from "@/utils/constants/globalConstants";
import { MessageInstance } from "antd/es/message/interface";

export const addClientType = async (
  name: string,
  project_id: number,
  messageApi: MessageInstance
) => {
  try {
    const response: AxiosResponse = await API.post(`/client/types`, {
      name,
      project_id
    });
    if (response.status === SUCCESS) {
      messageApi.open({
        type: "success",
        content: `Tipo de  fue cliente creado exitosamente.`
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

export const addDocumentsClientType = async (formData: FormData, messageApi: MessageInstance) => {
  const token = await getIdToken();

  try {
    const response: AxiosResponse | AxiosError = await axios.post(
      `${config.API_HOST}/client/documents`,
      formData,
      {
        headers: {
          Accept: "application/json, text/plain, */*",
          Authorization: `Bearer ${token}`
        }
      }
    );
    if (response.status === SUCCESS) {
      messageApi.open({
        type: "success",
        content: "Tipo de Documento creado exitosamente."
      });
    } else {
      messageApi.open({
        type: "error",
        content: "Oops ocurrio un error creando tipo de documento."
      });
    }
    return response;
  } catch (error) {
    console.log("Error creando tipo de documento: ", error);
    return error as AxiosError;
  }
};

export const removeDocumentsClientType = async (id: number, messageApi?: MessageInstance) => {
  try {
    const response: AxiosResponse = await API.delete(`/client/documents/${id}`);
    if (response.status === SUCCESS) {
      messageApi?.open({
        type: "success",
        content: "Tipo de Documento eliminado exitosamente."
      });
    } else {
      messageApi?.open({
        type: "error",
        content: "Oops ocurrio un error eliminando tipo de documento."
      });
    }
    return response;
  } catch (error) {
    console.log("Error eliminando tipo de documento: ", error);
    return error as AxiosError;
  }
};
