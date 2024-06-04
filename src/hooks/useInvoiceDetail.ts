import { fetcher } from "@/utils/api/api";
import { InvoiceDetail } from "@/types/clients/invoice-detail";
import useSWR from "swr";
import { useUserByToken } from "./useUserByToken";

interface UseInvoiceDetailProps {
  id?: number;
  page?: number;
  clientId?: number;
  invoiceId?: number;
}

export const useInvoiceDetail = (props: UseInvoiceDetailProps) => {
  const { data: projectId } = useUserByToken();
  const { data, isLoading } = useSWR<InvoiceDetail>(
    `/invoice/${props.invoiceId}/client/${props.clientId}/project/${projectId.projectId}`,
    fetcher
  );

  return {
    data: data?.data,
    loading: isLoading
  };
};
