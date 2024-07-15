"use client";

import { VehicleInfoView } from "@/components/organisms/logistics/vehicles/vehiclesInfo/VehicleInfo";

function VehicleInfoPage({ params }: { params: { id: string } }) {
  return <VehicleInfoView idParam={params.id} />;
}

export default VehicleInfoPage;
