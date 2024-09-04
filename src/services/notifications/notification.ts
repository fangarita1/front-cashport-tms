import axios, { AxiosResponse } from "axios";
import config from "@/config";
import { getIdToken } from "@/utils/api/api";

interface MarkNotificationReadResponse {
  message: string;
  status: number;
}

export const markNotificationAsRead = async (
  notificationId: number
): Promise<AxiosResponse<MarkNotificationReadResponse>> => {
  const token = await getIdToken();
  try {
    const url = `${config.API_HOST}/notification/read/${notificationId}`;

    const response: AxiosResponse<MarkNotificationReadResponse> = await axios.post(
      url,
      {}, // Empty body as the curl command doesn't have a request body
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      // If it's an Axios error with a response, return the response
      return error.response as AxiosResponse<MarkNotificationReadResponse>;
    }
    // For other types of errors, throw them
    throw error;
  }
};
