interface UserData {
  ID: number;
  EMAIL: string;
  PHONE: string;
  USER_NAME: string;
  POSITION: string;
  NOTIFICATION_CONFIG: null;
  UUID: string;
  PHOTO: string;
  is_super_admin: number;
  IS_DELETED: number;
  ACTIVE: number;
  ROL_ID: number;
  PROJECT_ID: number;
  PROJECT_DESCRIPTION: string;
  ROL_NAME: string;
  USER_ZONES: string;
  USER_PERMISIONS: string;
  BUSSINES_RULES: string;
}

export interface UserByTokenResponse {
  status: number;
  message: string;
  data: UserData;
}
