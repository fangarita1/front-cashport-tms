import { useState } from "react";
import { Button, Flex, Table, Typography } from "antd";
import type { TableProps } from "antd";
import { DotsThree, Eye, Plus, Triangle } from "phosphor-react";

import "./driverTable.scss";
import UiSearchInput from "@/components/ui/search-input";
import { IDriver } from "@/types/logistics/schema";
import { getAllDrivers } from "@/services/logistics/drivers";

export const DriverTable = () => {
  const [drivers, setDrivers] = useState<IDriver[]>([]);
  const [driversOptions, setDriversOptions] = useState<any>([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const datasource: any[] = [];

  const { Text } = Typography;

  const loadDrivers = async () => {
    if(drivers != undefined && drivers.length > 0) return;
    const result = await getAllDrivers();
    if (result.data.data.length > 0) {
      const listDrivers: any[] | ((prevState: IDriver[]) => IDriver[]) = [];
      const listDriversOptions: { label: any; value: any }[] = [];

      result.data.data.forEach((item, index) => {
        listDrivers.push(item);
        listDriversOptions.push({ label: item.name, value: item.id });
      });

      setDrivers(listDrivers);
      setDriversOptions(listDriversOptions);
    }
  };

  loadDrivers();

  const onChangePage = (pagePagination: number) => {
    setPage(pagePagination);
  };

  drivers.forEach((element) => {
    if (element.active.data[0] === 1) {
      element.status = true;
    } else {
      element.status = false;
    }
    datasource.push({
      id: element.id,
      company: element.company,
      name: element.name,
      docuemnt: element.document,
      phone: element.phone,
      email: element.email,
      status: element.status
    });
  });

  const columns: TableProps<IDriver>["columns"] = [
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
      key: "status",
      className: "tableTitle",
      width: "130px",
      dataIndex: "status",
      render: (_, { status }) => (
        <Flex>
          <Flex
            align="center"
            className={status ? "statusContainerActive" : "statusContainerInactive"}
          >
            <div className={status ? "statusActive" : "statusInactive"} />
            <Text>{status ? "Activo" : "Inactivo"}</Text>
          </Flex>
        </Flex>
      )
    },
    {
      title: "",
      key: "buttonSee",
      width: "54px",
      dataIndex: "",
      render: (_, { id }) => (
        <Button href={`/logistics/drivers/driver/${id}`} className="icon-detail" icon={<Eye size={20} />} />
      )
    }
  ];

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
          <Button
            className="options"
            href="/logistics/drivers/driver"
            icon={<DotsThree size={"1.5rem"} />}
          />
          <Button
            type="primary"
            className="buttonNewProject"
            size="large"
            href="/logistics/drivers/new"
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
          showSizeChanger: false,
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
        dataSource={datasource}
      />
    </div>
  );
};