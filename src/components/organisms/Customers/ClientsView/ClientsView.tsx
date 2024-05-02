"use client";
import { Flex, Typography } from "antd";

import { SideBar } from "@/components/molecules/SideBar/SideBar";
import { NavRightSection } from "@/components/atoms/NavRightSection/NavRightSection";

import "./clientsview.scss";
import { ClientsViewTable } from "@/components/molecules/tables/ClientsViewTable/ClientsViewTable";

const { Title } = Typography;

export const CustomersView = () => {
  return (
    <main className="mainClients">
      <SideBar />
      <Flex vertical className="contentClients">
        <Flex justify="space-between" align="center">
          <Flex gap={"1rem"} align="center">
            <Title level={2} className="titleName">
              Clientes
            </Title>
          </Flex>
          <NavRightSection />
        </Flex>
        <ClientsViewTable />
      </Flex>
    </main>
  );
};
