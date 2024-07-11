export interface IContact {
  id: number;
  client_id: number;
  contact_name: string;
  contact_phone: string;
  contact_email: string;
  name_position: string;
  contact_lastname: string;
  country_name: string;
  country_calling_code: string;
  country_calling_code_id: number;
  contact_position: string;
  contact_position_id: number;
}

export interface IGetContacts {
  status: number;
  data: IContact[];
  message: string;
}
