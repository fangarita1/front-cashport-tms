"use client";
import { useState } from "react";
import { Flex } from "antd";
import { NavRightSection } from "@/components/atoms/NavRightSection/NavRightSection";

import "./clientsview.scss";
import { ClientsViewTable } from "@/components/molecules/tables/ClientsViewTable/ClientsViewTable";
import AccountingAdjustmentsModal from "@/modules/clients/containers/accounting-adjustments-modal";

export const CustomersView = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <main className="mainClients">
      <Flex vertical className="contentClients">
        <Flex justify="space-between" align="center">
          <NavRightSection />
        </Flex>
        <ClientsViewTable />
      </Flex>
      <AccountingAdjustmentsModal show={showModal} onClose={() => setShowModal(false)} />
    </main>
  );
};
