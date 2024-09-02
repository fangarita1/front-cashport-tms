import axios, { AxiosResponse } from "axios";
import config from "@/config";
import { API } from "@/utils/api/api";
import { getIdToken } from "@/utils/api/api";
import { IFormGeneralUser, IListData } from "@/types/logistics/schema";
import { FileObject } from "@/components/atoms/UploadDocumentButton/UploadDocumentButton";
import { GenericResponse } from "@/types/global/IGlobal";
import { DocumentCompleteType } from "@/types/logistics/certificate/certificate";

export const getAllUsers = async (): Promise<IListData> => {
  const token = await getIdToken();
  try {
    const response: IListData = await axios.get(`${config.API_HOST}/logistic-user/all`, {
      headers: {
        Accept: "application/json, text/plain, */*",
        Authorization: `Bearer ${token}`
      }
    });
    return response;
  } catch (error) {
    console.log("Error getAllUsers: ", error);
    return error as any;
  }
};

export const getAllRoles = async (): Promise<IListData> => {
  const token = await getIdToken();
  try {
    const response: IListData = await axios.get(`${config.API_HOST}/logistic-user/all/roles`, {
      headers: {
        Accept: "application/json, text/plain, */*",
        Authorization: `Bearer ${token}`
      }
    });
    return response;
  } catch (error) {
    console.log("Error getAllRoles: ", error);
    return error as any;
  }
};

export const getAllCarriers = async (): Promise<IListData> => {
  const token = await getIdToken();
  try {
    const response: IListData = await axios.get(`${config.API_HOST}/logistic-user/all/carriers`, {
      headers: {
        Accept: "application/json, text/plain, */*",
        Authorization: `Bearer ${token}`
      }
    });
    return response;
  } catch (error) {
    console.log("Error getAllCarriers: ", error);
    return error as any;
  }
};

export const getAllPsl = async (): Promise<IListData> => {
  const token = await getIdToken();
  try {
    const response: IListData = await axios.get(`${config.API_HOST}/logistic-user/all/psl`, {
      headers: {
        Accept: "application/json, text/plain, */*",
        Authorization: `Bearer ${token}`
      }
    });
    return response;
  } catch (error) {
    console.log("Error getAllPsl: ", error);
    return error as any;
  }
};

export const getAllCostCenterByPsl = async (id: string): Promise<IListData> => {
  const token = await getIdToken();
  try {
    const response: IListData = await axios.get(`${config.API_HOST}/logistic-user/all/psl/${id}`, {
      headers: {
        Accept: "application/json, text/plain, */*",
        Authorization: `Bearer ${token}`
      }
    });
    return response;
  } catch (error) {
    console.log("Error getAllCostCenterByPsl: ", error);
    return error as any;
  }
};

export const getUserById = async (id: string): Promise<IListData> => {
  try {
    const response: IListData = await axios.get(`${config.API_HOST}/logistic-user/${id}`, {
      headers: {
        Accept: "application/json, text/plain, */*"
      }
    });
    return response;
  } catch (error) {
    console.log("Error get User: ", error);
    return error as any;
  }
};
export const createUserForm = (
  generalData: IFormGeneralUser,
  logo: FileObject[]
) => {
  const form = new FormData();
  const body: any = generalData;
 
  body.logo = logo ? logo.map((file: any) => ({
    docReference: file.docReference,
    uid: file?.file?.uid,
  })): undefined

  form.append("body", JSON.stringify({...body, rh: body.rhval as any}));
  logo && form.append("logo", logo[0].file as unknown as File);

  return form
}

export const updateUser = async (
  generalData: IFormGeneralUser,
  logo: FileObject[],
): Promise<AxiosResponse<any, any>> => {
  try {
    const form = createUserForm(generalData, logo)
    const response = await axios.put(`${config.API_HOST}/logistic-user/update`, form, {
      headers: {
        Accept: "application/json, text/plain, */*"
      }
    });
    return response;
  } catch (error) {
    console.log("Error update User: ", error);
    return error as any;
  }
};

export const addUser = async (
  generalData: IFormGeneralUser,
  logo: FileObject[]
): Promise<AxiosResponse<any, any>> => {
  try {
    const form = createUserForm(generalData, logo)
    const response = await axios.post(`${config.API_HOST}/logistic-user/create`, form, {
      headers: {
        "content-type": "multipart/form-data",
        Accept: "application/json, text/plain, */*"
      }
    });
    return response;
  } catch (error) {
    console.log("Error create User: ", error);
    throw error as any;
  }
};

export const updateUserStatus = async (
  user_id:string, active:string
): Promise<AxiosResponse<any, any>> => {
  try {
    const form = new FormData();
    const body: any = { "user_id":user_id, "active":active };
    form.append("body", JSON.stringify(body));  
    const response = await axios.put(`${config.API_HOST}/logistic-user/updatestatus`, form, {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json, text/plain, */*"
      }
    });
    return response;
  } catch (error) {
    console.log("Error updating user: ", error);
    throw error as any;
  }
};
