import { useEffect, useState } from "react";
import { Button, Flex, Table, Typography } from "antd";
import type { TableProps } from "antd";
import { DotsThree, Eye, Plus, Triangle } from "phosphor-react";
import "./vehicleTable.scss";
import UiSearchInput from "@/components/ui/search-input";
import { IVehicle } from "@/types/logistics/schema";
import { getAllVehicles } from "@/services/logistics/vehicle";
import useSWR from "swr";

const { Text } = Typography;

export const VehicleTable = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const onChangePage = (pagePagination: number) => {
    setPage(pagePagination);
  };
  const { data: vihicles, error } = useSWR("/vehicle/all", getAllVehicles);

  const columns: TableProps<IVehicle>["columns"] = [
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
      dataIndex: "mark",
      key: "mark"
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
        <Button
          href={`/logistics/vehicles/vehicle/${id}`}
          className="icon-detail"
          icon={<Eye size={20} />}
        />
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
            href="/logistics/vehicles/vehicle"
            icon={<DotsThree size={"1.5rem"} />}
          />
          <Button
            type="primary"
            className="buttonNewProject"
            size="large"
            href="/logistics/vehicles/new"
          >
            Nuevo Vehiculo
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
        dataSource={
          vihicles?.data?.data?.map((e) => ({
            company: e.company,
            type: e.vehicle_type,
            mark: e.brand,
            plate: e.plate_number,
            model: e.model,
            id: e.id
          })) || []
        }
      />
    </div>
  );
};
