import { Select, Typography } from "antd";
import useSWR from "swr";

import { fetcher } from "@/utils/api/api";
import { IRoles } from "@/types/roles/IRoles";

import "./selectroles.scss";

interface Props {
  errors: any;
  field: any;
}

export const SelectRoles = ({ errors, field }: Props) => {
  const { data, isLoading } = useSWR<IRoles>("/role", fetcher, {});
  // doesn't show super admin role
  console.log("DATA ROLES: ", data);
  const filteredOptions = data?.data.filter((rol) => rol.ID !== 1);
  const options = filteredOptions?.map((option) => {
    return {
      value: option.ID,
      label: option.ROL_NAME,
      className: "selectOptions"
    };
  });

  return (
    <>
      <Select
        placeholder="Selecciona los roles"
        className={errors ? "selectInputRolesError" : "selectInputRoles"}
        loading={isLoading}
        variant="borderless"
        optionLabelProp="label"
        {...field}
        options={options}
        labelInValue
      />
      {errors && <Typography.Text className="textError">Rol es obligatorio *</Typography.Text>}
    </>
  );
};
