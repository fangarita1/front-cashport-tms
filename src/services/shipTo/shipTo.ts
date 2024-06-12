import axios, { AxiosResponse } from "axios";
import config from "@/config";
import { getIdToken } from "@/utils/api/api";
import { ICreateShipTo, ShipToFormType } from "@/types/shipTo/IShipTo";
import { ISelectedBussinessRules } from "@/types/bre/IBRE";

export const createShipTo = async (
  clientID: number,
  projectID: number,
  selectedData: ShipToFormType,
  zones: number[],
  selectedStructure: ISelectedBussinessRules
): Promise<any> => {
  const shipToData = selectedData.shipTo;

  const modelData: ICreateShipTo = {
    client_id: clientID.toString(),
    accounting_code: shipToData.code,
    project_id: projectID,
    id_location: 1,
    depency_client: Number(shipToData.dependency_client),
    description: "",
    zone: zones,
    channel: selectedStructure.channels,
    line: selectedStructure.lines,
    subline: selectedStructure.sublines
  };

  const token = await getIdToken();

  try {
    const response: AxiosResponse = await axios.post(`${config.API_HOST}/ship-to`, modelData, {
      headers: {
        Accept: "application/json, text/plain, */*",
        Authorization: `Bearer ${token}`
      }
    });
    return response;
  } catch (error) {
    console.log("Error creating Ship To: ", error);
    return error as any;
  }
};
