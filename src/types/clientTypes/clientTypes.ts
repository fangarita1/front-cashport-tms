export interface IClientTypes {
  status: number;
  message: string;
  data: IClientType[];
}

export interface IClientType {
  id: number;
  clientType: string;
}

export interface ICreateDocumentByClient {
  [key: string]: any;
  client_type: number;
  required: number;
  document_name: string;
  template?: File;
}
