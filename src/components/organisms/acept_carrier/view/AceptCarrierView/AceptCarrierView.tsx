"use client";
import React, { useState } from "react";
import { Collapse, Flex } from "antd";
import LabelCollapse from "@/components/ui/label-collapse";
import CarrierTable from "@/components/molecules/tables/CarrierTable/CarrierTable";
import { Providers, ProvidersList } from "@/types/acept_carrier/acept_carrier";
import styles from "./AceptCarrierView.module.scss";
import { ICarriersRequestList } from "@/types/logistics/schema";

interface AceptCarrierViewProps {
  carriers: ICarriersRequestList[];
}

export default function AceptCarrierView({ carriers }: AceptCarrierViewProps) {
  const [selectedRows, setSelectedRows] = useState<any[] | undefined>();

  return (
    <Flex className={styles.wrapper}>
      <Collapse
        className={styles.collapses}
        items={carriers?.map((carriersList: ICarriersRequestList) => ({
          key: carriersList.id,
          label: (
            <LabelCollapse
              status={carriersList.statusdesc}
              quantity={carriers.length}
              color={carriersList.color}
              quantityText="TR"
              removeIcons
            />
          ),
          children: (
            <CarrierTable
              carrierData={carriers}
              setSelectedRows={setSelectedRows}
            />
          )
        }))}
      />
    </Flex>
  );
}
