export interface SendCarrierRequest {
  carrierRequest: CarrierRequest[];
}

export interface CarrierRequest {
  id_transfer_request: number;
  id_carrier: number;
  id_vehicle_type: number;
  fare: number;
  id_trip: number;
  id_pricing: number;
}
