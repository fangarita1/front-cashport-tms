import { Button, Table, Typography } from "antd";
import type { TableColumnsType } from "antd";
import { Eye } from "phosphor-react";
import { FC } from "react";
import styles from "./BillingTable.module.scss";
import { formatNumber } from "@/utils/utils";
import TotalFooter from "./components/TotalFooter/TotalFooter";
import { BillingByCarrier, BillingStatusEnum } from "@/types/logistics/billing/billing";
const { Text } = Typography;

const getBgColor = (state: BillingStatusEnum) => {
  switch (state) {
    case BillingStatusEnum.Preautorizado:
      return "#CBE71E";
    case BillingStatusEnum.Facturado:
      return "#FF6B00";
    case BillingStatusEnum.Aceptadas:
      return "#0085FF";
    case BillingStatusEnum.PorAceptar:
      return "#969696";
    default:
      return "#969696";
  }
};

const getColor = (state: string) => {
  switch (state) {
    case BillingStatusEnum.Preautorizado:
      return "#141414";
    case BillingStatusEnum.Facturado:
      return "#141414";
    case BillingStatusEnum.Aceptadas:
      return "#FFFFFF";
    case BillingStatusEnum.PorAceptar:
      return "#FFFFFF";
    default:
      return "#FFFFFF";
  }
};
interface IBillingTableProps {
  supplierBillings: BillingByCarrier[];
  handleShowDetails: (id: number) => void;
}

export const BillingTable: FC<IBillingTableProps> = ({ supplierBillings, handleShowDetails }) => {
  const columns: TableColumnsType<BillingByCarrier> = [
    {
      title: "Nombre",
      dataIndex: "carrier",
      render: (text: string) => <Text className={styles.rowtext}>{text}</Text>
    },
    {
      title: "Estado",
      dataIndex: "statusDesc",
      render: (text: BillingStatusEnum) => (
        <div className={styles.stateContainer}>
          <div style={{ backgroundColor: getBgColor(text) }} className={styles.stateContent}>
            <Text style={{ color: getColor(text) }} className={styles.text}>
              {text}
            </Text>
          </div>
        </div>
      ),
      align: "center"
    },
    {
      title: "Vehículos",
      dataIndex: "vehicle_quantity",
      render: (value: number) => <Text className={styles.rowtext}>{value}</Text>,
      align: "right"
    },
    {
      title: "Tarifa base",
      dataIndex: "fare",
      render: (value: number) => <Text className={styles.rowtext}>${formatNumber(value, 2)}</Text>,
      align: "right"
    },
    {
      title: "Sobre costos",
      dataIndex: "overcost",
      render: (value: number) => <Text className={styles.rowtext}>${formatNumber(value, 2)}</Text>,
      align: "right"
    },
    {
      title: "Subtotal",
      dataIndex: "subtotal",
      render: (value: number) => <Text className={styles.rowtext}>${formatNumber(value, 2)}</Text>,
      align: "right"
    },
    {
      title: "",
      dataIndex: "id",
      render: (id: number) => (
        <div className={styles.btnContainer}>
          <Button
            className={styles.btn}
            type="text"
            size="middle"
            onClick={() => handleShowDetails(id)}
            icon={<Eye size={24} />}
          />
        </div>
      )
    }
  ];
  return (
    <Table
      columns={columns}
      pagination={false}
      dataSource={supplierBillings}
      footer={() => <TotalFooter supplierBillings={supplierBillings} />}
    />
  );
};
