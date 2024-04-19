import { Cascader } from "antd";

export const FilterClients = () => {
  return (
    <Cascader
      style={{ width: "15rem" }}
      multiple
      size="large"
      removeIcon
      maxTagCount={1}
      placeholder="Filtrar"
      placement="bottomRight"
      options={options}
    />
  );
};
const options: Option[] = [
  {
    value: "status",
    label: "Ciudad",
    isLeaf: false,
    disableCheckbox: true,
    children: [
      {
        value: "statusActive",
        label: "Activo"
      },
      {
        value: "statusInactive",
        label: "Inactivo"
      }
    ]
  },
  {
    value: "Zona",
    label: "Holding",
    isLeaf: false,
    disableCheckbox: true
  },
  {
    value: "Roles",
    label: "Riesgo",
    isLeaf: false,
    disableCheckbox: true
  },
  {
    value: "channel",
    label: "Condición de pago",
    isLeaf: false,
    disableCheckbox: true
  },
  {
    value: "line",
    label: "Tipo de radicación",
    isLeaf: false,
    disableCheckbox: true
  },
  {
    value: "subline",
    label: "Estado de cliente",
    isLeaf: false,
    disableCheckbox: true
  }
];

interface Option {
  value: string;
  label: string;
  disableCheckbox?: boolean;
  isLeaf?: boolean;
  children?: Option[];
}
