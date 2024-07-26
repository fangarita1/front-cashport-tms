import { Metadata } from "next";
import ProvidersWrapper from "@/components/organisms/providers/wrapper/ProvidersWrapper";

export const metadata: Metadata = {
  title: "Ordenes de transferencia",
  description: "Ordenes de transferencia"
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <ProvidersWrapper>{children}</ProvidersWrapper>;
}
