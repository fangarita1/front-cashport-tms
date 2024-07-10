import useSWR from "swr";
import { fetcher } from "@/utils/api/api";

interface Motive {
  id: number;
  name: string;
}

interface GetMotivesResponse {
  status: number;
  message: string;
  data: Motive[];
}

export const useInvoiceIncidentMotives = () => {
  const { data, error } = useSWR<GetMotivesResponse>("/invoice/incident/motives ", fetcher);
  return {
    data: data?.data,
    isLoading: !error && !data,
    isError: !!error
  };
};
