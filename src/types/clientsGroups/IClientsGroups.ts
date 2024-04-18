export interface IClientsGroupsFull {
  status: number;
  message: string;
  data: IClientsGroups[];
  pagination: Pagination;
}

interface IClient {
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

export interface Pagination {
  page: number;
  total: number;
}
