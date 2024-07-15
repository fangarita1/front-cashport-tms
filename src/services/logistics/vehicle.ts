import axios, { AxiosResponse } from "axios";
import config from "@/config";
import { IListData, IListDataVehiche, IListDataVehicheDetail } from "@/types/logistics/schema";

export const getAllVehicles = async (): Promise<IListData> => {
  try {
    const response: IListData = await axios.get(`${config.API_HOST}/vehicle/all`, {
      headers: {
        Accept: "application/json, text/plain, */*"
      }
    });
    return response;
  } catch (error) {
    console.log("Error get all vehicles: ", error);
    return error as any;
  }
};

export const getVehicleType = async (): Promise<IListDataVehiche> => {
  try {
    const response: AxiosResponse<IListDataVehiche> = await axios.get(
      `${config.API_HOST}/vehicle/type`,
      {
        headers: {
          Accept: "application/json, text/plain, */*"
        }
      }
    );

    return response.data;
  } catch (error) {
    console.log("Error get vehicle vehicles: ", error);
    return error as any;
  }
};
export const getVehicleById = async (id: string): Promise<IListDataVehicheDetail> => {
  try {
    const response: AxiosResponse<IListDataVehicheDetail> = await axios.get(
      `${config.API_HOST}/vehicle/${id}`,
      {
        headers: {
          Accept: "application/json, text/plain, */*"
        }
      }
    );
    console.log(response.data);

    return response.data;
  } catch (error) {
    console.log("Error get vehicle vehicles: ", error);
    return error as any;
  }
};

interface IVehicle {
  id: string;
  id_carrier: number;
  id_vehicle_type: number;
  plate_number: string;
  brand: string;
  line: string;
  model: string;
  year: number;
  color: string;
  country: number;
  aditional_info: string;
  gps_link: string;
  gps_user: string;
  gps_password: string;
}

interface FileObject {
  file: File;
  docReference?: string;
}

export const addVehicle = async (
  data: IVehicle,
  imageFiles: FileObject[],
  files: FileObject[] | any[]
): Promise<AxiosResponse<any, any>> => {
  try {
    const form = new FormData();
    const body: any = { ...data };

    // Check if there is at least one image file
    if (!imageFiles.some((file) => file.file)) {
      throw new Error("At least one image file is required.");
    }

    // Handle images
    body.images = imageFiles.map((file: any, index) => ({
      docReference: file.docReference || `imagen${index + 1}`,
      uid: file?.file?.uid
    }));

    // Append body to form
    form.append("body", JSON.stringify(body));

    // Append each image file to form data
    imageFiles.forEach((file: FileObject, index: number) => {
      form.append(`image${index + 1}`, file.file);
    });

    // Append each additional file to form data
    files.forEach((file: FileObject, index: number) => {
      form.append(`file-for-${index + 1}`, file.file);
    });

    const response = await axios.post(`${config.API_HOST}/vehicle/create`, form, {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json, text/plain, */*"
      }
    });
    return response;
  } catch (error) {
    console.log("Error creating vehicle: ", error);
    throw error as any;
  }
};
