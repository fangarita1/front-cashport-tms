export interface IClientTypes {
  status: number;
  message: string;
  data: IClientType[];
}

export interface IClientType {
  id: number;
  clientType: string;
}
