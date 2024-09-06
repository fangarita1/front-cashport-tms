import { INovelty } from "../novelty/INovelty";

export interface ITripJourney {
  id: number;
  id_journey: number;
  plate_number: string | null;
  provider: string;
  description: string;
  fare: number;
  surcharge: number;
  total: number;
  trip_status: string;
  trip_status_id: string;
  trip_status_color: string;
  novelties: INovelty[];
  vehicle_type?: string;
}

export interface ITransferJourney {
  id: number;
  description: string;
  start_date: Date;
  end_date: Date;
  start_location: string;
  end_location: string;
  trips: ITripJourney[];
}
