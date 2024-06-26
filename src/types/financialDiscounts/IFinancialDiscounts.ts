interface ValidityRange {
  start: string;
  end: string;
}

interface UserApproved {
  id: number;
  financial_discount_id: number;
  user_id: number;
  user_name: string;
}

export interface IFinancialDiscount {
  id: number;
  client_id: number;
  project_id: number;
  project_name: string;
  initial_value: number;
  current_value: number;
  comments: string | null;
  files: any; // Adjust type as necessary
  create_at: string;
  update_at: string;
  delete_at: string | null;
  status_id: number;
  status_name: string;
  document_type_id: number;
  document_type_name: string;
  percentage: number | null;
  date_of_issue: string;
  motive_id: number;
  motive_name: string;
  validity_range: ValidityRange;
  users_aproved: UserApproved[];
}

export interface IStatusFinancialDiscounts {
  status_id: number;
  financial_discounts: IFinancialDiscount[];
  temp_discount_total: number;
  count: number;
}

export interface IFinancialDiscounts {
  status: number;
  message: string;
  data: IStatusFinancialDiscounts[];
}
