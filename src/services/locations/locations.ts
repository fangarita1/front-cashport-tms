import axios, { AxiosResponse } from "axios";
import config from "@/config";
import { API, getIdToken } from "@/utils/api/api";
import { IAddAddressToLocation, ICreateLocation, ICities } from "@/types/locations/ILocations";
import { CREATED, SUCCESS } from "@/utils/constants/globalConstants";
import { MessageInstance } from "antd/es/message/interface";

export const fetchAllLocations = async (): Promise<ICities[]> => {
  try {
    const { data, status }: AxiosResponse = await axios.get<ICities>(
      `${config.API_HOST}/location`,
      {
        headers: {
          Authorization: `Bearer ${await getIdToken()}`
        }
      }
    );
    if (status === 200) return data.data;
    return [];
  } catch (error) {
    return [];
  }
};

export const addAddressToLocation = async (
  data: {
    address: string;
    id: number;
    complement: string;
  },
  projectId: number,
  messageApi: MessageInstance
): Promise<IAddAddressToLocation> => {
  const modelData: ICreateLocation = {
    address: data.address,
    city: data.id,
    complement: data.complement,
    project_id: projectId
  };

  try {
    const response: AxiosResponse = await API.post(`${config.API_HOST}/location`, modelData);

    if (response.status === CREATED || SUCCESS) {
      messageApi.open({
        type: "success",
        content: `Direccion creada exitosamente.`
      });
    } else {
      messageApi.open({
        type: "error",
        content: "Oops ocurrio un error."
      });
    }
    return response.data as IAddAddressToLocation;
  } catch (error) {
    console.warn("error creating new location: ", error);
    return error as any;
  }
};

export const getOneLocation = async (locationId: number, projectId: number): Promise<any> => {
  const token = await getIdToken();

  try {
    const response: AxiosResponse = await axios.get(
      `${config.API_HOST}/location/${locationId}/project/${projectId}`,
      {
        headers: {
          Accept: "application/json, text/plain, */*",
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response.data;
  } catch (error) {
    console.log("Error getting location: ", error);
    return error as any;
  }
};
