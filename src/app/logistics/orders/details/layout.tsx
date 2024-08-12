import { Metadata } from "next";
import DetailsOrderWrapper from "@/components/organisms/logistics/orders/DetailsOrderView/wrapper/DetailsOrderWrapper"; 

export const metadata: Metadata = {
  title: "Detalle viaje",
  description: "Detalle Viaje"
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <DetailsOrderWrapper>{children}</DetailsOrderWrapper>;
}
