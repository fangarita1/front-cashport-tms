"use client";

import { VehicleInfoTab } from "@/components/organisms/logistics/vehicles/vehiclesInfo/VehicleInfo";


function VehicleInfoPage({ params }: { params: { id: string } }) {
  return <VehicleInfoTab idParam={params.id} />;
}

export default VehicleInfoPage;
