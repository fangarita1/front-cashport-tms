export interface INovelty {
  id: number;
  novelty_id: number;
  name: string;
  url: string;
  created_at: Date;
  updated_at: Date;
}

export interface INovelty {
  id: number;
  trip_id: number;
  novelty_type: string;
  observation: string;
  value: number;
  status: string;
  status_id: string;
  created_by: string;
  quantity: number;
  evidences: INovelty[]
}