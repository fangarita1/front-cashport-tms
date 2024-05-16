"use client";
import { FC, useState } from "react";
import { CaretLeft } from "phosphor-react";
import UiFilterDropdown from "@/components/ui/ui-filter-dropdown";
import styles from "./client-details.module.scss";
import UiTabs from "@/components/ui/ui-tabs";
import Dashboard from "../dashboard";
import InvoiceActionsModal from "../invoice-actions-modal";

interface ClientDetailsProps {}

const ClientDetails: FC<ClientDetailsProps> = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <div className={styles.wrapper}>
      <div className={styles.containerHeader}>
        <div className={styles.back}>
          <CaretLeft className={styles.icon} />
          Coopidrogas
        </div>
        <UiFilterDropdown />
      </div>
      <UiTabs
        tabs={[
          "Dashboard",
          "Cartera",
          "Ajustes contables",
          "Pagos",
          "Novedades",
          "Aplicación",
          "Contactos",
          "Historial"
        ]}
        className={styles.tabs}
        onTabClick={setSelectedTab}
      />
      {selectedTab === 0 && <Dashboard />}
      <InvoiceActionsModal />
    </div>
  );
};

export default ClientDetails;
