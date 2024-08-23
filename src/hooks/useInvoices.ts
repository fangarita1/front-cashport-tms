import useSWR from "swr";
import { fetcher } from "@/utils/api/api";
import { IInvoices } from "@/types/invoices/IInvoices";

interface Props {
  clientId: number;
  page?: number;
  limit?: number;
  paymentAgreement?: number;
  radicationType?: number;
  lines?: number[];
  zones?: number[];
  channels?: number[];
  searchQuery?: string;
  projectId: number;
}

export const useInvoices = ({
  clientId,
  page,
  limit = 50,
  paymentAgreement,
  radicationType,
  lines,
  zones,
  channels,
  searchQuery,
  projectId
}: Props) => {
  const buildQueryString = () => {
    const params = new URLSearchParams({
      page: page?.toString() || "1",
      limit: limit.toString()
    });

    if (paymentAgreement !== undefined && paymentAgreement !== null) {
      params.append("payment_agrement", paymentAgreement?.toString());
    }

    if (radicationType !== undefined && radicationType !== null)
      params.append("radication_type", radicationType?.toString());
    if (lines && lines.length > 0) lines.forEach((line) => params.append("line", line.toString()));
    if (zones && zones.length > 0) zones.forEach((zone) => params.append("zone", zone.toString()));
    if (channels && channels.length > 0)
      channels.forEach((channel) => params.append("channel", channel.toString()));
    if (searchQuery) params.append("id", searchQuery);

    return params.toString();
  };

  const pathKey = `/invoice/client/${clientId}/project/${projectId}?${buildQueryString()}`;
  const { data, isLoading, error } = useSWR<IInvoices>(pathKey, fetcher);

  return {
    data: data?.data,
    isLoading,
    error
  };
};
