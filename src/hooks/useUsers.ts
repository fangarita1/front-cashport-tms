import useSWR from "swr";

import { fetcher } from "@/utils/api/api";
import { IUserSingle, IUsers } from "@/types/users/IUsers";

interface Props {
  page?: number;
  idProject: string;
  rolesId: string[];
  zonesId: string[];
  activeUsers: "all" | "active" | "inactive";
  channel: { id: number; name: string }[];
  line: { id: number; name: string }[];
  subline: { id: number; name: string }[];
}

export const useUsers = ({
  page,
  idProject,
  zonesId,
  rolesId,
  activeUsers,
  channel,
  line,
  subline
}: Props) => {
  const zonesQuery = zonesId.length > 0 ? `&zone=${zonesId.join(",")}` : "";
  const rolesQuery = rolesId.length > 0 ? `&rol=${rolesId.join(",")}` : "";
  const statusQuery =
    activeUsers === "active" || activeUsers === "inactive"
      ? `&active=${activeUsers === "active" ? 1 : 0}`
      : "";

  const channelQuery = channel.length > 0 ? `&chanel=${channel.join(",")}` : "";
  const lineQuery = line.length > 0 ? `&line=${line.join(",")}` : "";
  const sublineQuery = subline.length > 0 ? `&subline=${subline.join(",")}` : "";

  const pathKey = `/user/project/${idProject}?page=${page}${zonesQuery}${rolesQuery}${statusQuery}${channelQuery}${lineQuery}${sublineQuery}`;
  const { data, error } = useSWR<IUsers>(pathKey, fetcher, {});

  return {
    data: (data?.data as IUserSingle[]) || ([] as IUserSingle[]),
    loading: !error && !data
  };
};
