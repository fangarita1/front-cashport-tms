import { IVehicleType } from "@/types/logistics/schema";
import { TableProps, Popconfirm, Flex } from "antd";
import { CaretLeft, CaretRight, Trash } from "phosphor-react";

const createColumnsSuggestedVehicles = (
  dataVehicles: IVehicleType[],
  handleQuantityVehicle: (vehicleId: number, sign: string) => void,
  handleDeleteVehicle: (vehicleId: number) => void
): TableProps<IVehicleType>["columns"] => [
  {
    title: "Vehículo",
    dataIndex: "description",
    key: "description"
  },
  {
    title: "Cantidad",
    dataIndex: "quantity",
    key: "quantity",
    render: (_, record) =>
      dataVehicles.length >= 1 ? (
        <Flex align="center">
          <CaretLeft onClick={() => handleQuantityVehicle(record.id, "-")} />
          &nbsp;&nbsp;{record.quantity}&nbsp;&nbsp;
          <CaretRight onClick={() => handleQuantityVehicle(record.id, "+")} />
        </Flex>
      ) : null
  },
  {
    title: "",
    dataIndex: "alerts",
    key: "alerts",
    render: (_, record) =>
      dataVehicles.length >= 1 ? (
        <Popconfirm
          title="¿Está seguro de eliminar?"
          onConfirm={() => handleDeleteVehicle(record.id)}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: 32,
              width: 32
            }}
          >
            <Trash size={24} />
          </div>
        </Popconfirm>
      ) : null
  }
];

export default createColumnsSuggestedVehicles;
