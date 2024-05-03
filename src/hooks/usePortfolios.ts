import { fetcher } from "@/utils/api/api";
import { IViewClientsTable } from "@/types/clients/IViewClientsTable";
import useSWR from "swr";

interface UsePortfoliosProps {
  id: number;
  page?: number;
}

export const usePortfolios = (props: UsePortfoliosProps) => {
  const { data, isLoading } = useSWR<IViewClientsTable>(
    `/portfolio/client/project/${props.id}`,
    fetcher
  );
  return {
    data: data?.data,
    loading: isLoading
  };
};
