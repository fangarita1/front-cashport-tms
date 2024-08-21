import { Metadata } from "next";
import AceptBillingWrapper from "@/components/organisms/facturacion/wrapper/AceptBillingWrapper";

export const metadata: Metadata = {
  title: "Facturación",
  description: "Facturación"
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AceptBillingWrapper>{children}</AceptBillingWrapper>;
}
