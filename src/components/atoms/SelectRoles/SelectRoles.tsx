import { Select } from "antd";
import useSWR from "swr";

import { fetcher } from "@/utils/api/api";
import { IRoles } from "@/types/roles/IRoles";

import "./selectroles.scss";

interface Props {
  errors: any;
  field: any;
}
const { Option } = Select;
export const SelectRoles = ({ errors, field }: Props) => {
  const { data, isLoading } = useSWR<IRoles>("/rol", fetcher, {});
  const options = data?.data;

  return (
    <Select
      mode="multiple"
      placeholder="Selecciona los roles"
      className={errors?.general?.countries ? "selectInputRolesError" : "selectInputRoles"}
      loading={isLoading}
      variant="borderless"
      optionLabelProp="label"
      {...field}
    >
      {options?.map((value, index) => {
        return (
          <Option value={`${value.ID}-${value.ROL_NAME}`} key={index}>
            {`${value.ID}-${value.ROL_NAME}`}
          </Option>
        );
      })}
    </Select>
  );
};
