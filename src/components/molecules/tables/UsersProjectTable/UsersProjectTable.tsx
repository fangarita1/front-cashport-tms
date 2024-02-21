import { Dispatch, SetStateAction } from "react";
import { Button, Checkbox, Flex, Input, Spin, Table, Typography } from "antd";
import type { TableProps } from "antd";

import { FilterUsers } from "@/components/atoms/FilterUsers/FilterUsers";

import { DotsThree, Eye, Plus } from "phosphor-react";

import "./usersprojecttable.scss";
import { useUsers } from "@/hooks/useUsers";

interface DataType {
  key: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  clients: string;
  zone: string;
  responsability: string;
  status: "Pendiente";
}
const { Text, Link } = Typography;

const dataFake: DataType[] = [
  {
    key: "1",
    name: "John Brown",
    phone: "(+57) 3227049632",
    email: "asdas@asdasd.com",
    clients: "36",
    responsability: "Canal mayorista",
    zone: "America",
    status: "Pendiente",
    role: "Ejecutivo"
  },
  {
    key: "2",
    name: "Jim Green",
    phone: "(+57) 3227049632",
    email: "asdas@asdasd.com",
    clients: "36",
    responsability: "Canal mayorista",
    zone: "America",
    status: "Pendiente",
    role: "Ejecutivo"
  },
  {
    key: "3",
    name: "Joe Black",
    phone: "(+57) 3227049632",
    email: "asdas@asdasd.com",
    clients: "36",
    responsability: "Canal mayorista",
    zone: "America",
    status: "Pendiente",
    role: "Ejecutivo"
  },
  {
    key: "4",
    name: "Joe Black",
    phone: "(+57) 3227049632",
    email: "asdas@asdasd.com",
    clients: "36",
    responsability: "Canal mayorista",
    zone: "America",
    status: "Pendiente",
    role: "Ejecutivo"
  },
  {
    key: "5",
    name: "Joe Black",
    phone: "(+57) 3227049632",
    email: "asdas@asdasd.com",
    clients: "36",
    responsability: "Canal mayorista",
    zone: "America",
    status: "Pendiente",
    role: "Ejecutivo"
  },
  {
    key: "6",
    name: "Joe Black",
    phone: "(+57) 3227049632",
    email: "asdas@asdasd.com",
    clients: "36",
    responsability: "Canal mayorista",
    zone: "America",
    status: "Pendiente",
    role: "Ejecutivo"
  },
  {
    key: "7",
    name: "Joe Black",
    phone: "(+57) 3227049632",
    email: "asdas@asdasd.com",
    clients: "36",
    responsability: "Canal mayorista",
    zone: "America",
    status: "Pendiente",
    role: "Ejecutivo"
  },
  {
    key: "8",
    name: "Joe Black",
    phone: "(+57) 3227049632",
    email: "asdas@asdasd.com",
    clients: "36",
    responsability: "Canal mayorista",
    zone: "America",
    status: "Pendiente",
    role: "Ejecutivo"
  }
];

const { Search } = Input;
interface Props {
  idProject: string;
  setIsCreateUser: Dispatch<SetStateAction<boolean>>;
  setIsViewDetails: Dispatch<SetStateAction<boolean>>;
}

export const UsersProjectTable = ({ idProject, setIsCreateUser, setIsViewDetails }: Props) => {
  const columns: TableProps<DataType>["columns"] = [
    {
      title: "",
      dataIndex: "active",
      key: "active",
      render: () => <Checkbox />,
      width: "30px"
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <Link underline>{text}</Link>
    },
    {
      title: "Correo",
      dataIndex: "email",
      key: "email",
      render: (text) => <Text>{text}</Text>
    },
    {
      title: "Telefono",
      key: "phone",
      dataIndex: "phone",
      render: (text) => <Text>{text}</Text>
    },
    {
      title: "Rol",
      key: "role",
      dataIndex: "role",
      render: (text) => <Text>{text}</Text>
    },
    {
      title: "Clientes",
      key: "clients",
      dataIndex: "clients",
      render: (text) => <Text>{text}</Text>
    },
    {
      title: "Zona",
      key: "zone",
      dataIndex: "zone",
      render: (text) => <Text>{text}</Text>
    },
    {
      title: "Responsability",
      key: "responsability",
      dataIndex: "responsability",
      render: (text) => <Text>{text}</Text>
    },
    {
      title: "Estado",
      key: "status",
      width: "160px",
      dataIndex: "status",
      render: (text) => (
        <Flex align="center" className="statusContainer">
          <div className="statusPending" />
          <Text>{text}</Text>
        </Flex>
      )
    },
    {
      title: "Estado",
      key: "status",
      width: "40px",
      dataIndex: "",
      render: () => <Button onClick={() => setIsViewDetails(true)} icon={<Eye size={"1.3rem"} />} />
    }
  ];
  const { data, loading } = useUsers({ idProject, page: 1 });
  console.log(data);

  return (
    <>
      {loading ? (
        <Flex style={{ height: "30%" }} align="center" justify="center">
          <Spin size="large" />
        </Flex>
      ) : (
        <main className="mainUsersProjectTable">
          <Flex justify="space-between" className="mainUsersProjectTable_header">
            <Flex gap={"1.75rem"}>
              <Search
                className="inputSearch"
                size="large"
                placeholder="Buscar"
                style={{ width: 300 }}
              />
              <FilterUsers />
              <Button size="large" icon={<DotsThree size={"1.5rem"} />} />
            </Flex>
            <Button
              type="primary"
              className="buttonNewProject"
              size="large"
              onClick={() => setIsCreateUser(true)}
              icon={<Plus size={13} />}
            >
              Nuevo Usuario
            </Button>
          </Flex>
          <Table columns={columns} dataSource={dataFake} />
        </main>
      )}
    </>
  );
};
