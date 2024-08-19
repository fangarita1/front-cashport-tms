export interface TripsCreation {
  id_journey: number;
  id_transfer_request: number;
  trips: TripCreation[];
}
export interface TripCreation {
  id: number;
  id_vehicle_type: number;
  materialByTrip: MaterialByTrip[];
}
export interface MaterialByTrip {
  id_material: number;
  units: number;
}
