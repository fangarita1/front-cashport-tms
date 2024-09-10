import { Metadata } from "next";
import ProvidersWrapper from "@/components/organisms/logistics/proveedores/wrapper/ProvidersWrapper";
export const metadata: Metadata = {
  title: "Proveedores",
  description: "Vista general de proveedores"
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return <ProvidersWrapper>{children}</ProvidersWrapper>;
}
