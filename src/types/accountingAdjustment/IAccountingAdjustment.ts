export interface DiscountRequestBody {
  type: number; //1 nota debito, 2 nota credito, 3 descuento
  motive: number;
  amount: number;
  percentage: number;
  date_of_issue: string;
  expiration_date: string;
  validity_range: {
    start: string;
    end: string;
  };
  users_approved: number[];
  project_id: number;
  client_id: number;
}
export interface Motive {
  id: number;
  name: string;
}

export interface GetMotivesResponse {
  status: number;
  message: string;
  data: Motive[];
}
