export interface IUserAxios {
  data: WelcomeData;
  status: number;
  statusText: string;
  headers: WelcomeHeaders;
  config: Config;
  request: Request;
}

export interface Config {
  transitional: Transitional;
  adapter: string[];
  transformRequest: null[];
  transformResponse: null[];
  timeout: number;
  xsrfCookieName: string;
  xsrfHeaderName: string;
  maxContentLength: number;
  maxBodyLength: number;
  env: Request;
  headers: ConfigHeaders;
  method: string;
  url: string;
}

export interface Request {}

export interface ConfigHeaders {
  Accept: string;
  Authorization: string;
}

export interface Transitional {
  silentJSONParsing: boolean;
  forcedJSONParsing: boolean;
  clarifyTimeoutError: boolean;
}

export interface WelcomeData {
  status: number;
  message: string;
  data: IUserData;
}

export interface IUserData {
  ID: number;
  EMAIL: string;
  PHONE: string;
  USER_NAME: string;
  POSITION: string;
  NOTIFICATION_CONFIG: null;
  UUID: string;
  is_super_admin: number;
  IS_DELETED: number;
  ACTIVE: number;
  ROL_ID: number;
  PROJECT_ID: number;
  PROJECT_DESCRIPTION: string;
  ROL_NAME: string;
  USER_ZONES: UserZone[];
  USER_PERMISIONS: UserPermision[];
  BUSSINESS_RULES: IBusinessRules[];
  USER_CHANNELS: User[];
  USER_LINES: User[];
  USER_SUBLINES: User[];
}

export interface User {
  ID: number;
}

export interface UserPermision {
  PERMISSIONS: Permissions;
  COMPONENT_ID: number;
}

export interface Permissions {
  read: boolean;
  write: boolean;
  delete: boolean;
}

export interface UserZone {
  ZONE_ID: number;
  ZONE_DESCRIPTION: string;
}

export interface ISubLines {
  SUBLINE_DESCRIPTION: string;
  SUBLINE_ID: number;
}
interface ILine {
  DESCRIPTION_LINE: string;
  LINE_ID: number;
  SUBLINES: ISubLines[];
}
export interface IBusinessRules {
  CHANNEL_DESCRIPTION: string;
  CHANNEL_ID: number;
  LINES: ILine[];
}

export interface WelcomeHeaders {
  "content-type": string;
}
