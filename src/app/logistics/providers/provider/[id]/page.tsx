"use client";

import { CarrierInfoView } from "@/components/organisms/logistics/proveedores/providerInfo/CarrierInfo";

function CarrierInfoPage({ params }: { params: { id: string } }) {
  return <CarrierInfoView idCarrierParam={params.id} />;
}

export default CarrierInfoPage;
