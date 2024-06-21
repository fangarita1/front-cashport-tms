import { useState } from "react";
import { Button, Flex, Popconfirm, Spin, Table, TableProps, Typography, message } from "antd";
import { Eye, Plus, Trash } from "phosphor-react";

import { ModalShipTo } from "../../modals/ModalShipTo/ModalShipTo";
import { ISelectType } from "@/types/clients/IClients";
import { useShipTos } from "@/hooks/useShipTo";

import "./shiptoprojecttable.scss";
const { Text, Link, Title } = Typography;

interface Props {
  clientId: number;
  projectId: number;
  getClientValues: () => {
    billingPeriod: string;
    radicationType: ISelectType;
    conditionPayment: ISelectType;
  };
}

export const ShipToProjectTable = ({ clientId, getClientValues }: Props) => {
  const [isShipToModalOpen, setIsShipToModalOpen] = useState<{
    open: boolean;
    accounting_code: string | undefined;
  }>({
    open: false,
    accounting_code: undefined
  });
  const { data, isLoading, createShipTo, getShipTo, deleteShipTo, editShipTo } =
    useShipTos(clientId);
  const [messageApi, contextHolder] = message.useMessage();

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange
  };

  const columns: TableProps<any>["columns"] = [
    {
      title: "ID Ship To",
      dataIndex: "accounting_code",
      key: "accounting_code",
      render: (text) => <Link underline>{text}</Link>
    },
    {
      title: "Ciudad",
      dataIndex: "city",
      key: "city",
      render: (text) => <Text>{text}</Text>
    },
    {
      title: "Canal",
      key: "channel_name",
      dataIndex: "channel_name",
      render: (text) => <Text>{text}</Text>
    },
    {
      title: "Linea",
      key: "line_name",
      dataIndex: "line_name",
      render: (text) => <Text>{text}</Text>
    },
    {
      title: "Sublinea",
      key: "subline",
      dataIndex: "subline",
      render: (text) => <Text>{text}</Text>
    },
    {
      title: "Zona",
      key: "zone_name",
      dataIndex: "zone_name",
      render: (text) => <Text>{text}</Text>
    },
    {
      title: "Hereda parámetros",
      key: "dependecy_client",
      dataIndex: "dependecy_client",
      width: "200px",
      render: (text) => <Text>{Boolean(text) ? "Sí" : "No"}</Text>
    },
    {
      title: "",
      key: "seeProject",
      width: "40px",
      dataIndex: "",
      render: (_, { accounting_code }) => (
        <Flex gap={"0.5rem"}>
          <Popconfirm
            placement="topRight"
            title="¿Eliminar Ship To?"
            description="Esta acción no se puede deshacer."
            onConfirm={() => deleteShipTo(accounting_code, messageApi)}
          >
            <Button icon={<Trash size={"1.25rem"} />} />
          </Popconfirm>

          <Button
            onClick={() => setIsShipToModalOpen({ open: true, accounting_code })}
            icon={<Eye size={"1.3rem"} />}
          />
        </Flex>
      )
    }
  ];
  return (
    <>
      {contextHolder}
      <div className="ShipToProjectTable">
        <Flex justify="space-between" className="ShipToProjectTable__header">
          <Title level={4}>Ship To</Title>
          <Flex gap={"1rem"}>
            <Button
              type="primary"
              className="buttonOutlined"
              size="large"
              icon={<Plus weight="bold" size={15} />}
            >
              Descargar plantilla
            </Button>
            <Button
              type="primary"
              className="buttonOutlined"
              size="large"
              icon={<Plus weight="bold" size={15} />}
            >
              Cargar excel
            </Button>
          </Flex>
        </Flex>
        {isLoading ? (
          <Flex style={{ height: "30%" }} align="center" justify="center">
            <Spin size="default" />
          </Flex>
        ) : (
          <>
            <Table
              className="ShipToProjectTable__table"
              pagination={{ pageSize: 20 }}
              columns={columns}
              dataSource={data?.map((shipTo) => ({
                ...shipTo,
                key: shipTo.accounting_code
              }))}
              rowSelection={rowSelection}
              rowClassName={(record) =>
                selectedRowKeys.includes(record.accounting_code) ? "selectedRow" : "regularRow"
              }
            />
            <Button
              size="large"
              type="text"
              className="buttonCreateShipTo"
              onClick={() => {
                setIsShipToModalOpen({ open: true, accounting_code: undefined });
              }}
              icon={<Plus weight="bold" size={15} />}
            >
              Crear Ship To
            </Button>
          </>
        )}
      </div>

      <ModalShipTo
        setIsShipToModalOpen={setIsShipToModalOpen}
        isShipToModalOpen={isShipToModalOpen}
        getClientValues={getClientValues}
        messageApi={messageApi}
        createShipTo={createShipTo}
        getShipTo={getShipTo}
        editShipTo={editShipTo}
      />
    </>
  );
};
