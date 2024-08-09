"use client";

import { CreateTransferRequest } from "@/components/organisms/logistics/orders/transfer_request/CreateTransferRequest";


function CreateTransferRequestPage({ params }: { params: { id: string } }) {
  return <CreateTransferRequest params={params} />;
}

export default CreateTransferRequestPage;