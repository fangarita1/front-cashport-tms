import { useState } from "react";
import { Button, Flex, Table, Typography } from "antd";
import type { TableProps } from "antd";
import { DotsThree, Eye, Plus, Triangle } from "phosphor-react";
import "./vehicleTable.scss";
import UiSearchInput from "@/components/ui/search-input";
import { IVehicle } from "@/types/logistics/schema";
import { getAllVehicles } from "@/services/logistics/vehicle";

const { Text } = Typography;

export const VehicleTable = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [vehicles, setDrivers] = useState<IVehicle[]>([]);
  const [vehiclesOptions, setDriversOptions] = useState<any>([]);
  const datasource: any[] = [];

  const loadDrivers = async () => {
    if(vehicles != undefined && vehicles.length > 0) return;
    const result = await getAllVehicles();
    if (result.data.data.length > 0) {
      const listVehicles: any[] | ((prevState: IVehicle[]) => IVehicle[]) = [];
      const listVehiclesOptions: { label: any; value: any }[] = [];

      result.data.data.forEach((item, index) => {
        listVehicles.push(item);
        listVehiclesOptions.push({ label: item.name, value: item.id });
      });

      setDrivers(listVehicles);
      setDriversOptions(listVehiclesOptions);
    }
  };

  loadDrivers();

  const onChangePage = (pagePagination: number) => {
    setPage(pagePagination);
  };

  vehicles.forEach((element) => {
    if (element.active.data[0] === 1) {
      element.status = true;
    } else {
      element.status = false;
    }
    datasource.push({
      company: element.company,
      type: element.vehicle_type,
      mark: element.brand,
      plate: element.plate_number,
      model: element.model,
      status: element.status
    });
  });

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
      <Button href={`/vehicle/${id}`} className="icon-detail" icon={<Eye size={20} />} />
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
          <Button className="options" href="/logistics/vehicles/vehicle" icon={<DotsThree size={"1.5rem"}/>} />
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
        dataSource={datasource}
      />
    </div>
  );
};