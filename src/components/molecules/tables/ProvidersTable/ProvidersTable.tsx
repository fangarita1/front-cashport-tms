"use client";
import { Dispatch, SetStateAction, useState } from "react";
import { formatMoney } from "@/utils/utils";
import { Eye, Warning } from "phosphor-react";
import { Button, Flex, Table, TableProps, Typography } from "antd";
import { ProvidersInfo } from "@/types/providers/providers";
import { Radioactive } from "@phosphor-icons/react";
import Link from "next/link";

const { Text } = Typography;

interface PropsProviderTable {
  providerData: ProvidersInfo[];
  setSelectedRows: Dispatch<SetStateAction<any[] | undefined>>;
}

export default function ProvidersTable({
  providerData: data,
  setSelectedRows
}: PropsProviderTable) {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const onSelectChange = (newSelectedRowKeys: React.Key[], newSelectedRow: any) => {
    setSelectedRowKeys(newSelectedRowKeys);
    setSelectedRows(newSelectedRow);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange
  };

  const columns: TableProps<any>["columns"] = [
    {
      title: "TR",
      dataIndex: "id",
      key: "id",
      render: (invoiceId) => (
        <Link
          href={`/proveedores/${invoiceId}`}
          style={{ color: "blue", textDecorationLine: "underline" }}
        >
          {invoiceId}
        </Link>
      ),
      sorter: (a, b) => a.id - b.id,
      showSorterTooltip: false
    },
    {
      title: "Origen y destino",
      dataIndex: ["departure", "arrival"],
      key: "departureArrival",
      render: (text, record) => (
        <Text>
          <div>
            <strong>Origen</strong> {record.departure}
          </div>
          <div>
            <strong>Destino</strong> {record.arrival}
          </div>
        </Text>
      ),
      sorter: (a, b) => a.departure.localeCompare(b.departure),
      showSorterTooltip: false
    },
    {
      title: "Fechas",
      key: "startEndDate",
      dataIndex: ["startDate", "endDate"],
      render: (text, record) => (
        <Text>
          {`${new Date(record.startDate).toLocaleDateString()} - ${record.startTime}`} <br />{" "}
          {`${new Date(record.endDate).toLocaleDateString()} - ${record.endTime}`}
        </Text>
      ),
      sorter: (a, b) => {
        if (new Date(a.startDate).getTime() === new Date(b.startDate).getTime()) {
          return new Date(a.endDate).getTime() - new Date(b.endDate).getTime();
        }
        return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
      },
      showSorterTooltip: false
    },
    {
      title: "Tipo de viaje",
      key: "travelType",
      dataIndex: "travelType",
      render: (text) => <Text>{text}</Text>,
      sorter: (a, b) => a.travelType.localeCompare(b.travelType),
      showSorterTooltip: false
    },
    {
      title: "Vehículo(s)",
      key: "vehicle",
      dataIndex: "vehicle",
      render: (text) => <Text>{text}</Text>,
      sorter: (a, b) => a.travelType.localeCompare(b.travelType),
      showSorterTooltip: false
    },
    {
      title: "Tiempo transcurido",
      key: "timeTraveled",
      dataIndex: "timeTraveled",
      render: (text) => <Text>{text}</Text>,
      sorter: (a, b) => a.timeTraveled.localeCompare(b.timeTraveled),
      showSorterTooltip: false
    },
    {
      title: "Valor",
      key: "value",
      dataIndex: "value",
      render: (amount) => <Text>{formatMoney(amount)}</Text>,
      sorter: (a, b) => a.value - b.value,
      showSorterTooltip: false,
      align: "right"
    },
    {
      title: "",
      key: "buttonSee",
      width: 64,
      dataIndex: "",
      render: (text, record) => (
        <Flex style={{ gap: "6px", justifyContent: "flex-end" }}>
          {record.radioactiveIcon && (
            <Button style={{ backgroundColor: "#F7F7F7" }} icon={<Radioactive size={"1.3rem"} />} />
          )}
          {record.eyeIcon && (
            <Button style={{ backgroundColor: "#F7F7F7" }} icon={<Eye size={"1.3rem"} />} />
          )}
          {record.dangerIcon && (
            <Button style={{ backgroundColor: "#F7F7F7" }} icon={<Warning size={"1.3rem"} />} />
          )}
        </Flex>
      )
    }
  ];

  return (
    <>
      <Table
        style={{ width: "100%" }}
        columns={columns}
        dataSource={data.map((data) => ({ ...data, key: data.id }))}
        rowSelection={rowSelection}
        rowClassName={(record) => (selectedRowKeys.includes(record.id) ? "selectedRow" : "")}
        pagination={false}
      />
    </>
  );
}
