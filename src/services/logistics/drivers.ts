import axios, { AxiosResponse } from "axios";
import config from "@/config";
import { getIdToken } from "@/utils/api/api";
import { IDriver, IListData } from "@/types/logistics/schema";
import { FileObject } from "@/components/atoms/UploadDocumentButton/UploadDocumentButton";

export const getAllDrivers = async (): Promise<IListData> => {
  try {
    const response: IListData = await axios.get(`${config.API_HOST}/driver/all`, {
      headers: {
        Accept: "application/json, text/plain, */*"
      }
    });
    return response;
  } catch (error) {
    console.log("Error get all Drivers: ", error);
    return error as any;
  }
};

export const getDriverById = async (id: string): Promise<IListData> => {
  try {
    const response: IListData = await axios.get(`${config.API_HOST}/driver/driver/${id}`, {
      headers: {
        Accept: "application/json, text/plain, */*"
      }
    });
    return response;
  } catch (error) {
    console.log("Error get Driver: ", error);
    return error as any;
  }
};

export const updateDriver = async (data: IDriver): Promise<IListData> => {
  try {
    const response: IListData = await axios.put(`${config.API_HOST}/driver/update`, data, {
      headers: {
        Accept: "application/json, text/plain, */*"
      }
    });
    return response;
  } catch (error) {
    console.log("Error get Driver: ", error);
    return error as any;
  }
};

export const addDriver = async (
  data: IDriver,
  logo: FileObject[],
  files: FileObject[]
): Promise<IListData> => {
  try {
    console.log(logo, files);
    const form = new FormData();
    const body: any = data;
    body.logo = logo.map((file: any) => ({
      docReference: file.docReference,
      uid: file?.file?.uid
    }));
    body.files = files.map((file: any) => ({
      docReference: file.docReference,
      uid: file?.file?.uid
    }));
    form.append("body", JSON.stringify(body));
    form.append("logo", logo[0].file as unknown as File);
    files.forEach((file: FileObject, index: number) => {
      form.append(`files[${index}]`, file.file as unknown as File);
    });
    const response: IListData = await axios.post(`${config.API_HOST}/driver/create`, form, {
      headers: {
        "content-type": "multipart/form-data",
        Accept: "application/json, text/plain, */*"
      }
    });
    return response;
  } catch (error) {
    console.log("Error get Driver: ", error);
    throw error as any;
  }
};
