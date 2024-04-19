export interface IUsers {
  status: number;
  message: string;
  data: IUserSingle[];
  pagination: Pagination;
}

export interface IUserSingle {
  ID: number;
  LINE_ID: number | null;
  SUBLINE_ID: number | null;
  ZONE_ID: number | null;
  EMAIL: string;
  PHONE: string;
  USER_NAME: string;
  POSITION: string;
  NOTIFICATION_CONFIG: null | string;
  UUID: string;
  is_super_admin: number;
  IS_DELETED: number;
  ACTIVE: number;
  ROL_ID: number;
  PROJECT_ID: number;
  PROJECT_DESCRIPTION: string;
  ROL_NAME: string;
}

export interface Pagination {
  page: number;
  total: number;
}
