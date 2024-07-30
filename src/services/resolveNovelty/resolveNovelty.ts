import config from "@/config";
import { getIdToken } from "@/utils/api/api";
import axios, { AxiosResponse } from "axios";

interface IncidentActionData {
  comments: string;
  files?: File[];
}

export const approveIncident = async (
  invoiceId: number,
  incidentId: number,
  actionData: IncidentActionData
): Promise<AxiosResponse<any>> => {
  const token = await getIdToken();

  const formData = new FormData();
  formData.append("comments", actionData.comments);

  if (actionData.files) {
    actionData.files.forEach((file) => {
      formData.append("files", file);
    });
  }

  const response: AxiosResponse<any> = await axios.post(
    `${config.API_HOST}/invoice/${invoiceId}/approve-incident/${incidentId}`,
    formData,
    {
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`
      }
    }
  );

  return response;
};

export const rejectIncident = async (
  invoiceId: number,
  incidentId: number,
  actionData: IncidentActionData
): Promise<AxiosResponse<any>> => {
  const token = await getIdToken();

  const formData = new FormData();
  formData.append("comments", actionData.comments);

  if (actionData.files) {
    actionData.files.forEach((file) => {
      formData.append("files", file);
    });
  }

  const response: AxiosResponse<any> = await axios.post(
    `${config.API_HOST}/invoice/${invoiceId}/reject-incident/${incidentId}`,
    formData,
    {
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`
      }
    }
  );

  return response;
};

interface AddCommentData {
  comments: string;
}

export const addIncidentComment = async (
  incidentId: string,
  commentData: AddCommentData
): Promise<AxiosResponse<any>> => {
  const token = await getIdToken();

  const response: AxiosResponse<any> = await axios.post(
    `${config.API_HOST}/api/invoice/incident-comments/${incidentId}`,
    commentData,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }
  );

  return response;
};
