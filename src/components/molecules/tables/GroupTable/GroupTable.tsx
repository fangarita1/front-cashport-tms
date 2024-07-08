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
      render: (text) => <p>{text}</p>
    },
    {
      title: "NIT",
      dataIndex: "id",
      key: "id",
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
