import { Dispatch, SetStateAction, useState } from "react";
import { Button, Flex, Table, TableProps, Typography, Spin } from "antd";
import { Eye, Plus, Triangle } from "phosphor-react";

import { DotsDropdown } from "@/components/atoms/DotsDropdown/DotsDropdown";
import useScreenHeight from "@/components/hooks/useScreenHeight";
import UiSearchInput from "@/components/ui/search-input";
import UiFilterDropdown from "@/components/ui/ui-filter-dropdown";

import "./communicationsTable.scss";

const { Text, Link } = Typography;

interface PropsCommunicationsTable {
  setShowCommunicationDetails: Dispatch<
    SetStateAction<{
      communicationId: number;
      showDetails: boolean;
    }>
  >;
}

export const CommunicationsTable = ({ setShowCommunicationDetails }: PropsCommunicationsTable) => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectedRows, setSelectedRows] = useState<any>([]);

  const height = useScreenHeight();

  const onCreateCommunication = () => {
    console.log("create communication");
  };

  const loading = false;

  function handleSeeCommunicationDetails(communicationId: number) {
    setShowCommunicationDetails({ communicationId, showDetails: true });
  }

  const onSelectChange = (newSelectedRowKeys: React.Key[], newSelectedRow: any) => {
    setSelectedRowKeys(newSelectedRowKeys);
    setSelectedRows(newSelectedRow);
  };

  const rowSelection = {
    columnWidth: 40,
    selectedRowKeys,
    onChange: onSelectChange
  };

  const onChangePage = (pagePagination: number) => {
    setPage(pagePagination);
  };

  const columns: TableProps<any>["columns"] = [
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
      render: (text, row) => (
        <Link onClick={() => handleSeeCommunicationDetails(row.id)} underline>
          {text}
        </Link>
      ),
      sorter: (a, b) => b.name.localeCompare(a.name),
      showSorterTooltip: false
    },
    {
      title: "Motivo",
      dataIndex: "motive",
      key: "motive",
      render: (text) => <Text>{text}</Text>,
      sorter: (a, b) => b.motive.localeCompare(a.motive),
      showSorterTooltip: false
    },
    {
      title: "Via",
      key: "via",
      dataIndex: "via",
      render: (text) => <Text>{text}</Text>,
      sorter: (a, b) => b.via.localeCompare(a.via),
      showSorterTooltip: false
    },
    {
      title: "Frecuencia",
      key: "frequency",
      dataIndex: "frequency",
      render: (text) => <Text>{text}</Text>,
      sorter: (a, b) => b.frequency.localeCompare(a.frequency),
      showSorterTooltip: false
    },
    {
      title: "Cantidad clientes",
      key: "clientsCount",
      dataIndex: "clientsCount",
      render: (text) => <Text>{text}</Text>,
      sorter: (a, b) => b.clientsCount - a.clientsCount,
      showSorterTooltip: false
    },
    {
      title: "",
      key: "seeProject",
      width: 110,
      dataIndex: "",
      render: (_, row) => (
        <Button
          onClick={() => handleSeeCommunicationDetails(row.id)}
          icon={<Eye size={"1.3rem"} />}
        />
      )
    }
  ];

  return (
    <main className="mainCommunicationsTable">
      <Flex justify="space-between">
        <Flex gap={"1.75rem"}>
          <UiSearchInput
            className="search"
            placeholder="Buscar"
            onChange={(event) => {
              setTimeout(() => {
                setSearch(event.target.value);
              }, 1000);
            }}
          />
          <UiFilterDropdown />
          <DotsDropdown />
        </Flex>
        <Button
          type="primary"
          className="buttonNewCommunication"
          size="large"
          onClick={onCreateCommunication}
        >
          Crear Comunicación
          <Plus weight="bold" size={15} />
        </Button>
      </Flex>

      {loading ? (
        <Flex style={{ height: "30%" }} align="center" justify="center">
          <Spin size="large" />
        </Flex>
      ) : (
        <Table
          className="communicationsTable"
          columns={columns}
          dataSource={mockData.map((data) => ({ ...data, key: data.id }))}
          rowSelection={rowSelection}
          rowClassName={(record) => (selectedRowKeys.includes(record.id) ? "selectedRow" : "")}
          virtual
          scroll={{ y: height - 400, x: 100 }}
          pagination={{
            current: page,
            pageSize: 25,
            showSizeChanger: false,
            position: ["none", "bottomRight"],
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
      )}
    </main>
  );
};

const mockData = [
  {
    id: 1,
    name: "Comunicación 1",
    motive: "Circularizacion",
    via: "Correo electronico",
    frequency: "El segundo viernes",
    clientsCount: 10
  },
  {
    id: 2,
    name: "Comunicación 2",
    motive: "Conciliacion",
    via: "Correo electronico",
    frequency: "El segundo viernes",
    clientsCount: 14
  },
  {
    id: 3,
    name: "Comunicación 3",
    motive: "Ajustes contables",
    via: "Correo electronico",
    frequency: "El segundo viernes",
    clientsCount: 23
  },
  {
    id: 4,
    name: "Comunicación 4",
    motive: "Cierre de novedades",
    via: "Correo electronico",
    frequency: "El segundo viernes",
    clientsCount: 45
  }
];
