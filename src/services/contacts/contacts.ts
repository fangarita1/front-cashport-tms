import config from "@/config";
import { ICreateEditContact, IGetContacts } from "@/types/contacts/IContacts";
import { API } from "@/utils/api/api";

interface PostContactResponse {
  message: string;
  status: number;
  success: boolean;
}

export const getContact = async (clientId: number, contactId: number): Promise<IGetContacts> => {
  try {
    const response: IGetContacts = await API.get(
      `${config.API_HOST}/client/${clientId}/contact/${contactId}`
    );

    return response;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const postContact = async (contact: ICreateEditContact): Promise<PostContactResponse> => {
  try {
    const response: PostContactResponse = await API.post(
      `${config.API_HOST}/client/contact`,
      contact
    );

    return response;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const putContact = async (
  contact: ICreateEditContact,
  contactId: number
): Promise<PostContactResponse> => {
  try {
    const response: any = await API.put(`${config.API_HOST}/client/contact/${contactId}`, contact);

    return response;
  } catch (error) {
    return Promise.reject(error);
  }
};
