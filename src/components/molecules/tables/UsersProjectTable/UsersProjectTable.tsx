import { Dispatch, SetStateAction, useState } from "react";
import { Button, Checkbox, Flex, Spin, Table, Typography } from "antd";
import type { TableProps } from "antd";

import { DotsThree, Eye, Plus } from "phosphor-react";

import "./usersprojecttable.scss";
import { useUsers } from "@/hooks/useUsers";
import { FilterUsers } from "@/components/atoms/FilterUsers/FilterUsers";

interface DataType {
  key: string;
  ID: number;
  LINE_ID: number;
  SUBLINE_ID: number;
  ZONE_ID: number;
  EMAIL: string;
  PHONE: string;
  USER_NAME: string;
  POSITION: string;
  NOTIFICATION_CONFIG: string;
  UUID: string;
  is_super_admin: number;
  IS_DELETED: number;
  ACTIVE: number;
  ROL_ID: number;
  PROJECT_ID: number;
  PROJECT_DESCRIPTION: string;
  ROL_NAME: string;
}
const { Text, Link } = Typography;

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
      dataIndex: "USER_NAME",
      key: "USER_NAME",
      render: (text) => <Link underline>{text}</Link>
    },
    {
      title: "Correo",
      dataIndex: "EMAIL",
      key: "EMAIL",
      render: (text) => <Text>{text}</Text>
    },
    {
      title: "Telefono",
      key: "PHONE",
      dataIndex: "PHONE",
      render: (text) => <Text>{text}</Text>
    },
    {
      title: "Rol",
      key: "ROL_NAME",
      dataIndex: "ROL_NAME",
      render: (text) => <Text>{text}</Text>
    },
    // {
    //   title: "Clientes",
    //   key: "clients",
    //   dataIndex: "clients",
    //   render: (text) => <Text>{text}</Text>
    // },
    // {
    //   title: "Zona",
    //   key: "zone",
    //   dataIndex: "zone",
    //   render: (text) => <Text>{text}</Text>
    // },
    // {
    //   title: "Responsability",
    //   key: "responsability",
    //   dataIndex: "responsability",
    //   render: (text) => <Text>{text}</Text>
    // },
    {
      title: "Estado",
      key: "status",
      width: "150px",
      dataIndex: "status",
      render: (_, { ACTIVE }) => (
        <Flex align="center" className={ACTIVE ? "statusContainer" : "statusContainerPending"}>
          <div className={ACTIVE ? "statusActive" : "statusPending"} />
          <Text>{ACTIVE ? "Activo" : "Inactivo"}</Text>
        </Flex>
      )
    },
    {
      title: "",
      key: "seeProject",
      width: "40px",
      dataIndex: "",
      render: () => <Button onClick={() => setIsViewDetails(true)} icon={<Eye size={"1.3rem"} />} />
    }
  ];
  const [selectedUsers, setSelectedUsers] = useState({
    zones: [],
    roles: []
  });
  console.log(selectedUsers);

  const { data, loading } = useUsers({
    idProject,
    page: 1,
    rolesId: selectedUsers.roles,
    zonesId: selectedUsers.zones
  });
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
              <FilterUsers setSelectedUsers={setSelectedUsers} idProject={idProject} />
              <Button size="large" icon={<DotsThree size={"1.5rem"} />} />
            </Flex>
            <Button
              type="primary"
              className="buttonNewProject"
              size="large"
              onClick={() => setIsCreateUser(true)}
              icon={<Plus weight="bold" size={15} />}
            >
              Nuevo Usuario
            </Button>
          </Flex>
          <Table columns={columns} dataSource={data} />
        </main>
      )}
    </>
  );
};
