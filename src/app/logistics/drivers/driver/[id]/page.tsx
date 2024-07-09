"use client";

import { DriverInfoView } from "@/components/organisms/logistics/driver/driverInfo/driverInfo";

function DriverInfoPage({ params }: { params: { id: string } }) {
  return <DriverInfoView idParam={params.id} statusForm={""}/>;
}

export default DriverInfoPage;
