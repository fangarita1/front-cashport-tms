"use client";
import React, { useEffect, useState } from "react";
import { Collapse, Flex, Spin } from "antd";
import LabelCollapse from "@/components/ui/label-collapse";
import CarrierTable from "@/components/molecules/tables/CarrierTable/CarrierTable";
import styles from "./AceptCarrierView.module.scss";
import { ICarriersRequestList } from "@/types/logistics/schema";

interface AceptCarrierViewProps {
  carriers: ICarriersRequestList[];
  loading: boolean;
}

export default function AceptCarrierView({ carriers, loading }: AceptCarrierViewProps) {
  const [selectedRows, setSelectedRows] = useState<any[] | undefined>();

  return (
    <Flex className={styles.wrapper}>
      {loading ? (
        <Spin style={{ margin: "auto", padding: "200px" }} />
      ) : (
        <Collapse
          className={styles.collapses}
          defaultActiveKey={"0"}
          items={
            carriers
              ? Object.entries(carriers).map(([key, carriersState]) => ({
                  key: key,
                  label: (
                    <LabelCollapse
                      status={carriersState.description}
                      quantity={carriersState.carrierrequests.length}
                      color={carriersState.color}
                      quantityText="CR"
                      removeIcons
                    />
                  ),
                  children: (
                    <CarrierTable
                      carrierData={carriersState.carrierrequests}
                      setSelectedRows={setSelectedRows}
                      loading={loading}
                    />
                  )
                }))
              : []
          }
        />
      )}
    </Flex>
  );
}
