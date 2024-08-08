"use client";

import { CreateTransferRequestView } from "@/components/organisms/logistics/orders/CreateTransferRequestView/CreateTransferRequestView";


function CreateTransferRequestPage({ params }: { params: { id: string } }) {
  return <CreateTransferRequestView params={params} />;
}

export default CreateTransferRequestPage;