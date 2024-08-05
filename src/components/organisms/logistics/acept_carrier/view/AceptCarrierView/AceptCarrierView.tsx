"use client";
import React, { useEffect, useState } from "react";
import { Collapse, Flex } from "antd";
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

  const groupedData = carriers.reduce((acc, item) => {
    if (!acc[item.status]) {
      acc[item.status] = [];
    }
    acc[item.status].push(item);
    return acc;
  }, {} as Record<string, ICarriersRequestList[]>);

  console.log("filter:", carriers.map(a => a.status))

  return (
    <Flex className={styles.wrapper}>
      <Collapse
        className={styles.collapses}
        defaultActiveKey={"guid"}
        items={Object.entries(groupedData).map(([status, statusData]) => ({
          key: status,
          label: (
            <LabelCollapse
              status={statusData[0].statusdesc}
              quantity={statusData.length}
              color={statusData[0].color}
              quantityText="CR"
              removeIcons
            />
          ),
          children: (
            <CarrierTable
              carrierData={statusData}
              setSelectedRows={setSelectedRows}
              loading={loading}
            />
          )
        }))}
      />
    </Flex>
  );
}
