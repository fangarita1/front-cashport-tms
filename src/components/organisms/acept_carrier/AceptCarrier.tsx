"use client";
import { Flex, Tabs } from "antd";
import UiSearchInput from "@/components/ui/search-input/search-input";
import FiltersProviders from "@/components/atoms/Filters/FiltersProviders/FiltersProviders";
import AceptCarrierView from "./view/AceptCarrierView/AceptCarrierView";
import { Providers } from "@/types/acept_carrier/acept_carrier";
import { mockProviders } from "./mockdata";
import styles from "./AceptCarrier.module.scss";
import { getAllTransferRequestList } from "@/services/logistics/transfer-requests";
import { useEffect, useState } from "react";
import { ICarriersRequestList } from "@/types/logistics/schema";

type OrderStatus = "upcoming" | "ongoing" | "finalized";

export default function AceptCarrier() {
  const [carriers, setCarriers] = useState<ICarriersRequestList[]>([]);
  const [ordersByStatus, setOrdersByStatus] = useState<{
    upcoming: ICarriersRequestList[];
    ongoing: ICarriersRequestList[];
    finalized: ICarriersRequestList[];
  }>({
    upcoming: [],
    ongoing: [],
    finalized: []
  });

  const getOrderStatus = (startDate: string, endDate: string): OrderStatus => {
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (now < start) return "upcoming";
    if (now > end) return "ongoing";
    return "finalized";
  };

  useEffect(() => {
    loadTransferRequestsOrders();
  }, []);

  const loadTransferRequestsOrders = async () => {
    const result = await getAllTransferRequestList();
    setCarriers(result.data.data);
  };

  useEffect(() => {
    const categorizedOrders: {
      upcoming: ICarriersRequestList[];
      ongoing: ICarriersRequestList[];
      finalized: ICarriersRequestList[];
    } = {
      upcoming: [],
      ongoing: [],
      finalized: []
    };

    carriers.forEach((order) => {
      const status = getOrderStatus(order.start_date, order.end_date);
      categorizedOrders[status].push(order);
    });

    setOrdersByStatus(categorizedOrders);
  }, [carriers]);

  console.log("carriers:", carriers);

  return (
    <div className={styles.wrapper}>
      <Flex className={styles.filters}>
        <UiSearchInput
          placeholder="Buscar"
          onChange={(event) => {
            setTimeout(() => {
              console.info(event.target.value);
            }, 1000);
          }}
        />
        <FiltersProviders />
      </Flex>
      <Flex vertical>
        <AceptCarrierView carriers={carriers} />
      </Flex>
    </div>
  );
}
