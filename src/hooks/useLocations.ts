import useSWR from "swr";

import { API } from "@/utils/api/api";
import { MessageInstance } from "antd/es/message/interface";
import { ILocation } from "@/types/locations/ILocations";

import { useAppStore } from "@/lib/store/store";
import { addAddressToLocation, getOneLocation } from "@/services/locations/locations";
import { useCallback } from "react";

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

  const getLocation = useCallback(
    async (locationId: number) => {
      return await getOneLocation(locationId, projectId);
    },
    [projectId]
  );

  return {
    data,
    isLoading,
    createLocation,
    getLocation
  };
};
