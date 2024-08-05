"use client";
import { Dispatch, SetStateAction, useState } from "react";
import { formatMoney } from "@/utils/utils";
import { Eye, Warning } from "phosphor-react";
import { Button, Flex, Table, TableProps, Typography } from "antd";
import { Radioactive } from "@phosphor-icons/react";
import { ICarriersRequestList } from "@/types/logistics/schema";
import Link from "next/link";
import { useProjects } from "@/hooks/useProjects";

const { Text } = Typography;

interface PropsCarrierTable {
  carrierData: ICarriersRequestList[];
  setSelectedRows: Dispatch<SetStateAction<any[] | undefined>>;
  loading: boolean;
}

export default function CarrierTable({ carrierData: data, setSelectedRows, loading }: PropsCarrierTable) {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const onSelectChange = (newSelectedRowKeys: React.Key[], newSelectedRow: any) => {
    setSelectedRowKeys(newSelectedRowKeys);
    setSelectedRows(newSelectedRow);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange
  };

  const columns: TableProps<ICarriersRequestList>["columns"] = [
    {
      title: "TR",
      dataIndex: "id",
      key: "id",
      render: (id) => (
        <Link
          href={`/logistics/acept_carrier/${id}`}
          style={{ color: "blue", textDecorationLine: "underline" }}
        >
          {id}
        </Link>
      ),
      sorter: (a, b) => a.id - b.id,
      showSorterTooltip: false
    },
    {
      title: "Origen y destino",
      dataIndex: ["start_location", "end_location"],
      key: "departureArrival",
      render: (text, record) => (
        <Text>
          <div>
            <strong>Origen</strong> {record.start_location}
          </div>
          <div>
            <strong>Destino</strong> {record.end_location}
          </div>
        </Text>
      ),
      sorter: (a, b) => a.start_location.localeCompare(b.start_location),
      showSorterTooltip: false
    },
    {
      title: "Fechas",
      key: "startEndDate",
      dataIndex: ["start_date", "end_date"],
      render: (text, record) => (
        <Text>
          {record.start_date} <br />{" "}
          {record.end_date}
        </Text>
      ),
      sorter: (a, b) => {
        if (new Date(a.start_date).getTime() === new Date(b.start_date).getTime()) {
          return new Date(a.end_date).getTime() - new Date(b.end_date).getTime();
        }
        return new Date(a.start_date).getTime() - new Date(b.start_date).getTime();
      },
      showSorterTooltip: false
    },
    {
      title: "Tipo de viaje",
      key: "travelType",
      dataIndex: "service_type",
      render: (text) => <Text>{text}</Text>,
      sorter: (a, b) => a.service_type.localeCompare(b.service_type),
      showSorterTooltip: false
    },
    {
      title: "Vehículo(s)",
      key: "vehicle",
      dataIndex: "vehicles",
      render: (text) => <Text>{text}</Text>,
      sorter: (a, b) => a.vehicles.localeCompare(b.vehicles),
      showSorterTooltip: false
    },
    {
      title: "Tiempo transcurido",
      key: "timeTraveled",
      dataIndex: "elapsedTime",
      render: (text) => (
        <Text>{text}</Text>
      ),
      sorter: (a, b) => a.elapsedtime - b.elapsedtime,
      showSorterTooltip: false
    },
    {
      title: "Valor",
      key: "value",
      dataIndex: "amount",
      render: (amount) => <Text>{formatMoney(amount)}</Text>,
      sorter: (a, b) => a.amount - b.amount,
      showSorterTooltip: false,
      align: "right"
    },
    {
      title: "",
      key: "buttonSee",
      width: 64,
      dataIndex: "id",
      render: (text, record, invoiceId) => (
        <Flex style={{ gap: "6px", justifyContent: "flex-end" }}>
          {/*{record.radioactiveIcon && (
            <Button style={{ backgroundColor: "#F7F7F7" }} icon={<Radioactive size={"1.3rem"} />} />
          )}*/}
          {/*{record.dangerIcon && (
            <Button style={{ backgroundColor: "#F7F7F7" }} icon={<Warning size={"1.3rem"} />} />
          )}*/}
          {/*{record.eyeIcon && (
            <Link href={`/aceptacion_de_proveedores/${invoiceId}`}><Button style={{ backgroundColor: "#F7F7F7" }} icon={<Eye size={"1.3rem"} />} /></Link>
          )}*/}
          <Link href={`/logistics/acept_carrier/${invoiceId}`}>
            <Button style={{ backgroundColor: "#F7F7F7" }} icon={<Eye size={"1.3rem"} />} />
          </Link>
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
        loading={loading}
      />
    </>
  );
}
