import TransferRequestWrapper from "@/components/organisms/logistics/orders/transfer_request/wrapper/TransferRequestWrapper";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Ordenes de transferencia",
  description: "Solicitud de transferencia"
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <TransferRequestWrapper>{children}</TransferRequestWrapper>;
}