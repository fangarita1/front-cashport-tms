export interface FinancialDiscount {
  id: number;
  sucursal_id: number | null;
  line_id: number | null;
  sub_line_id: number | null;
  project_id: number;
  dependecy_sucursal: number;
  initial_value: number;
  current_value: number;
  expiration_date: string;
  comments: string | null;
  files: any | null;
  create_at: string;
  update_at: string;
  delete_at: string | null;
  status_id: number;
  document_type_id: number;
  client_id: number;
  percentage: number | null;
  is_discount: number | null;
  date_of_issue: string;
  erp_id: number | null;
  motive_id: number | null;
  validity_range: string | null;
  earlypay_date: string | null;
  is_legalized: number;
  status_name: string;
  project_name: string;
  document_type_name: string;
  motive_name: string | null;
  financial_status_id: number;
}

export interface StatusFinancialDiscounts {
  status_id: number;
  status_name: string;
  color: string;
  financial_discounts_legalized: FinancialDiscount[];
  temp_discount_total_legalized: number;
  count_legalized: number;
  financial_discounts_not_legalized: FinancialDiscount[];
  temp_discount_total_not_legalized: number;
  count_not_legalized: number;
}

export interface FinancialDiscountsResponse {
  data: StatusFinancialDiscounts[];
}
