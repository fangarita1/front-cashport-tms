import { Metadata } from "next";
import AceptCarrierWrapper from "@/components/organisms/logistics/acept_carrier/wrapper/AceptCarrierWrapper";

export const metadata: Metadata = {
  title: "Ordenes de transferencia",
  description: "Ordenes de transferencia"
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AceptCarrierWrapper>{children}</AceptCarrierWrapper>;
}
