import { Select, Typography } from "antd";
import { ControllerRenderProps, FieldError } from "react-hook-form";

import { useHolding } from "@/hooks/useHolding";
import { ClientFormType } from "@/types/clients/IClients";

import "../commonInputStyles.scss";

interface Props {
  errors: FieldError | undefined;
  field: ControllerRenderProps<ClientFormType, "infoClient.holding_name">;
}
const { Option } = Select;
export const SelectHoldings = ({ errors, field }: Props) => {
  const { data, isLoading } = useHolding();
  const options = data?.data;

  return (
    <Select
      placeholder="Seleccione un Holding"
      className={errors ? "selectInputError" : "selectInputCustom"}
      loading={isLoading}
      variant="borderless"
      optionLabelProp="label"
      {...field}
      popupClassName="selectDrop"
    >
      {options?.map((value) => {
        return (
          <Option className="selectOptions" value={`${value.id}-${value.name}`} key={value.id}>
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
