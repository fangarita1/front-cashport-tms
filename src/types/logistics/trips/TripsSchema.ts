export interface TripsCreation {
  id_journey: number;
  id_transfer_request: number;
  trips: TripCreation[];
}
export interface TripCreation {
  id: number;
  id_vehicle_type: number;
  materialByTrip: MaterialByTrip[];
  personByTrip: { id_person_transfer_request: number }[];
}
export interface MaterialByTrip {
  id_material: number;
  units: number;
}

export interface JourneyTripPricing {
  id_journey: number;
  start_date: string;
  end_date: string;
  start_location_desc: string;
  end_location_desc: string;
  id_type_service: number;
  trips: TripCarriersPricing[];
  community_name?: string;
  is_community?: 0 | 1;
}

export interface TripCarriersPricing {
  id_trip: number;
  vehicle_type: number;
  vehicle_type_desc: string;
  carriers_pricing: CarriersPricing[];
}

export interface CarriersPricing {
  id_carrier_pricing: number;
  valid_from: string;
  valid_to: string;
  description: string;
  disponibility: number;
  price?: number;
  id_vehicle_type: number;
  id_carrier: number;
  nit: string;
  fee_description: string;
}

export interface CarriersPricingModal extends CarriersPricing {
  checked?: boolean;
}

export interface Trip {
  id_trip: number;
  vehicle_type: number;
  vehicle_type_desc: string;
  carriers_pricing: CarriersPricingModal[];
}

export interface Journey {
  id_journey: number;
  start_date: string;
  end_date: string;
  start_location_desc: string;
  end_location_desc: string;
  id_type_service: number;
  community_name?: string;
  is_community: 0 | 1;
}

export interface MockedTrip {
  trip: Trip;
  journey: Omit<JourneyTripPricing, "trips">;
}
