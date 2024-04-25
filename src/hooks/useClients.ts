import useSWR from "swr";
import { fetcher } from "@/utils/api/api";
import { IViewClientsTable } from "@/types/clients/IViewClientsTable";

interface UseClientsProps {
  id: number;
  page?: number;
}

export const useClients = (props: UseClientsProps) => {
  const { data, isLoading } = useSWR<IViewClientsTable>(
    `/portfolio/client/project/${props.id}`,
    fetcher
  );
  return {
    data: data?.data,
    loading: isLoading
  };
};
