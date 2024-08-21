export interface TransferRequestFinish {
  id: number;
  providers: CarrierPricingFinish[];
}

export interface CarrierPricingFinish {
  id_trip: number;
  provider: number;
  id_carrier_request: number;
}
