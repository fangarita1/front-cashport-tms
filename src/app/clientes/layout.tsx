import { SideBar } from "@/components/molecules/SideBar/SideBar";
import Header from "@/components/organisms/header";
import { Metadata } from "next";
import { FC, ReactNode } from "react";

export const metadata: Metadata = {
  title: "Clientes",
  description: "Clientes"
};

interface ClientsLayoutProps {
  children?: ReactNode;
}

const ClientsLayout: FC<ClientsLayoutProps> = ({ children }) => {
  return (
    <div className="page">
      <SideBar />
      <div className="mainContent">
        <Header title="Clientes" />
        {children}
      </div>
    </div>
  );
};

export default ClientsLayout;
