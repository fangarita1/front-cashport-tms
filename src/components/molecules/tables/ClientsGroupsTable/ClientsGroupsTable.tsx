import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button, Flex, Popconfirm, Table, TableProps, Typography, Spin, MenuProps } from "antd";

import { Eye, Plus, Triangle } from "phosphor-react";
import { ModalClientsGroup } from "@/components/molecules/modals/ModalClientsGroup/ModalClientsGroup";
import { useClientsGroups } from "@/hooks/useClientsGroups";
import { IClientsGroups } from "@/types/clientsGroups/IClientsGroups";

import { DotsDropdown } from "@/components/atoms/DotsDropdown/DotsDropdown";

import "./ClientsGroupsTable.scss";

const { Text, Link } = Typography;

interface PropsClientsGroupsTable {
  setShowGroupDetails: Dispatch<
    SetStateAction<{
      groupId: number;
      showDetails: boolean;
    }>
  >;
}

export const ClientsGroupsTable = ({ setShowGroupDetails }: PropsClientsGroupsTable) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [height, setHeight] = useState<number>(window.innerHeight);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectedRows, setSelectedRows] = useState<any>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      setHeight(window.innerHeight);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const onCreateClientsGroup = () => {
    setIsOpenModal(true);
  };

  const selectedFilters = {
    clients: [] as any,
    subscribers: [] as any,
    status: "all" as "all" | "active" | "inactive"
  };

  const { data, loading, deleteSelectedGroups } = useClientsGroups({
    page,
    clients: selectedFilters.clients,
    subscribers: selectedFilters.subscribers,
    activeUsers: selectedFilters.status
  });

  function handleSeeGroupDetails(groupId: number) {
    setShowGroupDetails({ groupId, showDetails: true });
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

  const changeGroupsState = () => {
    console.log("change groups state for ", selectedRows);
  };

  const onChangePage = (pagePagination: number) => {
    setPage(pagePagination);
  };

  const deleteGroups = () => {
    deleteSelectedGroups(selectedRows.map((group: IClientsGroups) => group.id));
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
          Eliminar
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
      width: 110,
      dataIndex: "",
      render: (_, row) => (
        <Button onClick={() => handleSeeGroupDetails(row.id)} icon={<Eye size={"1.3rem"} />} />
      )
    }
  ];

  return (
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
        <div className="container-table-of-ant-client-group">
          <Table
            columns={columns}
            dataSource={data?.data.map((data) => ({ ...data, key: data.id }))}
            rowSelection={rowSelection}
            rowClassName={(record) => (selectedRowKeys.includes(record.id) ? "selectedRow" : "")}
            virtual
            scroll={{ y: height - 400, x: 100 }}
            pagination={{
              current: page,
              pageSize: 25,
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
      <ModalClientsGroup isOpen={isOpenModal} setIsOpenModal={setIsOpenModal} />
    </main>
  );
};
