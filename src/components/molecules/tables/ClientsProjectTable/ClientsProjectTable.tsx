import { Dispatch, SetStateAction, useState } from "react";
import { Button, Checkbox, Flex, Popconfirm, Table, TableProps, Typography } from "antd";
import { DotsThree, Eye, Plus } from "phosphor-react";
import { FilterClients } from "@/components/atoms/FilterClients/FilterClients";

import "./clientsprojecttable.scss";
import { IClient } from "@/types/clients/IClients";

const { Text, Link } = Typography;

interface Props {
  setIsCreateClient?: Dispatch<SetStateAction<boolean>>;
  setIsViewDetailsClients?: Dispatch<
    SetStateAction<{
      active: boolean;
      id: number;
    }>
  >;
  placedIn?: string;
  setSelectedRows?: Dispatch<SetStateAction<{}>>;
}

export const ClientsProjectTable = ({
  setIsCreateClient,
  setIsViewDetailsClients,
  placedIn = "tab",
  setSelectedRows
}: Props) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const onSelectChange = (newSelectedRowKeys: React.Key[], newSelectedRow: any) => {
    setSelectedRowKeys(newSelectedRowKeys);

    if (setSelectedRows) {
      setSelectedRows(newSelectedRow);
    }
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange
  };

  const onCreateClient = () => {
    if (setIsCreateClient) {
      setIsCreateClient(true);
    }
  };

  let columns: TableProps<IClient>["columns"] = [];
  if (placedIn === "tab") {
    columns = [
      {
        title: "",
        dataIndex: "active",
        key: "active",
        render: () => <Checkbox />,
        width: "30px"
      },
      {
        title: "Name",
        dataIndex: "client_name",
        key: "client_name",
        render: (text) => <Link underline>{text}</Link>
      },
      {
        title: "NIT",
        dataIndex: "nit",
        key: "nit",
        render: (text) => <Text>{text}</Text>
      },
      {
        title: "Tipo de Cliente",
        key: "client_type_id",
        dataIndex: "client_type_id",
        render: (text) => <Text>{text}</Text>
      },
      {
        title: "Usuarios",
        key: "users",
        dataIndex: "users",
        render: (text) => <Text>{text}</Text>
      },
      {
        title: "Facturas",
        key: "bills",
        dataIndex: "bills",
        render: (text) => <Text>{text}</Text>
      },
      {
        title: "Cartera",
        key: "budget",
        dataIndex: "budget",
        render: (text) => <Text>{text}</Text>
      },
      {
        title: "Riesgo",
        key: "risk",
        dataIndex: "risk",
        render: (text) => <Text>{text}</Text>
      },
      {
        title: "Holding",
        key: "holding_name",
        dataIndex: "holding_name",
        render: (text) => <Text>{text}</Text>
      },
      {
        title: "Estado",
        key: "status",
        width: "150px",
        dataIndex: "status",
        render: (_, { ACTIVE = true }) => (
          <>
            {ACTIVE ? (
              <Flex
                align="center"
                className={ACTIVE ? "statusContainer" : "statusContainerPending"}
              >
                <div className={ACTIVE ? "statusActive" : "statusPending"} />
                <Text>{ACTIVE ? "Activo" : "Inactivo"}</Text>
              </Flex>
            ) : (
              <Popconfirm
                placement="topRight"
                title={"Invitación pendiente de aprobación"}
                description={"Volver a Enviar invitacion?"}
                okText="Si"
                cancelText="No"
              >
                <Flex
                  align="center"
                  className={ACTIVE ? "statusContainer" : "statusContainerPending"}
                >
                  <div className={ACTIVE ? "statusActive" : "statusPending"} />
                  <Text>{ACTIVE ? "Activo" : "Inactivo"}</Text>
                </Flex>
              </Popconfirm>
            )}
          </>
        )
      },
      {
        title: "",
        key: "seeProject",
        width: "40px",
        dataIndex: "",
        render: (_, { nit }) => (
          <Button
            onClick={() => {
              if (setIsViewDetailsClients) {
                setIsViewDetailsClients({ active: true, id: parseInt(nit) });
              }
            }}
            icon={<Eye size={"1.3rem"} />}
          />
        )
      }
    ];

    return (
      <>
        <main className="mainClientsProjectTable">
          <Flex justify="space-between" className="mainClientsProjectTable_header">
            <Flex gap={"1.75rem"}>
              <FilterClients />
              <Button size="large" icon={<DotsThree size={"1.5rem"} />} />
            </Flex>

            {placedIn === "tab" ? (
              <Button
                type="primary"
                className="buttonNewProject"
                size="large"
                onClick={onCreateClient}
                icon={<Plus weight="bold" size={15} />}
              >
                Nuevo Cliente
              </Button>
            ) : null}
          </Flex>

          <Table
            columns={columns}
            dataSource={data.map((client) => ({
              key: client.nit,
              ...client
            }))}
          />
        </main>
      </>
    );
  } else if (placedIn === "modal") {
    columns = [
      {
        title: "Nombre",
        dataIndex: "client_name",
        key: "client_name",
        render: (text) => <Link underline>{text}</Link>
      },
      {
        title: "NIT",
        dataIndex: "nit",
        key: "nit",
        render: (text) => <Text>{text}</Text>
      },
      {
        title: "Ship To",
        key: "shipTo",
        dataIndex: "shipTo",
        render: (text) => <Text>{text}</Text>
      },
      {
        title: "Holding",
        key: "holding_name",
        dataIndex: "holding_name",
        render: (text) => <Text>{text}</Text>
      },
      {
        title: "Cartera",
        key: "budget",
        dataIndex: "budget",
        render: (text) => <Text>{text}</Text>
      },
      {
        title: "Grupos",
        key: "groups",
        dataIndex: "groups",
        render: (text) => <Text>{text}</Text>
      }
    ];

    return (
      <>
        <main className="mainClientsProjectTable">
          <Flex justify="space-between" className="mainClientsProjectTable_header">
            <Flex>
              <FilterClients />
            </Flex>
          </Flex>
          <Table
            columns={columns}
            dataSource={data.map((client) => ({
              key: client.nit,
              ...client
            }))}
            pagination={{ pageSize: 8 }}
            rowSelection={rowSelection}
            rowClassName={(record) => (selectedRowKeys.includes(record.nit) ? "selectedRow" : "")}
          />
        </main>
      </>
    );
  } else if (placedIn === "groupTable") {
    columns = [
      {
        title: "Nombre",
        dataIndex: "client_name",
        key: "client_name",
        render: (text) => <Link underline>{text}</Link>
      },
      {
        title: "NIT",
        dataIndex: "nit",
        key: "nit",
        render: (text) => <Text>{text}</Text>
      },
      {
        title: "Cartera",
        key: "budget",
        dataIndex: "budget",
        render: (text) => <Text>{text}</Text>
      },
      {
        title: "Usuarios",
        key: "usuarios",
        dataIndex: "usuarios",
        render: (text) => <Text>{text}</Text>
      },
      {
        title: "Ship To",
        key: "shipTo",
        dataIndex: "shipTo",
        render: (text) => <Text>{text}</Text>
      },
      {
        title: "Grupos",
        key: "budget",
        dataIndex: "budget",
        render: (text) => <Text>{text}</Text>
      },
      {
        title: "Holding",
        key: "holding_name",
        dataIndex: "holding_name",
        render: (text) => <Text>{text}</Text>
      },
      {
        title: "Estado",
        key: "status",
        width: "150px",
        dataIndex: "status",
        render: (_, { ACTIVE = true }) => (
          <>
            {ACTIVE ? (
              <Flex
                align="center"
                className={ACTIVE ? "statusContainer" : "statusContainerPending"}
              >
                <div className={ACTIVE ? "statusActive" : "statusPending"} />
                <Text>{ACTIVE ? "Activo" : "Inactivo"}</Text>
              </Flex>
            ) : (
              <Popconfirm
                placement="topRight"
                title={"Invitación pendiente de aprobación"}
                description={"Volver a Enviar invitacion?"}
                okText="Si"
                cancelText="No"
              >
                <Flex
                  align="center"
                  className={ACTIVE ? "statusContainer" : "statusContainerPending"}
                >
                  <div className={ACTIVE ? "statusActive" : "statusPending"} />
                  <Text>{ACTIVE ? "Activo" : "Inactivo"}</Text>
                </Flex>
              </Popconfirm>
            )}
          </>
        )
      }
    ];

    return (
      <>
        <main className="mainClientsProjectTable">
          <Flex justify="space-between" className="mainClientsProjectTable_header">
            <Flex>
              <FilterClients />
            </Flex>
          </Flex>
          <Table
            columns={columns}
            dataSource={data.map((client) => ({
              key: client.nit,
              ...client
            }))}
            pagination={{ pageSize: 8 }}
          />
        </main>
      </>
    );
  }
};
const data: IClient[] = [];

for (let i = 0; i < 9; i++) {
  data.push({
    nit: `${i}347623472-5643`,
    project_id: 1,
    client_type_id: 1,
    uuid: "123e4567-e89b-12d3-a456-426655440000",
    document_type: "CC",
    client_name: "Coopidrogas",
    business_name: "Coopidrogas S.A.",
    holding_id: 1,
    holding_name: "Profit Hold",
    phone: "+57 1 234 5678",
    email: "info@coopidrogas.com",
    risk: "Medio",
    billing_period: "Mensual",
    locations: [
      {
        id: 1,
        nit: "3819389183912-9",
        city: "Bogota",
        address: "calle falsa 123 tabogo actualizado",
        position: {
          lat: " 4.698931",
          lon: "-74.1146624"
        }
      }
    ],
    radication_type: 1,
    ACTIVE: true,
    client_type: "Persona Jurídica",
    status: "Creado",
    is_deleted: 0
    // users: 36,
    // bills: 36,
    // budget: 180000
  });
}
