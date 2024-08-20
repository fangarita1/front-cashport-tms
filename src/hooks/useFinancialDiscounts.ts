import useSWR from "swr";

import { fetcher } from "@/utils/api/api";
import { FinancialDiscountsResponse } from "@/types/financialDiscounts/IFinancialDiscounts";

export const useFinancialDiscounts = (clientId: number, projectId: number) => {
  const { data, isLoading } = useSWR<FinancialDiscountsResponse>(
    `/financial-discount/project/${projectId}/client/${clientId}`,
    fetcher,
    {}
  );

  return {
    data: data?.data,
    isLoading
  };
};
