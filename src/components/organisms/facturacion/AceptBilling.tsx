"use client";
import { Flex } from "antd";
import UiSearchInput from "@/components/ui/search-input/search-input";
import AceptBillingView from "./view/AceptBillingView/AceptBillingView";
import styles from "./AceptCarrier.module.scss";
import { getAllBillingList } from "@/services/billings/billings";
import { useEffect, useState } from "react";
import { FilterProjects } from "@/components/atoms/Filters/FilterProjects/FilterProjects";

export default function AceptBIlling() {
  const [billings, setBillings] = useState<any[]>([]);
  const [selectFilters, setSelectFilters] = useState({
    country: [] as string[],
    currency: [] as string[]
  });
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    loadBillingRequestTransferList();
  }, []);

  const loadBillingRequestTransferList = async () => {
    setLoading(true);
    const result = await getAllBillingList();
    setBillings(result);
    setLoading(false);
  }

  return (
    <div className={styles.wrapper}>
      <Flex className={styles.filters} gap={18}>
        <UiSearchInput
          placeholder="Buscar"
          onChange={(event) => {
            setTimeout(() => {
              console.info(event.target.value);
            }, 1000);
          }}
        />
        <FilterProjects setSelecetedProjects={setSelectFilters} height="48" />
      </Flex>
      <Flex vertical>
        <AceptBillingView billings={billings} loading={loading}/>
      </Flex>
    </div>
  );
}
