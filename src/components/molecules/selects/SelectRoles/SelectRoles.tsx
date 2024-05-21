import { Select, Typography } from "antd";
import useSWR from "swr";

import { fetcher } from "@/utils/api/api";
import { IRoles } from "@/types/roles/IRoles";

import "./selectroles.scss";
import { FieldError } from "react-hook-form";

interface Props {
  errors: FieldError | undefined;
  field: any;
}
const { Option } = Select;
export const SelectRoles = ({ errors, field }: Props) => {
  const { data, isLoading } = useSWR<IRoles>("/role", fetcher, {});
  // doesn't show super admin role
  const options = data?.data.filter((rol) => rol.ID !== 1);
  return (
    <>
      <Select
        placeholder="Seleccione un rol"
        className={errors ? "selectInputRolesError" : "selectInputRoles"}
        loading={isLoading}
        variant="borderless"
        optionLabelProp="label"
        popupClassName="selectDrop"
        {...field}
      >
        {options?.map((value) => {
          return (
            <Option
              className="selectOptions"
              value={`${value.ID}-${value.ROL_NAME}`}
              key={value.ID}
            >
              {`${value.ID}-${value.ROL_NAME}`}
            </Option>
          );
        })}
      </Select>
      {errors && <Typography.Text className="textError">Rol es obligatorio *</Typography.Text>}
    </>
  );
};
