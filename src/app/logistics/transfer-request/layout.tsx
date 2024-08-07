import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Solicitud de transferencia",
  description: "Solicitud de transferencia"
};

export default function TransferRequestLayout({children}: {children: React.ReactNode}) {
  return <>{children}</>
}