import axios, { AxiosResponse } from "axios";
import config from "@/config";
import { API, getIdToken } from "@/utils/api/api";
import { GenericResponse } from "@/types/global/IGlobal";
import { ISingleClientGroup } from "@/types/clientsGroups/IClientsGroups";

export const getOneGroup = async (groupId: number, projectId: number) => {
  try {
    const response: GenericResponse<ISingleClientGroup> = await API.get(
      `${config.API_HOST}/group-client/${groupId}/project/${projectId}`
    );
    return response;
  } catch (error) {
    return error as any;
  }
};

export const createGroup = async (data: any, id: number): Promise<any> => {
  const modelData = {
    name: data.name,
    clients: data.clients,
    project_id: id
  };

  const token = await getIdToken();

  try {
    const response: AxiosResponse = await axios.post(`${config.API_HOST}/group-client`, modelData, {
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json; charset=utf-8",
        Authorization: `Bearer ${token}`
      }
    });
    return response;
  } catch (error) {
    return error as any;
  }
};

export const updateGroup = async (
  data: { group_id: number; clients: string[] },
  project_id: number
): Promise<any> => {
  console.log("modelDataPUT:", data);

  const modelData = {
    ...data,
    project_id
  };

  const token = await getIdToken();

  try {
    const response: AxiosResponse = await axios.put(`${config.API_HOST}/group-client`, modelData, {
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json; charset=utf-8",
        Authorization: `Bearer ${token}`
      }
    });

    // if (response.status === 200) {
    //   return response;
    // }
    return response;
  } catch (error) {
    return error as any;
  }
};
