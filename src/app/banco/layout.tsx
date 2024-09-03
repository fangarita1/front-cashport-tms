import { Metadata } from "next";
import { SideBar } from "@/components/molecules/SideBar/SideBar";
import Header from "@/components/organisms/header";

export const metadata: Metadata = {
  title: "Bancos",
  description: "Bancos"
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="page">
      <SideBar />
      <div className="mainContent">
        <Header title="Bancos" />
        {children}
      </div>
    </div>
  );
}
