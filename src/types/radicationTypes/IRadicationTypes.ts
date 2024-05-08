export interface IRadicationTypes {
  status: number;
  message: string;
  data: IRadicationType[];
}

export interface IRadicationType {
  id: number;
  radication_name: string;
}
