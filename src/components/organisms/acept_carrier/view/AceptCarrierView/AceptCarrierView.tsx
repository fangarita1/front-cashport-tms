"use client";
import React, { useState } from "react";
import { Collapse, Flex } from "antd";
import LabelCollapse from "@/components/ui/label-collapse";
import CarrierTable from "@/components/molecules/tables/CarrierTable/CarrierTable";
import { Providers, ProvidersList } from "@/types/acept_carrier/acept_carrier";
import styles from "./AceptCarrierView.module.scss";

interface AceptCarrierViewProps {
  type: keyof Providers,
  providers: Providers
}

export default function AceptCarrierView({type, providers}: AceptCarrierViewProps) {
  const [selectedRows, setSelectedRows] = useState<any[] | undefined>();
  
  const currentProviders = providers[type];

  return (
    <Flex className={styles.wrapper}>
      <Collapse
        className={styles.collapses}
        items={currentProviders?.map((providersList: ProvidersList) => ({
          key: providersList.status_id,
          label: (
            <LabelCollapse
              status={providersList.status}
              quantity={providersList.providersDetail.length}
              color={providersList.color}
              quantityText="TR"
              removeIcons
            />
          ),
          children: (
            <CarrierTable
              providerData={providersList.providersDetail}
              setSelectedRows={setSelectedRows}
            />
          )
        }))}
      />
    </Flex>
  );
}
