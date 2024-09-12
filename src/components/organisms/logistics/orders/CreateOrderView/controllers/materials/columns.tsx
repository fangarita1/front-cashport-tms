import { IMaterial } from "@/types/logistics/schema";
import { TableProps, Popconfirm, Flex } from "antd";
import { CaretLeft, CaretRight, Trash } from "phosphor-react";

const createColumnsMaterials = (
  dataCarga: IMaterial[],
  handleQuantityMaterial: (materialId: number, sign: string) => void,
  handleDeleteMaterial: (materialId: number) => void
): TableProps<IMaterial>["columns"] => [
  {
    title: "Cantidad",
    dataIndex: "quantity",
    key: "quantity",
    render: (_, record) =>
      dataCarga.length >= 1 ? (
        <Flex align="center">
          <CaretLeft onClick={() => handleQuantityMaterial(record.id, "-")} />
          &nbsp;&nbsp;{record.quantity}&nbsp;&nbsp;
          <CaretRight onClick={() => handleQuantityMaterial(record.id, "+")} />
        </Flex>
      ) : null
  },
  {
    title: "SKU",
    dataIndex: "sku",
    key: "sku"
  },
  {
    title: "Nombre",
    dataIndex: "description",
    key: "description"
  },
  {
    title: "Volumen",
    dataIndex: "m3_volume",
    key: "m3_volume",
    render: (_, record) => {
      return record.m3_volume + " m3";
    }
  },
  {
    title: "Alto",
    dataIndex: "mt_height",
    key: "mt_height",
    render: (_, record) => {
      return record.mt_height + " m";
    }
  },
  {
    title: "Ancho",
    dataIndex: "mt_width",
    key: "mt_width",
    render: (_, record) => {
      return record.mt_width + " m";
    }
  },
  {
    title: "Largo",
    dataIndex: "mt_length",
    key: "mt_length",
    render: (_, record) => {
      return record.mt_length + " m";
    }
  },
  {
    title: "Peso",
    dataIndex: "kg_weight",
    key: "kg_weight",
    render: (_, record) => {
      return record.kg_weight + " kg";
    }
  },
  {
    title: "",
    dataIndex: "alerts",
    key: "alerts",
    render: (_, record) =>
      dataCarga.length >= 1 ? (
        <Popconfirm
          title="Esta seguro de eliminar?"
          onConfirm={() => handleDeleteMaterial(record.id)}
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

export default createColumnsMaterials;
