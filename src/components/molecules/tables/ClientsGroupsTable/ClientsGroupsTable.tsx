import { Dispatch, SetStateAction, useState } from "react";
import { Button, Flex, Popconfirm, Table, TableProps, Typography, Spin, MenuProps } from "antd";

import { Eye, Plus } from "phosphor-react";
import { ModalClientsGroup } from "@/components/molecules/modals/ModalClientsGroup/ModalClientsGroup";
import { useClientsGroups } from "@/hooks/useClientsGroups";
import { IClientsGroups } from "@/types/clientsGroups/IClientsGroups";

import { useParams } from "next/navigation";

import { DotsDropdown } from "@/components/atoms/DotsDropdown/DotsDropdown";

import "./ClientsGroupsTable.scss";

const { Text, Link } = Typography;

interface PropsClientsGroupsTable {
  setShowGroupDetails: Dispatch<SetStateAction<boolean>>;
}

export const ClientsGroupsTable = ({ setShowGroupDetails }: PropsClientsGroupsTable) => {
  const { id: idProject } = useParams<{ id: string }>();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectedRows, setSelectedRows] = useState<any>([]);

  const onCreateClientsGroup = () => {
    setIsOpenModal(true);
  };

  const selectedFilters = {
    clients: [] as any,
    subscribers: [] as any,
    status: "all" as "all" | "active" | "inactive"
  };

  const { data, loading } = useClientsGroups({
    page: 1,
    idProject,
    clients: selectedFilters.clients,
    subscribers: selectedFilters.subscribers,
    activeUsers: selectedFilters.status
  });

  function handleSeeGroupDetails() {
    setShowGroupDetails(true);
  }

  const onSelectChange = (newSelectedRowKeys: React.Key[], newSelectedRow: any) => {
    setSelectedRowKeys(newSelectedRowKeys);
    setSelectedRows(newSelectedRow);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange
  };

  const changeGroupsState = () => {
    console.log("change groups state for ", selectedRows);
  };

  const deleteGroups = () => {
    console.log("delete groups ", selectedRows);
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Button className="buttonOutlined" onClick={changeGroupsState}>
          Cambiar de estado
        </Button>
      )
    },
    {
      key: "2",
      label: (
        <Button className="buttonOutlined" onClick={deleteGroups}>
          Eliminar grupo
        </Button>
      )
    }
  ];

  const columns: TableProps<IClientsGroups>["columns"] = [
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
            <DotsDropdown items={items} />
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
          <Table
            columns={columns}
            dataSource={data.map((data) => ({ ...data, key: data.id }))}
            rowSelection={rowSelection}
            rowClassName={(record) => (selectedRowKeys.includes(record.id) ? "selectedRow" : "")}
          />
        )}
        <ModalClientsGroup isOpen={isOpenModal} setIsOpenModal={setIsOpenModal} />
      </main>
    </>
  );
};
