import { Select, Typography } from "antd";
import useSWR from "swr";

import { fetcher } from "@/utils/api/api";
import { IClientTypes } from "@/types/clientTypes/clientTypes";

import "../commonInputStyles.scss";

interface Props {
  errors: any;
  field: any;
}
const { Option } = Select;
export const SelectClientTypes = ({ errors, field }: Props) => {
  const { data, isLoading } = useSWR<IClientTypes>("/client/types", fetcher, {});
  const options = data?.data;
  return (
    <Select
      placeholder="Seleccione Tipo de Documento"
      className={errors ? "selectInputRolesError" : "selectInputRoles"}
      loading={isLoading}
      variant="borderless"
      optionLabelProp="label"
      {...field}
    >
      {options?.map((value) => {
        return (
          <Option value={`${value.id}-${value.clientType}`} key={value.id}>
            {`${value.id}-${value.clientType}`}
          </Option>
        );
      })}
      {errors && (
        <Typography.Text className="textError">
          El tipo de documento es obligatorio *
        </Typography.Text>
      )}
    </Select>
  );
};
