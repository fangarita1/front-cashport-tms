import { Pagination } from "../global/IGlobal";

export interface IClientsGroupsFull {
  status: number;
  message: string;
  data: IClientsGroups[];
  pagination: Pagination;
}

export interface IClient {
  id: number;
  client_name: string;
  holding_name: string | null;
  bussiness_name: string;
  client_type_name: string;
}

export interface IClientsGroups {
  id: number;
  group_name: string;
  clients: IClient[];
  active: number;
  project_id: number;
  is_deleted: number;
  shipto_count: number;
  subscribers: number;
}

export interface IGroupsByUser {
  status: number;
  message: string;
  data: IGroupByUser[];
}

export interface IGroupByUser {
  id: number;
  user_id: number;
  group_id: number;
  group_name: string;
  project_id: number;
}

export interface ISingleClientGroup {
  id: number;
  group_name: string;
  clients: IClient[];
}
