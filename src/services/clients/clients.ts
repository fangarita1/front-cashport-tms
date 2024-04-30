import axios, { AxiosResponse } from "axios";
import config from "@/config";
import { getIdToken } from "@/utils/api/api";
import { IClientAxios, ICreateClient, IUpdateClient } from "@/types/clients/IClients";
import { IBillingPeriodForm } from "@/types/billingPeriod/IBillingPeriod";
import { ClientFormType } from "@/components/molecules/tabs/Projects/ClientProjectForm/ClientProjectForm";
import { SUCCESS } from "@/utils/constants/globalConstants";
import { MessageInstance } from "antd/es/message/interface";

// create

export const createClient = async (
  idProject: string,
  rawData: ClientFormType,
  billingPeriod: IBillingPeriodForm,
  documents: any[],
  locationResponse: any
): Promise<any> => {
  const { infoClient: data } = rawData;
  const payment_condition = data.condition_payment?.split("-")[0].trim();
  const radication_type = data.condition_payment?.split("-")[0].trim();
  const document_type = data.document_type?.split("-")[0].trim();
  const client_type = data.client_type?.split("-")[0].trim();
  const holding = data.holding_name?.split("-")[0].trim();

  const formatLocations = JSON.stringify(new Array(locationResponse.data.data));

  const formatDocuments = documents.map((doc) => doc.originFileObj);

  const modelData: ICreateClient = {
    nit: parseInt(data.nit),
    project_id: parseInt(idProject),
    client_name: data.client_name,
    business_name: data.business_name,
    phone: data.phone,
    condition_payment: parseInt(payment_condition),
    email: data.email,
    radication_type: parseInt(radication_type),
    document_type: parseInt(document_type),
    locations: formatLocations,
    documents: formatDocuments,
    client_type_id: parseInt(client_type),
    holding_id: parseInt(holding),
    day_flag: typeof billingPeriod === "string" ? undefined : billingPeriod.day_flag,
    day: typeof billingPeriod === "string" ? undefined : billingPeriod.day
  };

  const formData = new FormData();
  // Agregar los campos del modelo de datos al objeto FormData
  Object.keys(modelData).forEach((key) => {
    if (key === "documents" && Array.isArray(modelData[key])) {
      modelData[key].forEach((file: File) => {
        formData.append("documents", file);
      });
    } else {
      formData.append(key, modelData[key]);
    }
  });

  const token = await getIdToken();

  try {
    const response: AxiosResponse = await axios.post(`${config.API_HOST}/client`, formData, {
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

export const updateClient = async (
  rawData: ClientFormType,
  idProject: string,
  locationResponse?: any,
  billingPeriod?: IBillingPeriodForm
): Promise<any> => {
  const { infoClient: data } = rawData;

  const payment_condition = data.condition_payment?.split("-")[0].trim();
  const radication_type = data.condition_payment?.split("-")[0].trim();
  const document_type = data.document_type?.split("-")[0].trim();
  const holding = data.holding_name?.split("-")[0].trim();

  const formatLocations = JSON.stringify(new Array(locationResponse?.data?.data));

  const clientId = data.nit;

  const modelData: IUpdateClient = {
    business_name: data.business_name,
    phone: data.phone,
    condition_payment: parseInt(payment_condition),
    email: data.email,
    radication_type: parseInt(radication_type),
    document_type: parseInt(document_type),
    locations: formatLocations,
    holding_id: holding ? holding : undefined,
    day_flag: typeof billingPeriod === "string" ? undefined : billingPeriod?.day_flag,
    day: typeof billingPeriod === "string" ? undefined : billingPeriod?.day
  };

  const formData = new FormData();

  Object.keys(modelData).forEach((key) => {
    if (modelData[key] !== undefined && modelData[key] !== null && modelData[key] !== "") {
      formData.append(key, modelData[key]);
    }
  });

  const token = await getIdToken();
  try {
    const response: AxiosResponse = await axios.put(
      `${config.API_HOST}/client/${clientId}/project/${idProject}`,
      modelData,
      {
        headers: {
          Accept: "application/json, text/plain, */*",
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response;
  } catch (error) {
    console.log("Error updating client: ", error);
    return error as any;
  }
};

export const deleteClientById = async (
  idUser: number,
  projectId: string,
  messageApi: MessageInstance,
  onClose: () => void
): Promise<IClientAxios> => {
  const token = await getIdToken();
  try {
    const response: IClientAxios = await axios.delete(
      `${config.API_HOST}/client/${idUser}/project/${projectId}`,
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
        content: "El Cliente fue eliminado exitosamente."
      });
      onClose();
    } else {
      messageApi.open({
        type: "error",
        content: "Oops ocurrio un error."
      });
      onClose();
    }

    return response;
  } catch (error) {
    console.log("Error deleting client by Id: ", error);
    return error as any;
  }
};
