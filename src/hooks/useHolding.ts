import useSWR from "swr";

import { API } from "@/utils/api/api";
import { MessageInstance } from "antd/es/message/interface";
import { IHolding } from "@/types/holding/IHolding";
import { addHolding, removeHoldingById } from "@/services/holding/holding";
import { useAppStore } from "@/lib/store/store";

export const useHolding = () => {
  const { ID: projectId } = useAppStore((state) => state.selectedProject);
  const { data, isLoading, mutate } = useSWR<IHolding>(`/holding/project/${projectId}`, API, {});

  const createHolding = async (name: string, messageApi: MessageInstance) => {
    await addHolding({ name: name, projectId, messageApi });
    mutate();
  };

  const removeHolding = async (id: string, messageApi: MessageInstance) => {
    await removeHoldingById({ idHolding: id, messageApi });
    mutate();
  };

  return {
    data,
    isLoading,
    createHolding,
    removeHolding
  };
};
