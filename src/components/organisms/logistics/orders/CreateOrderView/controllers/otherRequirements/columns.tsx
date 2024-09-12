import { ITransferOrderOtherRequirements } from "@/types/logistics/schema";
import { TableProps, Popconfirm, Flex } from "antd";
import { CaretLeft, CaretRight, Trash } from "phosphor-react";

const createOtherRequirementsColumns = (
  dataRequirements: ITransferOrderOtherRequirements[],
  handleQuantityRequirement: (requirementId: number, sign: string) => void,
  handleDeleteRequirement: (requirementId: number) => void
): TableProps<ITransferOrderOtherRequirements>["columns"] => [
  {
    title: "Nombre",
    dataIndex: "description",
    key: "description"
  },
  {
    title: "Cantidad",
    dataIndex: "quantity",
    key: "quantity",
    render: (_, record) =>
      dataRequirements.length >= 1 ? (
        <Flex align="center">
          <CaretLeft onClick={() => handleQuantityRequirement(record.id, "-")} />
          &nbsp;&nbsp;{record.quantity}&nbsp;&nbsp;
          <CaretRight onClick={() => handleQuantityRequirement(record.id, "+")} />
        </Flex>
      ) : null
  },
  {
    title: "",
    dataIndex: "alerts",
    key: "alerts",
    render: (_, record) =>
      dataRequirements.length >= 1 ? (
        <Popconfirm
          title="Esta seguro de eliminar?"
          onConfirm={() => handleDeleteRequirement(record.id)}
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

export default createOtherRequirementsColumns;
