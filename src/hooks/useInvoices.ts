import useSWR from "swr";

import { fetcher } from "@/utils/api/api";
import { IInvocies } from "@/types/invoices/IInvoices";

interface UseInvoicesProps {
  clientId: number;
  projectId: number;
}

export const useInvoices = (props: UseInvoicesProps) => {
  const { data, isLoading } = useSWR<IInvocies>(
    `/invoice/client/${props.clientId}/project/${props.projectId}
  `,
    fetcher,
    {}
  );

  return {
    data: data?.data,
    isLoading
  };
};
