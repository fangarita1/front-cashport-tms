"use client";
import React, { useEffect, useState } from "react";
import { Collapse, Flex } from "antd";
import LabelCollapse from "@/components/ui/label-collapse";
import BillingTable from "@/components/molecules/tables/BillingTable/BillingTable";
import styles from "./AceptBillingView.module.scss";
import { IBillingsRequestList } from "@/types/logistics/schema";

interface AceptBillingViewProps {
  billings: IBillingsRequestList[];
  loading: boolean;
}

export default function AceptBillingView({ billings, loading }: AceptBillingViewProps) {
  const [selectedRows, setSelectedRows] = useState<any[] | undefined>();

  return (
    <Flex className={styles.wrapper}>
      <Collapse
        className={styles.collapses}
        defaultActiveKey={"0"}
        items={billings ? Object.entries(billings).map(([key, billingsState]) => ({
          key: key,
          label: (
            <LabelCollapse
              status={billingsState.statusDesc}
              quantity={billingsState.billings.length}
              color={billingsState.statusColor}
              quantityText="TR"
              removeIcons
            />
          ),
          children: (
            <BillingTable
              billingData={billingsState.billings}
              setSelectedRows={setSelectedRows}
              loading={loading}
            />
          )
        })): []}
      />
    </Flex>
  );
}
