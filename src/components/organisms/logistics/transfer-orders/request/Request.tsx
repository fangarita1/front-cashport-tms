import { Checkbox, Collapse, CollapseProps, Typography } from "antd";
import styles from "./Request.module.scss";
import { TransferOrdersState } from "@/utils/constants/transferOrdersState";
import { TransferOrdersTable } from "@/components/molecules/tables/TransferOrderTable/TransferOrderTable";
import { FC, useEffect, useState } from "react";
import { getAcceptedTransferRequest } from "@/services/logistics/transfer-request";
import { ITransferRequestResponse } from "@/types/transferRequest/ITransferRequest";

const Text = Typography;

interface IRequestProps {
  search: string;
  handleCheckboxChange: (id: number, checked: boolean) => void;
  ordersId: number[];
}

export const Request: FC<IRequestProps> = ({ search, handleCheckboxChange, ordersId }) => {
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

  const renderItems: CollapseProps["items"] = filteredData.map((item, index) => {
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
    if (
      item.statusId === TransferOrdersState.find((f) => f.name === "Esperando proveedor")?.id ||
      item.statusId === TransferOrdersState.find((f) => f.name === "Procesado")?.id
    ) {
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

  return <Collapse ghost items={renderItems} defaultActiveKey={["0"]} />;
};
