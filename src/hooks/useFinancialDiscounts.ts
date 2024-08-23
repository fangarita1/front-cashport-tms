import useSWR from "swr";
import { fetcher } from "@/utils/api/api";
import { FinancialDiscountsResponse } from "@/types/financialDiscounts/IFinancialDiscounts";

interface FinancialDiscountsProps {
  clientId: number;
  projectId: number;
  id?: number;
  line?: number;
  subline?: number;
  channel?: number;
  zone?: number;
}

export const useFinancialDiscounts = ({
  clientId,
  projectId,
  id,
  line,
  subline,
  channel,
  zone
}: FinancialDiscountsProps) => {
  const buildQueryString = () => {
    const params = new URLSearchParams();
    if (id !== undefined) params.append("id", id.toString());
    if (line !== undefined) params.append("line", line.toString());
    if (subline !== undefined) params.append("subline", subline.toString());
    if (channel !== undefined) params.append("channel", channel.toString());
    if (zone !== undefined) params.append("zone", zone.toString());
    return params.toString();
  };

  const queryString = buildQueryString();
  const url = `/financial-discount/project/${projectId}/client/${clientId}${queryString ? `?${queryString}` : ""}`;

  const { data, isLoading } = useSWR<FinancialDiscountsResponse>(url, fetcher, {});

  return {
    data: data?.data,
    isLoading
  };
};
