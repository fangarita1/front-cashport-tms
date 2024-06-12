import useSWR from "swr";

import { API } from "@/utils/api/api";
import { MessageInstance } from "antd/es/message/interface";
import { ILocation } from "@/types/locations/ILocations";

import { useAppStore } from "@/lib/store/store";
import { addAddressToLocation } from "@/services/locations/locations";

export const useLocations = () => {
  const { ID: projectId } = useAppStore((state) => state.selectProject);
  const { data, isLoading, mutate } = useSWR<ILocation[]>(
    `/location/project/${projectId}`,
    API,
    {}
  );

  const createLocation = async (name: string, messageApi: MessageInstance) => {
    await addAddressToLocation(data, projectId, messageApi);
    mutate();
  };

  return {
    data,
    isLoading,
    createLocation
  };
};
