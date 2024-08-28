import { Button, Table, Typography } from "antd";
import type { TableColumnsType } from "antd";
import { Eye } from "phosphor-react";
import { FC } from "react";
import styles from "./BillingTable.module.scss";
import { formatNumber } from "@/utils/utils";
import TotalFooter from "./components/TotalFooter/TotalFooter";
const { Text } = Typography;

export interface DataType {
  key: React.Key;
  id: number;
  name: string;
  baseFare: number;
  surcharges: number;
  subtotal: number;
  vehicles: number;
  status: string;
  url: string;
}

const getBgColor = (state: string) => {
  switch (state) {
    case "Preautorizado":
      return "#CBE71E";
    case "Facturado":
      return "#FF6B00";
    case "Aceptadas":
      return "#0085FF";
    case "Por aceptar":
      return "#969696";
    default:
      return "#969696";
  }
};

const getColor = (state: string) => {
  switch (state) {
    case "Preautorizado":
      return "#141414";
    case "Facturado":
      return "#141414";
    case "Aceptadas":
      return "#FFFFFF";
    case "Por aceptar":
      return "#FFFFFF";
    default:
      return "#FFFFFF";
  }
};
interface IBillingTableProps {
  supplierBillings: DataType[];
  handleShowDetails: (id: number) => void;
}

export const BillingTable: FC<IBillingTableProps> = ({ supplierBillings, handleShowDetails }) => {
  const columns: TableColumnsType<DataType> = [
    {
      title: "Nombre",
      dataIndex: "name",
      render: (text: string) => <Text className={styles.rowtext}>{text}</Text>
    },
    {
      title: "Tarifa base",
      dataIndex: "baseFare",
      render: (value: number) => <Text className={styles.rowtext}>${formatNumber(value, 2)}</Text>
    },
    {
      title: "Sobre costos",
      dataIndex: "surcharges",
      render: (value: number) => <Text className={styles.rowtext}>${formatNumber(value, 2)}</Text>
    },
    {
      title: "Subtotal",
      dataIndex: "subtotal",
      render: (value: number) => <Text className={styles.rowtext}>${formatNumber(value, 2)}</Text>
    },
    {
      title: "Vehículos",
      dataIndex: "vehicles",
      render: (value: number) => <Text className={styles.rowtext}>{value}</Text>
    },
    {
      title: "Estado",
      dataIndex: "status",
      render: (text: string) => (
        <div className={styles.stateContainer}>
          <div style={{ backgroundColor: getBgColor(text) }} className={styles.stateContent}>
            <Text style={{ color: getColor(text) }} className={styles.text}>
              {text}
            </Text>
          </div>
        </div>
      )
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
