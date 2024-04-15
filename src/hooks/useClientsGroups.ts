import useSWR from "swr";
import { fetcher } from "@/utils/api/api";
import { IClientsGroups, IClientsGroupsFull } from "@/types/clientsGroups/IClientsGroups";

interface Props {
  page?: number;
  idProject: string;
  clients: any[];
  subscribers: any[];
  // shipToCount: number;
  activeUsers: "all" | "active" | "inactive";
}

export const useClientsGroups = ({
  page,
  idProject,
  clients,
  subscribers,
  // shipToCount,
  activeUsers
}: Props) => {
  const clientsQuery = clients.length > 0 ? `&zone=${clients.join(",")}` : "";
  const subsQuery = subscribers.length > 0 ? `&rol=${subscribers.join(",")}` : "";

  // const shipToQuery = shipToCount.length > 0 ? `&chanel=${shipToCount.join(",")}` : "";

  const statusQuery =
    activeUsers === "active" || activeUsers === "inactive"
      ? `&active=${activeUsers === "active" ? 1 : 0}`
      : "";

  const pathKey = `/group-client/?project_id=${idProject}&page=${page}${clientsQuery}${subsQuery}${statusQuery}`;

  const { data, error } = useSWR<IClientsGroupsFull>(pathKey, fetcher, {});

  return {
    data: (data?.data as IClientsGroups[]) || ([] as IClientsGroups[]),
    loading: !error && !data
  };
};
