import { NavRightSection } from "@/components/atoms/NavRightSection/NavRightSection";
import { SideBar } from "@/components/molecules/SideBar/SideBar";
import "./layout.scss";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Clientes",
  description: "Clientes"
};

export default function ClientsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="clientsLayout">
      <SideBar />
      <div className="clientsView">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            <div className="titleName">Clientes</div>
          </div>
          <NavRightSection />
        </div>
        <div className="contentClients">{children}</div>
      </div>
    </div>
  );
}
