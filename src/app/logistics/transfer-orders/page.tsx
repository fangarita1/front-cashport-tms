"use client";
import { TransferOrders } from "@/components/organisms/logistics/transfer-orders/TransferOrders";
import ViewWrapper from "@/components/organisms/ViewWrapper/ViewWrapper";

function TransferOrderPage() {
  return (
    <ViewWrapper headerTitle="Ordenes de transferencia" showNotifications>
      <TransferOrders />
    </ViewWrapper>
  );
}

export default TransferOrderPage;
