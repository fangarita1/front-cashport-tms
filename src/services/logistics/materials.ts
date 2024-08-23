import axios, { AxiosResponse } from "axios";
import config from "@/config";
import { getIdToken } from "@/utils/api/api";
import { CustomFile, IListData, IMaterial } from "@/types/logistics/schema";
import { DocumentCompleteType } from "@/types/logistics/certificate/certificate";

export const getSearchMaterials = async (term:string): Promise<IListData> => {
  const token = await getIdToken();
  try {
    const formData = new FormData();
    formData.append("term", term);
    const response: IListData = await axios.post(`${config.API_HOST}/material/search`, formData, {
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`
      }
    });
    return response;
  } catch (error) {
    console.log("Error creating new location: ", error);
    return error as any;
  }
};

export const getAllMaterials = async (): Promise<IListData> => {
  const token = await getIdToken();
  try {
    const response: IListData = await axios.get(`${config.API_HOST}/material/all`, {
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`
      }
    });
    return response;
  } catch (error) {
    console.log("Error get all materials: ", error);
    return error as any;
  }
};

export const getAllMaterialType = async (): Promise<IListData> => {
  const token = await getIdToken();
  try {
    const response: IListData = await axios.get(`${config.API_HOST}/material/all/type`, {
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`
      }
    });
    return response;
  } catch (error) {
    console.log("Error get all getAllMaterialType: ", error);
    return error as any;
  }
};

export const getAllMaterialTransportType = async (): Promise<IListData> => {
  const token = await getIdToken();
  try {
    const response: IListData = await axios.get(`${config.API_HOST}/material/all/transport`, {
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`
      }
    });
    return response;
  } catch (error) {
    console.log("Error get all getAllMaterialTransportType: ", error);
    return error as any;
  }
};

export const getMaterialById = async (id:string): Promise<IListData> => {
  const token = await getIdToken();
  try {
    const response: IListData = await axios.get(`${config.API_HOST}/material/`+ id, {
      headers: {
        Accept: "application/json, text/plain, */*",
        Authorization: `Bearer ${token}`
      }
    });
    return response;
  } catch (error) {
    console.log("Error getMaterialById: ", error);
    return error as any;
  }
};


export const createMaterialForm =( 
  data: IMaterial,
  files: DocumentCompleteType[],
  formImages: CustomFile[]
) => {
  const form = new FormData();
  const body: any = { ...data };
  const hasImage = formImages.length > 0
  if (!hasImage) {
    throw new Error("At least one image file is required.");
  }

  body.images = formImages?.map((file: any, index) => ({
    docReference: file.docReference || `image${index + 1}`,
    uid: file?.uid,
    url_archive: file?.url_archive,
  }));

  body.files = files;

  form.append("body", JSON.stringify(body));

  formImages.forEach((file: CustomFile, index: number) => {
    if (file?.uid) {
      form.append(`image${index + 1}`, file);
    } else {
      console.warn(`Image ${index + 1} is undefined.`);
    }
  });

  files.forEach((file) => {
    if (file.file) {
      form.append(`file-for-${file.id}`, file.file);
    } else {
      console.warn(`File with id ${file.id} is undefined.`);
    }
  });

  return form
}

export const addMaterial = async (
  data: IMaterial,
  files: DocumentCompleteType[],
  formImages: CustomFile[]
): Promise<AxiosResponse<any, any>> => {
  try {
   const form = createMaterialForm(data, files, formImages)
    const response = await axios.post(`${config.API_HOST}/material/create`, form, {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json, text/plain, */*"
      }
    });
    return response;
  } catch (error) {
    console.log("Error creating material: ", error);
    throw error as any;
  }
};
export const updateMaterial = async (
  data: IMaterial,
  files: DocumentCompleteType[],
  formImages: CustomFile[]
): Promise<AxiosResponse<any, any>> => {
  try {
    const form = createMaterialForm(data, files, formImages)
    const response = await axios.put(`${config.API_HOST}/material/update`, form, {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json, text/plain, */*"
      }
    });
    return response;
  } catch (error) {
    console.log("Error updating material: ", error);
    throw error as any;
  }
};
