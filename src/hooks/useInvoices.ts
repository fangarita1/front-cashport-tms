import useSWR from "swr";

import { fetcher } from "@/utils/api/api";
import { IHolding } from "@/types/holding/IHolding";

interface UseInvoicesProps {
  clientId: number;
  projectId: number;
}

export const useInvoices = (props: UseInvoicesProps) => {
  const { data, isLoading } = useSWR<IHolding>(
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
