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
      // onClear={() => setSelectedUsers(initValueFiltersData)}
      // changeOnSelect
      // loadData={loadData}
      // value={selectOptions}
      // onChange={onChange}
      // onBlur={onBlur}
    />
  );
};
const options: Option[] = [
  {
    value: "status",
    label: "Estado de Usuario",
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
    label: "Zona",
    isLeaf: false,
    disableCheckbox: true
  },
  {
    value: "Roles",
    label: "Roles",
    isLeaf: false,
    disableCheckbox: true
  },
  {
    value: "channel",
    label: "Canales",
    isLeaf: false,
    disableCheckbox: true
  },
  {
    value: "line",
    label: "Lineas",
    isLeaf: false,
    disableCheckbox: true
  },
  {
    value: "subline",
    label: "Sublineas",
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
