import { AxiosResponse } from "axios";
import config from "@/config";
import { API } from "@/utils/api/api";
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
    depency_client: Number(shipToData.dependency_client),
    description: "Burned description",
    zone: zones,
    channel: selectedStructure.channels,
    line: selectedStructure.lines,
    subline: selectedStructure.sublines,
    id_address: shipToData.address_id,
    condition_payment: shipToData.condition_payment ? shipToData.condition_payment.value : 0,
    radication_type: shipToData.radication_type ? shipToData.radication_type?.value : 0
  };

  try {
    const response: AxiosResponse = await API.post(`${config.API_HOST}/ship-to`, modelData);

    return response;
  } catch (error) {
    console.warn("Error creating Ship To: ", error);
    return error as any;
  }
};
