export interface IZones {
  status: number;
  message: string;
  data: IZone[];
}

export interface IZone {
  ID: number;
  PROJECT_ID: number;
  ZONE_DESCRIPTION: string;
  IS_DELETED: number;
}
