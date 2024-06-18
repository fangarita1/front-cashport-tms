import useSWR from "swr";

import { useAppStore } from "@/lib/store/store";
import { fetcher } from "@/utils/api/api";
import { MessageInstance } from "antd/es/message/interface";
import { IShipTo, IShipTos, ShipToFormType } from "@/types/shipTo/IShipTo";
import { addShipTo } from "@/services/shipTo/shipTo";
import { ISelectedBussinessRules } from "@/types/bre/IBRE";

export const useShipTos = (clientId: number) => {
  const { ID } = useAppStore((state) => state.selectProject);

  const { data, isLoading, mutate } = useSWR<IShipTos>(
    `/ship-to/project/${ID}/client/${clientId}`,
    fetcher,
    {}
  );

  //create shipTo
  const createShipTo = async (
    selectedData: ShipToFormType,
    zones: number[],
    selectedStructure: ISelectedBussinessRules,
    messageApi: MessageInstance
  ) => {
    await addShipTo(clientId, ID, selectedData, zones, selectedStructure, messageApi);
    mutate();
  };

  return {
    data: (data?.data as IShipTo[]) || ([] as IShipTo[]),
    isLoading,
    createShipTo
  };
};
