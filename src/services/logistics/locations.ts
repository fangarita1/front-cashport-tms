import axios, { AxiosResponse } from "axios";
import config from "@/config";
import { getIdToken } from "@/utils/api/api";
import { CustomFile, IListData, ILocation } from "@/types/logistics/schema";
import { CertificateType, DocumentCompleteType } from "@/types/logistics/certificate/certificate";
import { GenericResponse } from "@/types/global/IGlobal";

export const getAllLocations = async (): Promise<IListData> => {
  const token = await getIdToken();
  try {
    const response: IListData = await axios.get(`${config.API_HOST}/logistic-location/all/locations`, {
      headers: {
        Accept: "application/json, text/plain, */*",
        Authorization: `Bearer ${token}`
      }
    });
    return response;
  } catch (error) {
    console.log("Error creating new location: ", error);
    return error as any;
  }
};

export const getAllStatesByCountry = async (idcountry:string = "1"): Promise<IListData> => {
  const token = await getIdToken();
  try {
    const response: IListData = await axios.get(`${config.API_HOST}/logistic-location/all/statesbycountry/${idcountry}`, {
      headers: {
        Accept: "application/json, text/plain, */*",
        Authorization: `Bearer ${token}`
      }
    });
    return response;
  } catch (error) {
    console.log("Error getAllStatesByCountry: ", error);
    return error as any;
  }
};

export const getAllCitiesByState = async (idstate:string = "1"): Promise<IListData> => {
  const token = await getIdToken();
  idstate = idstate.replace('city-','');
  try {
    const response: IListData = await axios.get(`${config.API_HOST}/logistic-location/all/citiesbystate/${idstate}`, {
      headers: {
        Accept: "application/json, text/plain, */*",
        Authorization: `Bearer ${token}`
      }
    });
    return response;
  } catch (error) {
    console.log("Error getAllCitiesByState: ", error);
    return error as any;
  }
};

export const getAllLocationTypes = async (): Promise<IListData> => {
  const token = await getIdToken();
  try {
    const response: IListData = await axios.get(`${config.API_HOST}/logistic-location/all/location-types`, {
      headers: {
        Accept: "application/json, text/plain, */*",
        Authorization: `Bearer ${token}`
      }
    });
    return response;
  } catch (error) {
    console.log("Error getAllLocationTypes: ", error);
    return error as any;
  }
};

export const getAllGroupByLocation = async (): Promise<IListData> => {
  const token = await getIdToken();
  try {
    const response: IListData = await axios.get(`${config.API_HOST}/logistic-location/all/group-location`, {
      headers: {
        Accept: "application/json, text/plain, */*",
        Authorization: `Bearer ${token}`
      }
    });
    return response;
  } catch (error) {
    console.log("Error getAllGroupByLocation: ", error);
    return error as any;
  }
};

export const getAllDocumentsType = async (): Promise<CertificateType[]> => {
  const token = await getIdToken();
  try {
    const response: IListData = await axios.get(`${config.API_HOST}/logistic-location/all/documents-type`, {
      headers: {
        Accept: "application/json, text/plain, */*",
        Authorization: `Bearer ${token}`
      }
    });
    const res:CertificateType[] =response.data.data;
    return res;
  } catch (error) {
    console.log("Error getAllDocumentsType: ", error);
    return error as any;
  }
};

export const createLocationForm =( 
  data: ILocation,
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

  const expiration = files.find(f => !f.expirationDate && f.expiry);
  if (expiration) {
    throw new Error(`El documento ${expiration.description} debe tener una fecha de vencimiento`);
  }

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

export const addLocation = async (
  data: ILocation,
  files: DocumentCompleteType[],
  formImages: CustomFile[]
): Promise<AxiosResponse<any, any>> => {
  try {
   const form = createLocationForm(data, files, formImages)
    const response = await axios.post(`${config.API_HOST}/logistic-location/create/locations`, form, {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json, text/plain, */*"
      }
    });
    return response;
  } catch (error) {
    console.log("Error creating location: ", error);
    throw error as any;
  }
};
export const updateLocation = async (
  data: ILocation,
  files: DocumentCompleteType[],
  formImages: CustomFile[]
): Promise<AxiosResponse<any, any>> => {
  try {
    const form = createLocationForm(data, files, formImages)
    const response = await axios.put(`${config.API_HOST}/logistic-location/update/locations`, form, {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json, text/plain, */*"
      }
    });
    return response;
  } catch (error) {
    console.log("Error updating location: ", error);
    throw error as any;
  }
};
