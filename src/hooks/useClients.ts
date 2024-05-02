import useSWR from "swr";

import { fetcher } from "@/utils/api/api";
import { IClient, IClients } from "@/types/clients/IClients";

interface PropsUseClients {
  page?: number;
  idProject: string;
  city: number[];
  holding: number[];
  risk: number[];
  payment_condition: number[];
  radication_type: number[];
  status: number[];
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
  const paymentConditionQuery = payment_condition ? `&payment_condition=${payment_condition}` : "";
  const radicationTypeQuery =
    radication_type.length > 0 ? `&radication_type=${radication_type.join(",")}` : "";
  const statusQuery = status ? `&status=${status}` : "";

  const pathKey = `/client/project/${idProject}?page=${page}${holdingQuery}${cityQuery}${riskQuery}${paymentConditionQuery}${radicationTypeQuery}${statusQuery}`;

  const { data, error } = useSWR<IClients>(pathKey, fetcher, {});

  return {
    data: (data?.data as IClient[]) || ([] as IClient[]),
    loading: !error && !data
  };
};
