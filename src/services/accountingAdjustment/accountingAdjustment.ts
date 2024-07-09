import config from "@/config";
import { DiscountRequestBody } from "@/types/accountingAdjustment/IAccountingAdjustment";
import { API, getIdToken } from "@/utils/api/api";
import axios, { AxiosResponse } from "axios";

interface RadicationData {
  invoices_id: number[];
  radication_type: string;
  accept_date: string;
  comments: string;
}

export const createAccountingAdjustment = async (
  requestBody: DiscountRequestBody
): Promise<AxiosResponse<any>> => {
  const token = await getIdToken();
  try {
    const response: AxiosResponse<any> = await API.post(
      `${config.API_HOST}/financial-discount/project/${requestBody.project_id}/client/${requestBody.client_id}`,
      requestBody,
      {
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json; charset=utf-8",
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response.data;
  } catch (error) {
    return error as any;
  }
};
export const applyAccountingAdjustment = async (
  adjustmentData: string,
  docFiles: File[] | null,
  projectId: string,
  clientId: string
): Promise<AxiosResponse<any>> => {
  const token = await getIdToken();
  const formData = new FormData();
  formData.append("adjustment_data", adjustmentData);
  if (docFiles) {
    docFiles.forEach((file) => {
      formData.append("doc", file);
    });
  }

  const response: AxiosResponse<any> = await axios.post(
    `${config.API_HOST}/invoice/adjusment/project/${projectId}/client/${clientId}`,
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

export const changeStatusInvoice = async (
  statusName: string,
  invoiceIds: number[],
  comments: string,
  docFiles: File[] | null,
  projectId: number,
  clientId: number
): Promise<AxiosResponse<any>> => {
  const token = await getIdToken();
  const formData = new FormData();
  formData.append("status_name", statusName);
  formData.append("invoice_ids", JSON.stringify(invoiceIds));
  formData.append("comments", comments);
  if (docFiles) {
    docFiles.forEach((file) => {
      formData.append("files", file);
    });
  }

  const response: AxiosResponse<any> = await axios.post(
    `${config.API_HOST}/invoice/project/${projectId}/client/${clientId}/update_status`,
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

export const reportInvoiceIncident = async (
  invoicesId: string[],
  comments: string,
  motiveId: string,
  files: File[] | null,
  clientId: string
): Promise<AxiosResponse<any>> => {
  const token = await getIdToken();

  const formData = new FormData();
  formData.append("invoices_id", JSON.stringify(invoicesId));
  formData.append("comments", comments);
  formData.append("motive_id", motiveId);

  if (files) {
    files.forEach((file) => {
      formData.append("files", file);
    });
  }

  const response: AxiosResponse<any> = await axios.post(
    `${config.API_HOST}/invoice/incident/client/${clientId}`,
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
