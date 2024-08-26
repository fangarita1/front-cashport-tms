import useSWR from "swr";

import { fetcher } from "@/utils/api/api";
import { IClient, IClients } from "@/types/clients/IClients";
import { Pagination } from "@/types/global/IGlobal";

interface PropsUseClients {
  page?: number;
  idProject: string;
  city: number[];
  holding: number[];
  risk: number[];
  payment_condition: number[];
  radication_type: number[];
  status: number[];
  messageApi?: any;
  searchQuery: string;
}

export const useClients = ({
  page,
  idProject,
  holding,
  city,
  risk,
  payment_condition,
  radication_type,
  status
}: PropsUseClients) => {
  const holdingQuery = holding.length > 0 ? `&holding=${holding.join(",")}` : "";
  const cityQuery = city.length > 0 ? `&city=${city.join(",")}` : "";
  const riskQuery = risk.length > 0 ? `&risk=${risk.join(",")}` : "";
  const paymentConditionQuery =
    payment_condition && payment_condition.length > 0
      ? `&payment_condition=${payment_condition}`
      : "";
  const radicationTypeQuery =
    radication_type.length > 0 ? `&radication_type=${radication_type.join(",")}` : "";
  const statusQuery = status && status.length > 0 ? `&status=${status}` : "";

  const pathKey = `/client/project/${idProject}?page=${page}${holdingQuery}${cityQuery}${riskQuery}${paymentConditionQuery}${radicationTypeQuery}${statusQuery}`;

  const { data, error } = useSWR<IClients>(pathKey, fetcher, {});
  return {
    data: (data?.data as IClient[]) || ([] as IClient[]),
    loading: !error && !data
  };
};

export const useClientsTable = ({
  page,
  idProject,
  holding,
  city,
  risk,
  payment_condition,
  radication_type,
  status,
  searchQuery
}: PropsUseClients): {
  data: { data: IClient[]; message: string; pagination: Pagination };
  isLoading: boolean;
  error: any;
} => {
  const holdingQuery = holding.length > 0 ? `&holding=${holding.join(",")}` : "";
  const cityQuery = city.length > 0 ? `&city=${city.join(",")}` : "";
  const riskQuery = risk.length > 0 ? `&risk=${risk.join(",")}` : "";
  const paymentConditionQuery =
    payment_condition && payment_condition.length > 0
      ? `&payment_condition=${payment_condition}`
      : "";
  const searchQueryParam = searchQuery
    ? `&searchQuery=${encodeURIComponent(searchQuery.toLowerCase().trim())}`
    : "";
  const radicationTypeQuery =
    radication_type.length > 0 ? `&radication_type=${radication_type.join(",")}` : "";
  const statusQuery = status && status.length > 0 ? `&status=${status}` : "";
  const pathKey = `/client/project/${idProject}?page=${page}${holdingQuery}${cityQuery}${riskQuery}${paymentConditionQuery}${radicationTypeQuery}${statusQuery}${searchQueryParam}`;
  const { data, error, isLoading } = useSWR<{
    data: IClient[];
    message: string;
    pagination: Pagination;
  }>(pathKey, fetcher, {});
  if (data) {
    return { data, isLoading, error };
  } else {
    return {
      error,
      isLoading,
      data: {
        data: [],
        message: "Error fetching",
        pagination: {
          actualPage: 1,
          rowsperpage: 0,
          totalPages: 0,
          totalRows: 0
        }
      }
    };
  }
};
