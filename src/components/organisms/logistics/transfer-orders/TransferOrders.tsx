"use client";
import styles from "./transferOrders.module.scss";
import UiSearchInput from "@/components/ui/search-input/search-input";
import { FilterProjects } from "@/components/atoms/Filters/FilterProjects/FilterProjects";
import { useEffect, useState } from "react";
import { Request } from "./request/Request";
import { InProcess } from "./in-process/InProcess";
import { Completed } from "./completed/completed";
import { Empty, Flex, message, Typography } from "antd";
import { DotsThree, FileArrowDown, Plus } from "phosphor-react";
import {
  downloadCsvTransferOrders,
  transferOrderMerge
} from "@/services/logistics/transfer-request";
import { useRouter, useSearchParams } from "next/navigation";
import PrincipalButton from "@/components/atoms/buttons/principalButton/PrincipalButton";
import Container from "@/components/atoms/Container/Container";
import ProtectedComponent from "@/components/molecules/protectedComponent/ProtectedComponent";
import { TMS_COMPONENTS, TMSMODULES } from "@/utils/constants/globalConstants";
import { useAppStore } from "@/lib/store/store";
import { checkUserComponentPermissions } from "@/utils/utils";

const { Text } = Typography;

export enum TabEnum {
  "REQUESTS" = "REQUESTS",
  "IN_PROCESS" = "IN_PROCESS",
  "COMPLETED" = "COMPLETED"
}

const viewName: keyof typeof TMSMODULES = "TMS-Viajes";

export const TransferOrders = () => {
  const [search, setSearch] = useState<string>("");
  const { selectedProject: project, isHy } = useAppStore((state) => state);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingCsv, setLoadingCsv] = useState<boolean>(false);
  const [ordersId, setOrdersId] = useState<number[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectFilters, setSelectFilters] = useState({
    country: [] as string[],
    currency: [] as string[]
  });
  const tabParam = searchParams.get("tab") as TabEnum | null;
  const [tab, setTab] = useState<TabEnum>();

  useEffect(() => {
    if (isHy) {
      // if the zustand store is hydrated
      const checkFunction = ({ create_permission }: { create_permission: boolean }) =>
        create_permission;
      // Actualizar el estado del tab si cambia el parámetro en la URL
      if (tabParam && Object.values(TabEnum).includes(tabParam)) {
        // if the tabParam is valid and exists in the TabEnum
        if (
          checkUserComponentPermissions(
            project,
            viewName,
            TMS_COMPONENTS[viewName][tabParam],
            checkFunction
          )
        ) {
          // if the user has the required permissions to access the tabParam
          setTab(tabParam);
        } else {
          // else, set the tab to the first valid tab
          const valid = Object.values(TabEnum).find((tab) =>
            checkUserComponentPermissions(
              project,
              viewName,
              TMS_COMPONENTS[viewName][tab],
              checkFunction
            )
          );
          if (valid) setTab(valid as TabEnum);
        }
      } else {
        // if the tabParam is not valid, set the tab to the first valid tab (first validate "IN_PROCESS")
        const valid = [TabEnum.IN_PROCESS, ...Object.values(TabEnum)].find((tab) =>
          checkUserComponentPermissions(
            project,
            viewName,
            TMS_COMPONENTS[viewName][tab],
            checkFunction
          )
        );
        if (valid) setTab(valid as TabEnum);
      }
    }
  }, [tabParam, isHy, project]);

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
        return <Empty />;
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

  const downloadCsvOrders = async () => {
    setLoadingCsv(true);
    try {
      await downloadCsvTransferOrders();
    } catch (error) {
      if (error instanceof Error) message.open({ content: error.message, type: "error" });
      else message.open({ content: "Error al realizar la operación", type: "error" });
    }
    setLoadingCsv(false);
  };

  return (
    <Container>
      <Flex justify="space-between" style={{ marginBottom: "1rem" }}>
        <div className={styles.filterContainer}>
          <UiSearchInput
            className="search"
            placeholder="Buscar"
            onChange={(event) => {
              setSearch(event.target.value);
            }}
          />
          <FilterProjects setSelecetedProjects={setSelectFilters} />
          <ProtectedComponent
            componentName={TMS_COMPONENTS[viewName].CREATE_TR}
            viewName={viewName}
            checkFunction={({ create_permission }) => create_permission}
          >
            <PrincipalButton
              type="default"
              icon={<DotsThree size={"1.5rem"} />}
              disabled={ordersId.length === 0}
              onClick={handleCreateTransferRequest}
              loading={isLoading}
            >
              Generar TR
            </PrincipalButton>
          </ProtectedComponent>
          <ProtectedComponent
            componentName={TMS_COMPONENTS[viewName].DOWNLOAD_SHEET}
            viewName={viewName}
          >
            <PrincipalButton
              type="default"
              icon={<FileArrowDown size={"1.5rem"} />}
              onClick={downloadCsvOrders}
              loading={loadingCsv}
            >
              Descargar Ordenes
            </PrincipalButton>
          </ProtectedComponent>
        </div>
        <ProtectedComponent
          componentName={TMS_COMPONENTS[viewName].REQUESTS}
          viewName={viewName}
          checkFunction={({ create_permission }) => create_permission}
        >
          <PrincipalButton
            type="primary"
            className="buttonNewProject"
            size="large"
            href="/logistics/orders/new"
          >
            Crear Nuevo Viaje
            {<Plus weight="bold" size={14} />}
          </PrincipalButton>
        </ProtectedComponent>
      </Flex>
      <div className={styles.tabContainer} style={{ marginBottom: "0.5rem" }}>
        <ProtectedComponent componentName={TMS_COMPONENTS[viewName].REQUESTS} viewName={viewName}>
          <Text
            onClick={() => setTab(TabEnum.REQUESTS)}
            className={`${styles.tab} ${tab === TabEnum.REQUESTS && styles.active}`}
          >
            Solicitudes
          </Text>
        </ProtectedComponent>
        <ProtectedComponent componentName={TMS_COMPONENTS[viewName].IN_PROCESS} viewName={viewName}>
          <Text
            onClick={() => setTab(TabEnum.IN_PROCESS)}
            className={`${styles.tab} ${tab === TabEnum.IN_PROCESS && styles.active}`}
          >
            En curso
          </Text>
        </ProtectedComponent>
        <ProtectedComponent componentName={TMS_COMPONENTS[viewName].COMPLETED} viewName={viewName}>
          <Text
            onClick={() => setTab(TabEnum.COMPLETED)}
            className={`${styles.tab} ${tab === TabEnum.COMPLETED && styles.active}`}
          >
            Finalizados
          </Text>
        </ProtectedComponent>
      </div>
      <div>{isHy && renderView()}</div>
    </Container>
  );
};
