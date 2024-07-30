"use client";
import React, { useState } from "react";
import { Collapse, Flex } from "antd";
import LabelCollapse from "@/components/ui/label-collapse";
import ProvidersTable from "@/components/molecules/tables/ProvidersTable/ProvidersTable";
import { Providers, ProvidersList } from "@/types/providers/providers";
import styles from "./ProvidersView.module.scss";

interface ProvidersViewProps {
  type: keyof Providers,
  providers: Providers
}

export default function ProvidersView({type, providers}: ProvidersViewProps) {
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
            <ProvidersTable
              providerData={providersList.providersDetail}
              setSelectedRows={setSelectedRows}
            />
          )
        }))}
      />
    </Flex>
  );
}
