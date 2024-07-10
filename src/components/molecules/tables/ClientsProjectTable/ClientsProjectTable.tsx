import {
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
  ReactElement,
  JSXElementConstructor
} from "react";
import { useParams } from "next/navigation";
import { Button, Flex, MenuProps, message, Spin, Table, TableProps, Typography } from "antd";
import { Eye, Plus, Triangle } from "phosphor-react";
import { FilterClients } from "@/components/atoms/Filters/FilterClients/FilterClients";
import { DotsDropdown } from "@/components/atoms/DotsDropdown/DotsDropdown";
import { IClient } from "@/types/clients/IClients";
import { useClientsTable } from "@/hooks/useClients";
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
  setSelectedRows?: Dispatch<SetStateAction<IClient[]>>;
  selectedClientsKeys?: number[];
  messageContext?: ReactElement<any, string | JSXElementConstructor<any>>;
}

export const ClientsProjectTable = ({
  setIsCreateClient,
  setIsViewDetailsClients,
  placedIn = "tab",
  setSelectedRows,
  selectedClientsKeys
}: Props) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [page, setPage] = useState(1);
  const [messageApi, contextHolder] = message.useMessage();
  const [height, setHeight] = useState<number>(window.innerHeight);
  const [filterClients, setFilterClients] = useState({
    city: [] as number[],
    holding: [] as number[],
    risk: [] as number[],
    payment_condition: [] as number[],
    radication_type: [] as number[],
    status: [] as number[]
  });

  const { id: idProject } = useParams<{ id: string }>();

  const onChangePage = (pagePagination: number) => {
    setPage(pagePagination);
  };

  useEffect(() => {
    // Este useEffect es para seleccionar las filas
    // de clientes que ya pertenecen al grupo
    // cuando se va hacer PUT
    if (placedIn === "modal" && selectedClientsKeys && selectedClientsKeys.length > 0) {
      setSelectedRowKeys(selectedClientsKeys);
    }

    return () => {
      setSelectedRowKeys([]);
    };
  }, [placedIn, selectedClientsKeys]);

  const onSelectChange = (newSelectedRowKeys: React.Key[], newSelectedRow: any) => {
    setSelectedRowKeys(newSelectedRowKeys);

    if (setSelectedRows) {
      setSelectedRows(newSelectedRow);
    }
  };

  const rowSelection = {
    columnWidth: 40,
    selectedRowKeys,
    onChange: onSelectChange
  };

  const onCreateClient = () => {
    if (setIsCreateClient) {
      setIsCreateClient(true);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setHeight(window.innerHeight);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const { data, isLoading, error } = useClientsTable({
    idProject,
    page: page,
    city: filterClients.city,
    holding: filterClients.holding,
    risk: filterClients.risk,
    payment_condition: filterClients.payment_condition,
    radication_type: filterClients.radication_type,
    status: filterClients.status,
    messageApi
  });

  useEffect(() => {
    if (typeof error === "string") {
      messageApi.open({ type: "error", content: error });
    } else if (error?.message) {
      messageApi.open({ type: "error", content: error.message });
    }
  }, [error]);
  let columns: TableProps<IClient>["columns"] = [];
  if (placedIn === "tab") {
    columns = [
      {
        title: "Name",
        dataIndex: "client_name",
        key: "client_name",
        render: (text, { nit }) => (
          <button
            type="button"
            className="name"
            onClick={() => {
              if (setIsViewDetailsClients) {
                setIsViewDetailsClients({ active: true, id: nit });
              }
            }}
          >
            {text}
          </button>
        )
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
        width: 96,
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
        render: (status) => (
          <Flex align="center" className="statusContainer">
            <div className="statusActive" />
            <Text className="statusContainer__text">{status}</Text>
          </Flex>
        )
      },
      {
        align: "center",
        title: "",
        key: "seeProject",
        width: 100,
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
      <main className="mainClientsProjectTable">
        {contextHolder}
        <Flex justify="space-between" className="mainClientsProjectTable_header">
          <Flex gap={"0.625rem"}>
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

        {isLoading ? (
          <Flex style={{ height: "30%" }} align="center" justify="center">
            <Spin size="large" />
          </Flex>
        ) : (
          <div className="container-table-of-ant">
            <Table
              columns={columns}
              dataSource={data?.data?.map((client) => ({
                ...client,
                key: client.nit
              }))}
              virtual
              scroll={{ y: height - 400, x: 100 }}
              rowSelection={rowSelection}
              rowClassName={(record) => (selectedRowKeys.includes(record.nit) ? "selectedRow" : "")}
              pagination={{
                current: page,
                pageSize: 50,
                showSizeChanger: false,
                position: ["none", "bottomRight"],
                total: data?.pagination?.totalRows,
                onChange: onChangePage,
                itemRender: (page, type, originalElement) => {
                  if (type === "prev") {
                    return <Triangle size={".75rem"} weight="fill" className="prev" />;
                  } else if (type === "next") {
                    return <Triangle size={".75rem"} weight="fill" className="next" />;
                  } else if (type === "page") {
                    return <Flex className="pagination">{page}</Flex>;
                  }
                  return originalElement;
                }
              }}
            />
          </div>
        )}
      </main>
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
      <main className="mainClientsProjectTable">
        <Flex justify="space-between" className="mainClientsProjectTable_header">
          <Flex>
            <FilterClients setFilterClients={setFilterClients} />
          </Flex>
        </Flex>

        {isLoading ? (
          <Flex style={{ height: "30%" }} align="center" justify="center">
            <Spin size="large" />
          </Flex>
        ) : (
          <Table
            columns={columns}
            dataSource={data?.data?.map((client) => ({
              ...client,
              key: client.nit
            }))}
            pagination={{ pageSize: 8 }}
            rowSelection={rowSelection}
            rowClassName={(record) => (selectedRowKeys.includes(record.nit) ? "selectedRow" : "")}
          />
        )}
      </main>
    );
  }
};
