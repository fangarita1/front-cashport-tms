import useSWR from "swr";
import { fetcher } from "@/utils/api/api";

interface UserApproved {
  id: number;
  financial_discount_id: number;
  user_id: number;
  user_name: string;
}

interface ValidityRange {
  end: string;
  start: string;
}

interface FinancialDiscount {
  id: number;
  client_id: number;
  project_id: number;
  project_name: string;
  initial_value: number;
  current_value: number;
  comments: string | null;
  files: string | null;
  create_at: string;
  update_at: string;
  delete_at: string | null;
  status_id: number;
  status_name: string;
  document_type_id: number;
  document_type_name: string;
  percentage: number | null;
  date_of_issue: string;
  motive_id: number;
  motive_name: string;
  validity_range: ValidityRange;
  users_approved: UserApproved[];
}

interface FinancialDiscountStatusGroup {
  status_id: number;
  financial_discounts: FinancialDiscount[];
  temp_discount_total: number;
  count: number;
}

interface GetFinancialDiscountsResponse {
  status: number;
  message: string;
  data: FinancialDiscountStatusGroup[];
}


// TODO  poner el tipo  de ajuste contable en el get 

export const useAcountingAdjustment = (projectId: number, clientId: number) => {
  const { data, error } = useSWR<GetFinancialDiscountsResponse>(
    `/financial-discount/project/${projectId}/client/${clientId}?type=1`,
    fetcher
  );

  return {
    data: data?.data,
    isLoading: !error && !data,
    isError: !!error
  };
};
