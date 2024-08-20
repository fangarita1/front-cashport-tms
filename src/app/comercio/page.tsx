"use client";
import OrdersView from "@/modules/commerce/containers/orders-view/orders-view";
import { MessageProvider } from "@/context/MessageContext";

function Page() {
  return (
    <MessageProvider>
      <OrdersView />
    </MessageProvider>
  );
}

export default Page;
