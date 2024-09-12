import { ITransferOrderPersons } from "@/types/logistics/schema";
import { TableProps, Popconfirm } from "antd";
import { Trash } from "phosphor-react";

const createColumnsPersons = (
  dataPersons: ITransferOrderPersons[],
  handleDeletePerson: (personId: number) => void
): TableProps<ITransferOrderPersons>["columns"] => [
  {
    title: "Nombre",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "Teléfono",
    dataIndex: "contact_number",
    key: "contact_number"
  },
  {
    title: "PSL",
    dataIndex: "psl_desc",
    key: "psl_desc"
  },
  {
    title: "CC",
    dataIndex: "cost_center_desc",
    key: "cost_center_desc"
  },
  {
    title: "",
    dataIndex: "alerts",
    key: "alerts",
    render: (_, record) =>
      dataPersons.length >= 1 ? (
        <Popconfirm
          title="Esta seguro de eliminar?"
          onConfirm={() => handleDeletePerson(record.id)}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: 32,
              width: 32,
              cursor: "pointer"
            }}
          >
            <Trash size={24} />
          </div>
        </Popconfirm>
      ) : null
  }
];

export default createColumnsPersons;
