import {
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
  ReactElement,
  JSXElementConstructor
} from "react";
import { useParams } from "next/navigation";
import { Button, Flex, MenuProps, Popconfirm, Spin, Table, TableProps, Typography } from "antd";
import { Eye, Plus } from "phosphor-react";
import { FilterClients } from "@/components/atoms/FilterClients/FilterClients";
import { DotsDropdown } from "@/components/atoms/DotsDropdown/DotsDropdown";
import { IClient } from "@/types/clients/IClients";
import { useClients } from "@/hooks/useClients";
import "./clientsprojecttable.scss";

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
  selectedClientsKeys?: string[];
  messageContext?: ReactElement<any, string | JSXElementConstructor<any>>;
}

export const ClientsProjectTable = ({
  setIsCreateClient,
  setIsViewDetailsClients,
  placedIn = "tab",
  setSelectedRows,
  selectedClientsKeys,
  messageContext
}: Props) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const [filterClients, setFilterClients] = useState({
    city: [] as any,
    holding: [] as any,
    risk: [] as any,
    payment_condition: [] as any,
    radication_type: [] as any,
    status: [] as any
  });

  const { id: idProject } = useParams<{ id: string }>();

  useEffect(() => {
    // Este useEffect es para seleccionar las filas
    // de clientes que ya pertenecen al grupo
    // cuando se va hacer PUT
    if (
      placedIn === "modal" &&
      selectedClientsKeys &&
      selectedClientsKeys.length > 0 &&
      selectedRowKeys.length === 0
    ) {
      setSelectedRowKeys(selectedClientsKeys);
    }
  }, [placedIn, selectedClientsKeys, selectedRowKeys.length]);

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

  const { data, loading } = useClients({
    idProject,
    page: 1,
    city: filterClients.city,
    holding: filterClients.holding,
    risk: filterClients.risk,
    payment_condition: filterClients.payment_condition,
    radication_type: filterClients.radication_type,
    status: filterClients.status
  });

  let columns: TableProps<IClient>["columns"] = [];
  if (placedIn === "tab") {
    columns = [
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
        key: "cliet_type",
        dataIndex: "cliet_type",
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
                setIsViewDetailsClients({ active: true, id: nit });
              }
            }}
            icon={<Eye size={"1.3rem"} />}
          />
        )
      }
    ];

    const deleteClients = () => {};

    const bulkLoadShipTo = () => {};

    const downloadTemplateShipTo = () => {};

    const changeClientsState = () => {};

    const items: MenuProps["items"] = [
      {
        key: "1",
        label: (
          <Button className="buttonOutlined" onClick={deleteClients}>
            Eliminar clientes
          </Button>
        )
      },
      {
        key: "2",
        label: (
          <Button className="buttonOutlined" onClick={bulkLoadShipTo}>
            Carga Masiva Ship To
          </Button>
        )
      },
      {
        key: "3",
        label: (
          <Button className="buttonOutlined" onClick={downloadTemplateShipTo}>
            Descarga Plantilla Ship To
          </Button>
        )
      },
      {
        key: "4",
        label: (
          <Button className="buttonOutlined" onClick={changeClientsState}>
            Cambiar estado
          </Button>
        )
      }
    ];

    return (
      <>
        {messageContext}
        <main className="mainClientsProjectTable">
          <Flex justify="space-between" className="mainClientsProjectTable_header">
            <Flex gap={"1.75rem"}>
              <FilterClients setFilterClients={setFilterClients} />
              <DotsDropdown items={items} />{" "}
            </Flex>

            <Button
              type="primary"
              className="buttonNewProject"
              size="large"
              onClick={onCreateClient}
              icon={<Plus weight="bold" size={15} />}
            >
              Nuevo Cliente
            </Button>
          </Flex>

          {loading ? (
            <Flex style={{ height: "30%" }} align="center" justify="center">
              <Spin size="large" />
            </Flex>
          ) : (
            <Table
              columns={columns}
              dataSource={data.map((client) => ({
                key: client.nit,
                ...client
              }))}
              rowSelection={rowSelection}
              rowClassName={(record) => (selectedRowKeys.includes(record.nit) ? "selectedRow" : "")}
            />
          )}
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
              <FilterClients setFilterClients={setFilterClients} />
            </Flex>
          </Flex>

          {loading ? (
            <Flex style={{ height: "30%" }} align="center" justify="center">
              <Spin size="large" />
            </Flex>
          ) : (
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
          )}
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
              <FilterClients setFilterClients={setFilterClients} />
            </Flex>
          </Flex>

          {loading ? (
            <Flex style={{ height: "30%" }} align="center" justify="center">
              <Spin size="large" />
            </Flex>
          ) : (
            <Table
              columns={columns}
              dataSource={data.map((client) => ({
                key: client.nit,
                ...client
              }))}
              pagination={{ pageSize: 8 }}
            />
          )}
        </main>
      </>
    );
  }
};
