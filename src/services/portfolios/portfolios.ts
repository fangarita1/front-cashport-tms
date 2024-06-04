import axios, { AxiosResponse } from "axios";
import config from "@/config";
import { getIdToken } from "@/utils/api/api";
import { IDataSection } from "@/types/portfolios/portfolios";

export const getPortfolioFromClient = async (
  projectId: number | undefined,
  clientId: number | undefined
): Promise<any> => {
  const token = await getIdToken();

  try {
    const response: AxiosResponse = await axios.get(
      `${config.API_HOST}/portfolio/project/${projectId}/client/${clientId}`,
      {
        headers: {
          Accept: "application/json, text/plain, */*",
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response.data.data as IDataSection;
  } catch (error) {
    console.log("Error creating new location: ", error);
    return error as any;
  }
};
