import { useEffect, useState } from "react";
import { Avatar, Button, Flex, Table, Typography } from "antd";
import type { TableProps } from "antd";
import { Clipboard, DotsThree, Eye, Plus } from "phosphor-react";

import { FilterProjects } from "@/components/atoms/FilterProjects/FilterProjects";
import { useProjects } from "@/hooks/useProjects";
import { useAppStore } from "@/lib/store/store";
import { IProject } from "@/types/projects/IProjects";

import "./projectstable.scss";

const { Text } = Typography;

export const ProjectTable = () => {
  const [selectFilters, setSelectFilters] = useState({
    country: [] as string[],
    currency: [] as string[]
  });
  const [page, setPage] = useState(1);
  const { loading, data } = useProjects({
    page: selectFilters.country.length !== 0 || selectFilters.currency.length !== 0 ? 1 : page,
    currencyId: selectFilters.currency,
    countryId: selectFilters.country
  });

  const projects = useAppStore((state) => state.projects);
  const setProjects = useAppStore((state) => state.getProjects);

  const onChangePage = (pagePagination: number) => {
    setPage(pagePagination);
  };

  useEffect(() => {
    if (data.data?.length === 0) return;
    setProjects(data.data?.map((data) => ({ ...data, key: data.ID })));
  }, [data, setProjects]);

  return (
    <main className="mainProjectsTable">
      <Flex justify="space-between" className="mainProjectsTable_header">
        <Flex gap={"10px"}>
          <FilterProjects setSelecetedProjects={setSelectFilters} />
          <Button size="large" icon={<DotsThree size={"1.5rem"} />} />
        </Flex>
        <Button
          type="primary"
          className="buttonNewProject"
          size="large"
          href="/proyectos/new"
          icon={<Plus weight="bold" size={14} />}
        >
          Nuevo Proyecto
        </Button>
      </Flex>
      <Table
        loading={loading}
        scroll={{ y: "61dvh", x: undefined }}
        columns={columns as TableProps<any>["columns"]}
        pagination={{
          pageSize: 25,
          total: data.pagination.totalRows,
          onChange: onChangePage
        }}
        dataSource={projects}
      />
    </main>
  );
};

const columns: TableProps<IProject>["columns"] = [
  {
    title: "Proyecto",
    dataIndex: "name",
    width: "140px",
    key: "name",
    render: (_, { LOGO }) => (
      <>
        {LOGO ? (
          <Avatar
            shape="square"
            size={70}
            src={<img src={LOGO ?? ""} style={{ objectFit: "contain" }} alt="avatar" />}
          />
        ) : (
          <Avatar shape="square" className="imageWithoutImage" size={65} icon={<Clipboard />} />
        )}
      </>
    )
  },
  {
    title: "Name",

    dataIndex: "PROJECT_DESCRIPTION",
    key: "PROJECT_DESCRIPTION",
    render: (text) => <Text>{text}</Text>
  },
  {
    title: "Pais",

    dataIndex: "COUNTRY_NAME",
    key: "COUNTRY_NAME",
    render: (text) => <Text>{text}</Text>
  },
  {
    title: "Direccion",
    dataIndex: "ADDRESS",
    key: "ADDRESS"
  },
  {
    title: "Contact",
    key: "CONTACT",
    dataIndex: "CONTACT",
    render: (text) => <Text>{text}</Text>
  },
  {
    title: "Telefono",
    key: "PHONE",
    dataIndex: "PHONE",
    render: (text) => <Text>{text}</Text>
  },
  {
    title: "Usuarios",
    key: "NUMBER_USERS",
    width: "100px",
    dataIndex: "NUMBER_USERS",
    render: (text) => <Text>{text}</Text>
  },
  {
    title: "Divisas",
    key: "CURRENCY",
    width: "140px",
    dataIndex: "CURRENCY",
    render: (_, { CURRENCY }) => {
      return (
        <>
          {CURRENCY.map(({ CURRENCY_NAME, currency_name = "", id }) => {
            const currencyName = CURRENCY_NAME ?? currency_name;
            return <Text key={`${id}-${currencyName}`}>{currencyName.toUpperCase() + " "}</Text>;
          })}
        </>
      );
    }
  },
  {
    title: "Estado",
    key: "status",
    width: "140px",
    dataIndex: "status",
    render: (_, { IS_ACTIVE }) => (
      <Flex
        align="center"
        className={IS_ACTIVE ? "statusContainerActive" : "statusContainerInactive"}
      >
        <div className={IS_ACTIVE ? "statusActive" : "statusInactive"} />
        <Text>{IS_ACTIVE ? "Activo" : "Inactivo"}</Text>
      </Flex>
    )
  },
  {
    title: "",
    key: "buttonSee",
    width: "60px",
    dataIndex: "",
    render: (_, { ID }) => (
      <Button href={`/proyectos/review/${ID}`} icon={<Eye size={"1.3rem"} />} />
    )
  }
];
