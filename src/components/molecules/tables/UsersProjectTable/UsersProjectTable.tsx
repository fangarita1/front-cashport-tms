import { Dispatch, SetStateAction, useState } from "react";
import { Button, Checkbox, Flex, Popconfirm, Spin, Table, Typography, message } from "antd";
import type { TableProps } from "antd";

import { DotsThree, Eye, Plus } from "phosphor-react";

import "./usersprojecttable.scss";
import { useUsers } from "@/hooks/useUsers";
import { FilterUsers } from "@/components/atoms/FilterUsers/FilterUsers";
import { onResendInvitationUser } from "@/services/users/users";
import { SUCCESS } from "@/utils/constants/globalConstants";

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
  setIsViewDetails: Dispatch<SetStateAction<{ active: boolean; id: number }>>;
}

export const UsersProjectTable = ({ idProject, setIsCreateUser, setIsViewDetails }: Props) => {
  const [messageApi, contextHolder] = message.useMessage();

  const onResendInvitation = async (email: string) => {
    const response = await onResendInvitationUser(email);
    if (response.status === SUCCESS) {
      messageApi.open({
        type: "success",
        content: "La invitacion fue enviada nuevamente."
      });
    } else {
      messageApi.open({
        type: "error",
        content: "Oops, hubo un error por favor intenta mas tarde."
      });
    }
  };
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
      render: (_, { ACTIVE, EMAIL }) => (
        <>
          {ACTIVE ? (
            <Flex align="center" className={ACTIVE ? "statusContainer" : "statusContainerPending"}>
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
              onConfirm={() => onResendInvitation(EMAIL)}
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
      render: (_, { ID }) => (
        <Button
          onClick={() => setIsViewDetails({ active: true, id: ID })}
          icon={<Eye size={"1.3rem"} />}
        />
      )
    }
  ];
  const [selectedUsers, setSelectedUsers] = useState({
    zones: [] as any,
    roles: [] as any,
    status: "all" as "all" | "active" | "inactive",
    channel: [] as { id: number; name: string }[],
    line: [] as { id: number; name: string }[],
    subline: [] as { id: number; name: string }[]
  });

  const { data, loading } = useUsers({
    idProject,
    page: 1,
    rolesId: selectedUsers.roles,
    zonesId: selectedUsers.zones,
    activeUsers: selectedUsers.status,
    channel: selectedUsers.channel,
    line: selectedUsers.line,
    subline: selectedUsers.subline
  });
  const onCreateUser = () => {
    setIsViewDetails({ active: false, id: 0 });
    setIsCreateUser(true);
  };
  return (
    <>
      {contextHolder}
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
            onClick={onCreateUser}
            icon={<Plus weight="bold" size={15} />}
          >
            Nuevo Usuario
          </Button>
        </Flex>
        {loading ? (
          <Flex style={{ height: "30%" }} align="center" justify="center">
            <Spin size="large" />
          </Flex>
        ) : (
          <Table columns={columns} dataSource={data} />
        )}
      </main>
    </>
  );
};
