"use client";

import { CreateMaterialView } from "@/components/organisms/logistics/configuration/materials/createMaterial/createMaterial";

function MaterialInfoPage() {
  return <CreateMaterialView params={{
    id: "",
    locationId: ""
  }} />;
}

export default MaterialInfoPage;
