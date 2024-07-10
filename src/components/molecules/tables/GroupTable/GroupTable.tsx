import { Table, TableProps, Typography } from "antd";

const { Text } = Typography;
import "./groupTable.scss";
import { IClient } from "@/types/clientsGroups/IClientsGroups";

interface PropsGroupTable {
  dataClients: IClient[] | undefined;
}
export const GroupTable = ({ dataClients }: PropsGroupTable) => {
  const columns: TableProps<IClient>["columns"] = [
    {
      title: "Nombre",
      dataIndex: "client_name",
      key: "client_name",
      render: (text) => <p>{text}</p>,
      sorter: (a, b) => a.client_name.localeCompare(b.client_name),
      showSorterTooltip: false
    },
    {
      title: "NIT",
      dataIndex: "id",
      key: "id",
      render: (text) => <Text>{text}</Text>,
      sorter: (a, b) => b.id - a.id,
      showSorterTooltip: false
    },
    {
      title: "Cartera",
      key: "total_portfolio",
      dataIndex: "total_portfolio",
      render: (text) => <Text>{text}</Text>,
      sorter: (a, b) => a.total_portfolio - b.total_portfolio,
      showSorterTooltip: false
    },
    {
      title: "Ship To",
      key: "shipto_count",
      dataIndex: "shipto_count",
      render: (text) => <Text>{text}</Text>,
      sorter: (a, b) => b.shipto_count - a.shipto_count,
      showSorterTooltip: false
    },
    {
      title: "Grupos",
      key: "client_count",
      dataIndex: "client_count",
      render: (text) => <Text>{text}</Text>,
      sorter: (a, b) => b.client_count - a.client_count,
      showSorterTooltip: false
    },
    {
      title: "Holding",
      key: "holding_name",
      dataIndex: "holding_name",
      render: (text) => <Text>{text}</Text>,
      sorter: (a, b) => a.holding_name?.localeCompare(b.holding_name),
      showSorterTooltip: false
    },
    {
      title: "Estado",
      key: "status",
      width: "150px",
      dataIndex: "status",
      render: () => <></>
    }
  ];

  return (
    <main className="mainClientsProjectTable">
      <Table
        columns={columns}
        dataSource={dataClients?.map((client) => ({
          key: client.id,
          ...client
        }))}
        pagination={false}
      />
    </main>
  );
};
