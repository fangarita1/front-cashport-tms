import { useEffect, useState } from "react";
import { Avatar, Button, Flex, Table, Typography } from "antd";
import type { TableProps } from "antd";
import { Clipboard, DotsThree, Eye, Plus, Triangle } from "phosphor-react";

import { FilterProjects } from "@/components/atoms/Filters/FilterProjects/FilterProjects";
import { useProjects } from "@/hooks/useProjects";
import { useAppStore } from "@/lib/store/store";
import { IProject } from "@/types/projects/IProjects";

import "./vehicleTable.scss";
import UiSearchInput from "@/components/ui/search-input";
import { countries } from "@/utils/countries";
import { ICarrier } from "@/types/logistics/schema";

const { Text } = Typography;

export const VehicleTable = () => {
  const [selectFilters, setSelectFilters] = useState({
    country: [] as string[],
    currency: [] as string[]
  });
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const { loading, data } = useProjects({
    page: selectFilters.country.length !== 0 || selectFilters.currency.length !== 0 ? 1 : page,
    currencyId: selectFilters.currency,
    countryId: selectFilters.country,
    searchQuery:''
  });

  const projects = useAppStore((state) => state.projects);
  const setProjects = useAppStore((state) => state.getProjects);

  const onChangePage = (pagePagination: number) => {
    setPage(pagePagination);
  };

  useEffect(() => {
    if (data.data?.length === 0) return;
    setProjects(
      data.data
        ?.filter((f) => f.ID !== 44)
        .map((data) => {
          return { ...data, key: data.ID };
        })
    );
  }, [data, setProjects]);

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
          <FilterProjects setSelecetedProjects={setSelectFilters} />
          <Button className="options" href="/logistics/vehicles/vehicle" icon={<DotsThree size={"1.5rem"}/>} />
          <Button
          type="primary"
          className="buttonNewProject"
          size="large"
          href="/logistics/vehicles/vehicle"
        >
          Nuevo Vehiculo
          {<Plus weight="bold" size={14} />}
        </Button>
        </Flex>
      </Flex>
      <Table
        loading={loading}
        scroll={{ y: "61dvh", x: undefined }}
        columns={columns as TableProps<any>["columns"]}
        pagination={{
          pageSize: 25,
          total: data.pagination.totalRows,
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
      title: "Tipo de Vehiculo",
      dataIndex: "type",
      key: "type"
    },
    {
      title: "Marca",
      dataIndex: "marca",
      key: "marca"
    },
    {
      title: "Placa",
      dataIndex: "plate",
      key: "plate"
    },
    {
      title: "Modelo",
      dataIndex: "model",
      key: "model"
    },
  {
    title: "",
    key: "buttonSee",
    width: "54px",
    dataIndex: "",
    render: (_, { id }) => (
      <Button href={`/vehicle/${id}`} className="icon-detail" icon={<Eye size={20} />} />
    )
  }
];
