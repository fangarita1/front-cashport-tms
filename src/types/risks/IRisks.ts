export interface IRisks {
  status: number;
  message: string;
  data: IRisk[];
}

export interface IRisk {
  id: number;
  risk_name: string;
  is_deleted: boolean;
}
