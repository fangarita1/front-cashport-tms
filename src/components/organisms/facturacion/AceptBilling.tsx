"use client";
import { Flex } from "antd";
import UiSearchInput from "@/components/ui/search-input/search-input";
import AceptBillingView from "./view/AceptBillingView/AceptBillingView";
import styles from "./AceptBilling.module.scss";
import { getAllBillingList } from "@/services/billings/billings";
import { useEffect, useState } from "react";
import { FilterProjects } from "@/components/atoms/Filters/FilterProjects/FilterProjects";
import Container from "@/components/atoms/Container/Container";

export default function AceptBilling() {
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
  };

  return (
    <Container>
      <Flex className={styles.filters} style={{ marginBottom: "0.5rem" }} gap={8}>
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
      <AceptBillingView billings={billings} loading={loading} />
    </Container>
  );
}
