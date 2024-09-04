import useSWR from "swr";
import { fetcher } from "@/utils/api/api";

interface Notification {
  create_at: string;
  notification_type_name: string;
  client_name: string;
  incident_id: number | null;
  is_client_change: number;
  client_update_changes: Record<string, any>;
  days: string;
  id: number;
  is_read : number;
}

interface GetNotificationsResponse {
  message: string;
  status: number;
  data: Notification[];
}

export const useNotificationOpen = (projectId: number) => {
  const { data, error, mutate } = useSWR<GetNotificationsResponse>(
    `/notification/project/${projectId}/user`,
    fetcher
  );

  return {
    data: data?.data,
    isLoading: !error && !data,
    isError: !!error,
    mutate
  };
};
