export interface DiscountBasics {
  id: number;
  project_id: number;
  discount_type_id: number;
  discount_type: string;
  discount_definition: string;
  client_name?: string;
  discount_name: string;
  description: string;
  start_date: string;
  end_date?: string;
  apply_others_discounts: any;
  priority: any;
  min_units_by_order: number;
  discount_computation: number;
  id_client: any;
  contract_archive: any;
  status: number;
  is_deleted: number;
}
