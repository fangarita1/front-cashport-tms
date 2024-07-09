import useSWR from "swr";

import { API } from "@/utils/api/api";
import { IAddAddressData, ILocation } from "@/types/locations/ILocations";

import { useAppStore } from "@/lib/store/store";
import { addAddressToLocation, getOneLocation } from "@/services/locations/locations";
import { useCallback } from "react";
import { MessageType } from "@/context/MessageContext";

export const useLocations = () => {
  const { ID: projectId } = useAppStore((state) => state.selectProject);
  const { data, isLoading, error } = useSWR<ILocation[]>(`/location/project/${projectId}`, API, {});

  const createLocation = async (
    newAddressData: {
      address: string;
      id: number;
      complement: string;
    },
    // eslint-disable-next-line no-unused-vars
    showMessage: (type: MessageType, content: string) => void
  ) => {
    const response = await addAddressToLocation(newAddressData, projectId, showMessage);
    return response.data as IAddAddressData[];
  };

  const getLocation = useCallback(
    async (locationId: number) => {
      return await getOneLocation(locationId, projectId);
    },
    [projectId]
  );

  return {
    data,
    error,
    isLoading,
    createLocation,
    getLocation
  };
};
