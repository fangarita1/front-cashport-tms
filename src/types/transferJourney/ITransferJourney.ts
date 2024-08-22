export interface ITripJourney {
  id: number;
  id_journey: number;
  plate_number: string | null;
  provider: string;
  description: string;
  fare: number;
  surcharge: number;
  total: number;
}

export interface ITransferJourney {
  id: number;
  description: string;
  start_date: Date;
  end_date: Date;
  start_location: string;
  end_location: string;
  trips: ITripJourney[]
}