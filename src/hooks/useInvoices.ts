import useSWR from "swr";

import { fetcher } from "@/utils/api/api";
import { IInvoices } from "@/types/invoices/IInvoices";

interface UseInvoicesProps {
  clientId: number;
  projectId: number;
}

export const useInvoices = (props: UseInvoicesProps) => {
  const { data, isLoading } = useSWR<IInvoices>(
    `/invoice/client/${props.clientId}/project/${props.projectId}`,
    fetcher,
    {}
  );

  return {
    data: data?.data,
    isLoading
  };
};
