import config from "@/config";
import {
  CreateIncidentResponse,
  dataConcilation,
  IInvoiceIncident
} from "@/types/concilation/concilation";
import { getIdToken } from "@/utils/api/api";
import axios, { AxiosResponse } from "axios";

export const invoiceConciliation = async (
  files: File[],
  clientId: number,
  projectId: number
): Promise<dataConcilation> => {
  const token = await getIdToken();

  const formData = new FormData();

  files.forEach((file) => {
    formData.append("files", file);
  });
  formData.append("client_id", clientId.toString());
  formData.append("project_id", projectId.toString());

  const response: AxiosResponse<dataConcilation> = await axios.post(
    `${config.API_HOST}/massive-action/invoice-conciliation`,
    formData,
    {
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`
      }
    }
  );

  return response.data;
};

export const invoiceCreateIncident = async (
  files: File[],
  invoices: IInvoiceIncident[],
  comments: string,
  clientId: number
): Promise<CreateIncidentResponse> => {
  const token = await getIdToken();

  const formData = new FormData();
  files.forEach((file) => {
    formData.append("files", file);
  });
  formData.append("invoices", JSON.stringify(invoices));
  formData.append("comments", comments);
  formData.append("client_id", clientId.toString());

  const response: AxiosResponse<CreateIncidentResponse> = await axios.post(
    `${config.API_HOST}/massive-action/invoice-create-incident`,
    formData,
    {
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`
      }
    }
  );

  return response.data;
};
