import axios, { AxiosResponse } from "axios";
import config from "@/config";
import { getIdToken } from "@/utils/api/api";
import { CustomFile, IDocumentsType, IEntityType, IListData, ILocation } from "@/types/logistics/schema";
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

export const getLocationById = async (id:string): Promise<IListData> => {
  const token = await getIdToken();
  try {
    const response: IListData = await axios.get(`${config.API_HOST}/logistic-location/location/`+ id, {
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

export const getAllSecureRoutes = async (): Promise<IListData> => {
  const token = await getIdToken();
  try {
    const response: IListData = await axios.get(`${config.API_HOST}/logistic-location/all/secure-routes`, {
      headers: {
        Accept: "application/json, text/plain, */*",
        Authorization: `Bearer ${token}`
      }
    });
    return response;
  } catch (error) {
    console.log("Error getAllSecureRoutes: ", error);
    return error as any;
  }
};

export const getAllEntityType = async (): Promise<IEntityType[]> => {
  const token = await getIdToken();
  try {
    const response: IListData = await axios.get(`${config.API_HOST}/logistic-location/all/entity-type`, {
      headers: {
        Accept: "application/json, text/plain, */*",
        Authorization: `Bearer ${token}`
      }
    });
    const res:IEntityType[] =response.data.data;
    return res;
  } catch (error) {
    console.log("Error getAllEntityType: ", error);
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
  files: DocumentCompleteType[]
) => {
  const form = new FormData();
  const body: any = { ...data };
  body.files = files;

  form.append("body", JSON.stringify(body));

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
  files: DocumentCompleteType[]
): Promise<AxiosResponse<any, any>> => {
  try {
   const form = createLocationForm(data, files)
   console.log(form)
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
  files: DocumentCompleteType[]
): Promise<AxiosResponse<any, any>> => {
  try {
    const form = createLocationForm(data, files)
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

export const updateLocationStatus = async (
  location_id:string, active:string
): Promise<AxiosResponse<any, any>> => {
  try {
    const form = new FormData();
    const body: any = { "location_id":location_id, "active":active };
    form.append("body", JSON.stringify(body));  
    const response = await axios.put(`${config.API_HOST}/logistic-location/updatestatus/locations`, form, {
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

export const addDocumentsType = async (
  formdata: FormData
): Promise<AxiosResponse<any, any>> => {
  try {
   
   console.log(formdata)
    const response = await axios.post(`${config.API_HOST}/logistic-location/create/documents-type`, formdata, {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json, text/plain, */*"
      }
    });
    return response;
  } catch (error) {
    console.log("Error creating documenttype: ", error);
    throw error as any;
  }
};
