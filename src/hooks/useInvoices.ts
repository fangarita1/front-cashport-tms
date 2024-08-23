import useSWR from "swr";
import { fetcher } from "@/utils/api/api";
import { IInvoices } from "@/types/invoices/IInvoices";

interface Props {
  clientId: number;
  projectId: number;
  page?: number;
  limit?: number;
  paymentAgreement?: number;
  radicationType?: number;
  lines?: number[];
  zones?: number[];
  channels?: number[];
  searchQuery?: string;
}

export const useInvoices = ({
  clientId,
  projectId,
  page = 1,
  limit = 50,
  paymentAgreement,
  radicationType,
  lines,
  zones,
  channels,
  searchQuery
}: Props) => {
  const pageQuery = `page=${page}`;
  const limitQuery = `&limit=${limit}`;
  const paymentAgreementQuery =
    paymentAgreement !== undefined && paymentAgreement !== null
      ? `&payment_agrement=${paymentAgreement}`
      : "";
  const radicationTypeQuery =
    radicationType !== undefined && radicationType !== null
      ? `&radication_type=${radicationType}`
      : "";
  const linesQuery = lines && lines.length > 0 ? `&line=${lines.join(",")}` : "";
  const zonesQuery = zones && zones.length > 0 ? `&zone=${zones.join(",")}` : "";
  const channelsQuery = channels && channels.length > 0 ? `&channel=${channels.join(",")}` : "";
  const searchQueryParam = searchQuery
    ? `&id=${encodeURIComponent(searchQuery.toLowerCase().trim())}`
    : "";

  const pathKey = `/invoice/client/${clientId}/project/${projectId}?${pageQuery}${limitQuery}${paymentAgreementQuery}${radicationTypeQuery}${linesQuery}${zonesQuery}${channelsQuery}${searchQueryParam}`;

  const { data, error } = useSWR<IInvoices>(pathKey, fetcher);

  return {
    data: data?.data,
    isLoading: !error && !data,
    error
  };
};
