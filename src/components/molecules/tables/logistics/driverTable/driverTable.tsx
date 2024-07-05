import { useEffect, useState } from "react";
import { Avatar, Button, Flex, Table, Typography } from "antd";
import type { TableProps } from "antd";
import { Clipboard, DotsThree, Eye, Plus, Triangle } from "phosphor-react";

import { FilterProjects } from "@/components/atoms/Filters/FilterProjects/FilterProjects";
import { useProjects } from "@/hooks/useProjects";
import { useAppStore } from "@/lib/store/store";
import { IProject } from "@/types/projects/IProjects";

import "./driverTable.scss";
import UiSearchInput from "@/components/ui/search-input";
import { countries } from "@/utils/countries";
import { ICarrier } from "@/types/logistics/schema";

const { Text } = Typography;

export const DriverTable = () => {

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");


  const projects = useAppStore((state) => state.projects);
  const setProjects = useAppStore((state) => state.getProjects);

  const onChangePage = (pagePagination: number) => {
    setPage(pagePagination);
  };

  const invFiltered =
    projects &&
    projects.filter((f) => {
      return f.PROJECT_DESCRIPTION.toLowerCase().includes(search.trim().toLowerCase());
    });

  const prueba: ICarrier = {
    id: 0,
    description: "Prueba",
    nit: "12345",
    icon: "sdasdasd",
    active: false,
    created_at: new Date(),
    created_by: "pueba"
  }
  return (
    <div className="mainProjectsTable">
      <Flex justify="space-between" className="mainProjectsTable_header">
        <Flex gap={"10px"}>
          <UiSearchInput
            className="search"
            placeholder="Buscar"
            onChange={(event) => {
              setTimeout(() => {
                setSearch(event.target.value);
              }, 1000);
            }}
          />
          <Button className="options" href="/logistics/drivers/driver" icon={<DotsThree size={"1.5rem"}/>} />
          <Button
          type="primary"
          className="buttonNewProject"
          size="large"
          href="/logistics/drivers/driver"
        >
          Nuevo Conductor
          {<Plus weight="bold" size={14} />}
        </Button>
        </Flex>
      </Flex>
      <Table
        scroll={{ y: "61dvh", x: undefined }}
        columns={columns as TableProps<any>["columns"]}
        pagination={{
          pageSize: 25,
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
        dataSource={invFiltered}
      />
    </div>
  );
};

const columns: TableProps<ICarrier>["columns"] = [
    {
      title: "Empresa",
      dataIndex: "company",
      key: "company"
    },
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "Documento",
      dataIndex: "docuemnt",
      key: "docuemnt"
    },
    {
      title: "Telefono",
      dataIndex: "phone",
      key: "phone"
    },
    {
      title: "Correo Electronico",
      dataIndex: "email",
      key: "email"
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status"
    },
  {
    title: "",
    key: "buttonSee",
    width: "54px",
    dataIndex: "",
    render: (_, { id }) => (
      <Button href={`/driver/${id}`} className="icon-detail" icon={<Eye size={20} />} />
    )
  }
];
