import { Dispatch, SetStateAction, useState } from "react";
import { Button, Checkbox, Flex, Popconfirm, Table, TableProps, Typography, Spin } from "antd";
import { DotsThree, Eye, Plus } from "phosphor-react";
import { ModalClientsGroup } from "@/components/molecules/modals/ModalClientsGroup/ModalClientsGroup";
import { useClientsGroups } from "@/hooks/useClientsGroups";
import { IClientsGroups } from "@/types/clientsGroups/IClientsGroups";

import { useParams } from "next/navigation";

import "./ClientsGroupsTable.scss";

const { Text, Link } = Typography;

interface PropsClientsGroupsTable {
  setShowGroupDetails: Dispatch<SetStateAction<boolean>>;
}

export const ClientsGroupsTable = ({ setShowGroupDetails }: PropsClientsGroupsTable) => {
  const { id: idProject } = useParams<{ id: string }>();
  const [isOpenModal, setIsOpenModal] = useState(false);

  const onCreateClientsGroup = () => {
    setIsOpenModal(true);
  };

  // eslint-disable-next-line no-unused-vars
  const [selectedFilters, setSelectedFilters] = useState({
    clients: [] as any,
    subscribers: [] as any,
    status: "all" as "all" | "active" | "inactive",
    shipTo: [] as any
  });

  const { data, loading } = useClientsGroups({
    page: 1,
    idProject,
    clients: selectedFilters.clients,
    subscribers: selectedFilters.subscribers,
    activeUsers: selectedFilters.status
    // shipTo: selectedFilters.shipTo,
  });

  function handleSeeGroupDetails() {
    setShowGroupDetails(true);
  }

  const columns: TableProps<IClientsGroups>["columns"] = [
    {
      title: "",
      dataIndex: "active",
      key: "active",
      render: () => <Checkbox />,
      width: "30px"
    },
    {
      title: "Nombre Grupo",
      dataIndex: "group_name",
      key: "group_name",
      render: (text) => <Link underline>{text}</Link>
    },
    {
      title: "Clientes",
      dataIndex: "CLIENTS",
      key: "CLIENTS",
      render: (text) => <Text>{text}clientes</Text>
    },
    {
      title: "Suscritos",
      key: "subcribers",
      dataIndex: "subcribers",
      render: (text) => <Text>{text}</Text>
    },
    {
      title: "Ship To",
      key: "shipto_count",
      dataIndex: "shipto_count",
      render: (text) => <Text>{text}</Text>
    },
    {
      title: "Estado",
      key: "active",
      dataIndex: "active",
      width: "150px",
      render: (_, { active }) => (
        <>
          {active ? (
            <Flex align="center" className={active ? "statusContainer" : "statusContainerPending"}>
              <div className={active ? "statusActive" : "statusPending"} />
              <Text>{active ? "Activo" : "Inactivo"}</Text>
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
                className={active ? "statusContainer" : "statusContainerPending"}
              >
                <div className={active ? "statusActive" : "statusPending"} />
                <Text>{active ? "Activo" : "Inactivo"}</Text>
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
      render: () => <Button onClick={handleSeeGroupDetails} icon={<Eye size={"1.3rem"} />} />
    }
  ];

  return (
    <>
      <main className="mainClientsGroupsTable">
        <Flex justify="space-between" className="mainClientsGroupsTable_header">
          <Flex gap={"1.75rem"}>
            <Button size="large" icon={<DotsThree size={"1.5rem"} />} />
          </Flex>
          <Button
            type="primary"
            className="buttonNewProject"
            size="large"
            onClick={onCreateClientsGroup}
            icon={<Plus weight="bold" size={15} />}
          >
            Crear Grupo de Clientes
          </Button>
        </Flex>

        {loading ? (
          <Flex style={{ height: "30%" }} align="center" justify="center">
            <Spin size="large" />
          </Flex>
        ) : (
          <Table columns={columns} dataSource={data.map((data) => ({ ...data, key: data.id }))} />
        )}
        <ModalClientsGroup isOpen={isOpenModal} setIsOpenModal={setIsOpenModal} />
      </main>
    </>
  );
};
