import { fetcher } from "@/utils/api/api";
import useSWR from "swr";

interface ClientStatus {
  id: number;
  status_name: string;
}

interface UseClientStatusResponse {
  status: number;
  message: string;
  data: ClientStatus[];
}

export const useClientStatus = () => {
  const { data, error } = useSWR<UseClientStatusResponse>("/client/status", fetcher);

  return {
    data: data?.data,
    loading: !error && !data,
    error
  };
};
