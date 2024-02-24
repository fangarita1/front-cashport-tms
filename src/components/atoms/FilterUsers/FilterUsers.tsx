import { Dispatch, SetStateAction, useState } from "react";
import { Cascader } from "antd";

import { getAllRoles } from "@/services/roles/roles";
import { getAllZones } from "@/services/zone/zones";

interface Option {
  value: string;
  label: string;
  disableCheckbox?: boolean;
  isLeaf?: boolean;
  children?: Option[];
}

const options: Option[] = [
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
  }
];
interface Props {
  idProject: string;
  setSelectedUsers: Dispatch<SetStateAction<{ zones: any[]; roles: any[] }>>;
}
export const FilterUsers = ({ idProject, setSelectedUsers }: Props) => {
  // const [countries, setCountries] = useState<any>([]);
  const [zones, setZones] = useState<any>([]);
  const [roles, setRoles] = useState<any>([]);

  const [optionsList, setOptionsList] = useState(options);
  const [selectOptions, setSelectOptions] = useState([]);
  console.log(selectOptions);

  const onBlur = () => {
    if (selectOptions.length === 0)
      return setSelectedUsers({
        zones: [],
        roles: []
      });
    const rolesFilters =
      selectOptions?.filter((item) => item[0] === "Roles").map((item) => item[1]) ?? 0;
    const zonesFilters =
      selectOptions?.filter((item) => item[0] === "Zona").map((item) => item[1]) ?? 0;

    setSelectedUsers({
      zones: zonesFilters,
      roles: rolesFilters
    });
  };
  const onChange = (value: any) => {
    console.log(value);

    const data = value;
    setSelectOptions(data);
  };

  const loadData = async (selectedOptions: any) => {
    const targetOption = selectedOptions[selectedOptions.length - 1];

    if (targetOption.value === "Roles" && roles.length === 0) {
      const { data } = await getAllRoles();
      const countriesToShow = data.data.map((role) => ({
        label: `${role.ROL_NAME}`,
        value: `${role.ID}`
      }));
      targetOption.children = countriesToShow;
      setOptionsList([...options]);
      setRoles(countriesToShow);
    }
    if (targetOption.value === "Zona" && zones.length === 0) {
      const { data } = await getAllZones({ idProject });

      const zonesToShow = data.data.map((zone) => ({
        label: `${zone.ZONE_DESCRIPTION}`,
        value: `${zone.ID}`
      }));
      targetOption.children = zonesToShow;
      setOptionsList([...options]);
      setZones(zonesToShow);
    }
  };

  return (
    <Cascader
      style={{ width: "22rem" }}
      multiple
      size="large"
      removeIcon
      maxTagCount={2}
      placeholder="Filtros"
      placement="bottomRight"
      onClear={() => setSelectedUsers({ zones: [], roles: [] })}
      options={optionsList}
      changeOnSelect
      loadData={loadData}
      value={selectOptions}
      onChange={onChange}
      onBlur={onBlur}
    />
  );
};
