import config from "@/config";
import { IZones } from "@/types/zones/IZones";
import { getIdToken } from "@/utils/api/api";
import axios, { AxiosResponse } from "axios";

export const getAllZones = async ({
  idProject
}: {
  idProject: string;
}): Promise<AxiosResponse<IZones>> => {
  const token = await getIdToken();
  try {
    const response: AxiosResponse<IZones> = await axios.get(
      `${config.API_HOST}/zone/project/${idProject}`,
      {
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json; charset=utf-8",
          Authorization: `Bearer ${token}`
        }
      }
    );

    return response;
  } catch (error) {
    return error as any;
  }
};
