"use client";
import { SideBar } from "@/components/molecules/SideBar/SideBar";
import styles from "./transferOrders.module.scss";
import UiSearchInput from "@/components/ui/search-input/search-input";
import { FilterProjects } from "@/components/atoms/Filters/FilterProjects/FilterProjects";
import { useState } from "react";
import { Request } from "./request/Request";
import { InProcess } from "./in-process/InProcess";
import { Completed } from "./completed/completed";
import { Button, Flex, message, Typography } from "antd";
import Header from "../../header";
import { DotsThree, Plus } from "phosphor-react";
import { transferOrderMerge } from "@/services/logistics/transfer-request";
import { useRouter } from "next/navigation";
import PrincipalButton from "@/components/atoms/buttons/principalButton/PrincipalButton";

const { Text } = Typography;

enum TabEnum {
  "REQUESTS" = "REQUESTS",
  "IN_PROCESS" = "IN_PROCESS",
  "COMPLETED" = "COMPLETED"
}

export const TransferOrders = () => {
  const [search, setSearch] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [ordersId, setOrdersId] = useState<number[]>([]);
  const router = useRouter();
  const [selectFilters, setSelectFilters] = useState({
    country: [] as string[],
    currency: [] as string[]
  });
  const [tab, setTab] = useState<TabEnum>(TabEnum.IN_PROCESS);

  const renderView = () => {
    switch (tab) {
      case TabEnum.REQUESTS:
        return (
          <Request
            search={search}
            handleCheckboxChange={handleCheckboxChange}
            ordersId={ordersId}
          />
        );
      case TabEnum.IN_PROCESS:
        return <InProcess search={search} />;
      case TabEnum.COMPLETED:
        return <Completed search={search} />;
      default:
        return (
          <Request
            search={search}
            handleCheckboxChange={handleCheckboxChange}
            ordersId={ordersId}
          />
        );
    }
  };
  const handleCreateTransferRequest = async () => {
    const queryParam = ordersId.join(",");
    setIsLoading(true);
    try {
      await transferOrderMerge(ordersId);
      message.open({ content: "Operación realizada con éxito", type: "success" });
      router.push(`transfer-request/create/${queryParam}`);
    } catch (error) {
      if (error instanceof Error) message.open({ content: error.message, type: "error" });
      else message.open({ content: "Error al realizar la operación", type: "error" });
    }
    setIsLoading(false);
  };
  const handleCheckboxChange = (id: number, checked: boolean) => {
    setOrdersId((prevOrdersId) =>
      checked ? [...prevOrdersId, id] : prevOrdersId.filter((orderId) => orderId !== id)
    );
  };

  return (
    <div className={styles.mainTransferOrders}>
      <SideBar />
      <div className={styles.content}>
        <Header title="Ordenes de transferencia" />
        <div className={styles.card}>
          <Flex justify="space-between">
            <div className={styles.filterContainer}>
              <UiSearchInput
                className="search"
                placeholder="Buscar"
                onChange={(event) => {
                  setSearch(event.target.value);
                }}
              />
              <FilterProjects setSelecetedProjects={setSelectFilters} />
              <PrincipalButton
                type="default"
                icon={<DotsThree size={"1.5rem"} />}
                disabled={ordersId.length === 0}
                onClick={handleCreateTransferRequest}
                loading={isLoading}
              >
                Generar TR
              </PrincipalButton>
            </div>
            <PrincipalButton
              type="primary"
              className="buttonNewProject"
              size="large"
              href="/logistics/orders/new"
            >
              Crear Nuevo Viaje
              {<Plus weight="bold" size={14} />}
            </PrincipalButton>
          </Flex>
          <div className={styles.tabContainer}>
            <Text
              onClick={() => setTab(TabEnum.REQUESTS)}
              className={`${styles.tab} ${tab === TabEnum.REQUESTS && styles.active}`}
            >
              Solicitudes
            </Text>
            <Text
              onClick={() => setTab(TabEnum.IN_PROCESS)}
              className={`${styles.tab} ${tab === TabEnum.IN_PROCESS && styles.active}`}
            >
              En curso
            </Text>
            <Text
              onClick={() => setTab(TabEnum.COMPLETED)}
              className={`${styles.tab} ${tab === TabEnum.COMPLETED && styles.active}`}
            >
              Finalizados
            </Text>
          </div>
          <div>{renderView()}</div>
        </div>
      </div>
    </div>
  );
};
