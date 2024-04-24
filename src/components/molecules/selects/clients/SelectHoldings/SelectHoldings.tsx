import { Select, Typography } from "antd";

import { useHolding } from "@/hooks/useHolding";

import "../commonInputStyles.scss";

interface Props {
  errors: any;
  field: any;
}
const { Option } = Select;
export const SelectHoldings = ({ errors, field }: Props) => {
  const { data, isLoading } = useHolding();
  const options = data?.data;

  return (
    <Select
      placeholder="Seleccione un Holding"
      className={errors ? "selectInputRolesError" : "selectInputRoles"}
      loading={isLoading}
      variant="borderless"
      optionLabelProp="label"
      {...field}
    >
      {options?.map((value) => {
        return (
          <Option value={`${value.id}-${value.name}`} key={value.id}>
            {`${value.id}-${value.name}`}
          </Option>
        );
      })}
      {errors && (
        <Typography.Text className="textError">El holding es obligatorio *</Typography.Text>
      )}
    </Select>
  );
};
