import { fetcher } from "@/utils/api/api";
import useSWR from "swr";

export interface LegalizedFinancialDiscount {
  id: number;
  initial_value: number;
  current_value: number;
  client_id: number;
  is_discount: boolean | null;
  status_name: string;
  document_type_name: string;
}

interface LegalizedFinancialDiscountResponse {
  status: number;
  message: string;
  data: LegalizedFinancialDiscount[];
}

interface UseLegalizedFinancialDiscountProps {
  typeLegalized: number;
  projectId: number;
  clientId: string;
}

export const useLegalizedFinancialDiscount = (props: UseLegalizedFinancialDiscountProps) => {
  const { data, error, isLoading } = useSWR<LegalizedFinancialDiscountResponse>(
    `/financial-discount/is-legalized/${props.typeLegalized}/project/${props.projectId}/client/${props.clientId}`,
    fetcher
  );

  return {
    data: data?.data,
    message: data?.message,
    error: error,
    isLoading: isLoading
  };
};
