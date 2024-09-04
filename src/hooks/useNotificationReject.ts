import useSWR from "swr";
import { fetcher } from "@/utils/api/api";

interface RejectedNotification {
  create_at: string;
  notification_type_name: string;
  client_name: string;
  incident_id: number;
  is_client_change: number;
  client_update_changes: {};
  days: string;
  id: number;
}

interface GetRejectedNotificationsResponse {
  status: number;
  message: string;
  data: RejectedNotification[];
}

export const useRejectedNotifications = (projectId: number) => {
  const { data, error, mutate } = useSWR<GetRejectedNotificationsResponse>(
    `/notification/rejecteds/project/${projectId}/user`,
    fetcher
  );

  return {
    data: data?.data,
    isLoading: !error && !data,
    isError: !!error,
    mutate
  };
};
