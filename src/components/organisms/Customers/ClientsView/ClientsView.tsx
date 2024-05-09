"use client";
import { Flex, Typography } from "antd";

import { SideBar } from "@/components/molecules/SideBar/SideBar";
import { NavRightSection } from "@/components/atoms/NavRightSection/NavRightSection";

import "./clientsview.scss";
import { ClientsViewTable } from "@/components/molecules/tables/ClientsViewTable/ClientsViewTable";
import { useState } from "react";
import { DetailClientView } from "@/components/organisms/Customers/DetailClientView/DetailClientView";

const { Title } = Typography;

interface IViewClientDetails {
  active: boolean;
  clientId: number | undefined;
  clientName: string | undefined;
  projectId: number | undefined;
}

export const ClientsView = () => {
  const [isViewClientDetails, setIsViewClientDetails] = useState<IViewClientDetails>({
    active: false,
    clientId: undefined,
    clientName: undefined,
    projectId: undefined
  });

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
        {isViewClientDetails.active ? (
          <DetailClientView
            setIsViewClientDetails={setIsViewClientDetails}
            isViewClientDetails={isViewClientDetails}
          />
        ) : (
          <ClientsViewTable setIsViewClientDetails={setIsViewClientDetails} />
        )}
      </Flex>
    </main>
  );
};
