import { Checkbox, CollapseProps, Typography } from "antd";
import styles from "./Request.module.scss";
import { TransferOrdersState } from "@/utils/constants/transferOrdersState";
import { TransferOrdersTable } from "@/components/molecules/tables/TransferOrderTable/TransferOrderTable";
import { FC, useEffect, useState } from "react";
import { getAcceptedTransferRequest } from "@/services/logistics/transfer-request";
import { ITransferRequestResponse } from "@/types/transferRequest/ITransferRequest";
import CustomCollapse from "@/components/ui/custom-collapse/CustomCollapse";

const Text = Typography;

interface IRequestProps {
  search: string;
  handleCheckboxChange: (id: number, checked: boolean) => void;
  ordersId: number[];
  trsIds: number[];
  handleCheckboxChangeTR: (id: number, checked: boolean) => void;
}

export const Request: FC<IRequestProps> = ({
  search,
  handleCheckboxChange,
  ordersId,
  trsIds,
  handleCheckboxChangeTR
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [transferRequest, setTransferRequest] = useState<ITransferRequestResponse[]>([]);

  const getTitile = (stateId: string, transferType: string, number: number) => {
    const getState = TransferOrdersState.find((f) => f.id === stateId);
    return (
      <div className={styles.mainTitle}>
        <div className={styles.titleContainer}>
          <div className={styles.textContainer} style={{ backgroundColor: getState?.bgColor }}>
            {getState?.name}
          </div>
          <div className={`${styles.textContainer} ${styles.subTextContainer}`}>
            <span>{transferType}</span>
            <span className={styles.number}>{number}</span>
          </div>
        </div>
      </div>
    );
  };

  const getTransferRequestAccepted = async () => {
    try {
      const getRequest = await getAcceptedTransferRequest();
      if (Array.isArray(getRequest)) {
        setTransferRequest(getRequest);
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTransferRequestAccepted();
  }, []);

  if (isLoading)
    return (
      <div className={styles.emptyContainer}>
        <Text className={styles.textEmpty}>No Content</Text>
      </div>
    );

  const filteredData = transferRequest
    .map((status) => {
      const filteredItems = status.items.filter(
        (item) =>
          item.start_location.toLowerCase().includes(search.toLowerCase()) ||
          item.end_location.toLowerCase().includes(search.toLowerCase())
      );

      return { ...status, items: filteredItems };
    })
    .filter((status) => status.items.length > 0);

  // Array con los IDs de estado en el orden deseado
  const ORDERED_STATE_IDS = [
    "9f5ba87c-8736-4367-8077-3b914d2ee711", // Sin procesar
    "00ce0b06-71b8-4981-861f-b4fa100dbd25", // Procesando
    "a48b8b32-8699-4b6f-b56c-277238a656bc", // Procesado
    "a312eb37-9a20-4e46-a010-3ee8d5cb2d94" // Esperando proveedor
  ];

  const sortedFilteredData = filteredData.toSorted((a, b) => {
    return ORDERED_STATE_IDS.indexOf(a.statusId) - ORDERED_STATE_IDS.indexOf(b.statusId);
  });

  const renderItems: CollapseProps["items"] = sortedFilteredData.map((item, index) => {
    let aditionalRow = undefined;
    let redirect = undefined;
    if (item.statusId === TransferOrdersState.find((f) => f.name === "Sin procesar")?.id) {
      aditionalRow = {
        title: "",
        dataIndex: "checkbox",
        render: (_: any, { tr }: any) => (
          <Checkbox
            checked={ordersId.includes(tr)}
            onChange={(e) => handleCheckboxChange(tr, e.target.checked)}
          />
        )
      };
      redirect = "/logistics/orders/details";
    }
    if (item.statusId === TransferOrdersState.find((f) => f.name === "Procesado")?.id) {
      aditionalRow = {
        title: "",
        dataIndex: "checkbox",
        render: (_: any, { tr }: any) => (
          <Checkbox
            checked={trsIds.includes(tr)}
            onChange={(e) => handleCheckboxChangeTR(tr, e.target.checked)}
          />
        )
      };
      redirect = "/logistics/transfer-request/";
    }
    if (item.statusId === TransferOrdersState.find((f) => f.name === "Esperando proveedor")?.id) {
      redirect = "/logistics/transfer-request/";
    }
    if (item.statusId === TransferOrdersState.find((f) => f.name === "Procesando")?.id) {
      redirect = "/logistics/orders/details";
    }
    return {
      key: index,
      label: getTitile(item.statusId, item.transferType, item.items.length),
      children: (
        <TransferOrdersTable items={item.items} aditionalRow={aditionalRow} redirect={redirect} />
      )
    };
  });

  return <CustomCollapse ghost items={renderItems} defaultActiveKey={["0"]} />;
};
