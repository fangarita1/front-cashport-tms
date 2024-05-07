import axios, { AxiosError, AxiosResponse } from "axios";
import config from "@/config";
import { getIdToken } from "@/utils/api/api";

import { SUCCESS } from "@/utils/constants/globalConstants";
import { MessageInstance } from "antd/es/message/interface";
import { ICreateDocumentByClient } from "@/types/clientTypes/clientTypes";

export const addClientType = async (name: string, messageApi: MessageInstance) => {
  const token = await getIdToken();

  try {
    const response: AxiosResponse = await axios.post(
      `${config.API_HOST}/client/types`,
      { name },
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

export const addDocumentsClientType = async () => {
  const modelData: ICreateDocumentByClient = {
    client_type: 4,
    required: 1,
    document_name: "ddd",
    template: undefined
  };

  const formData = new FormData();
  // Agregar los campos del modelo de datos al objeto FormData
  Object.keys(modelData).forEach((key) => {
    if (modelData[key] !== undefined && modelData[key] !== null && modelData[key] !== "") {
      if (modelData[key] instanceof File) {
        formData.append("documents", modelData[key]);
      } else {
        formData.append(key, modelData[key]);
      }
    }
  });

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

    return response;
  } catch (error) {
    console.log("Error creating new client: ", error);
    return error as AxiosError;
  }
};
