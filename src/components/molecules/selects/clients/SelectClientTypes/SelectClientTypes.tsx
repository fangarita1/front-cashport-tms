import { Select, Typography } from "antd";

import { ControllerRenderProps, FieldError } from "react-hook-form";
import { ClientFormType } from "@/types/clients/IClients";

import "../commonInputStyles.scss";
import { useClientTypes } from "@/hooks/useClientTypes";

interface Props {
  errors: FieldError | undefined;
  field: ControllerRenderProps<ClientFormType, "infoClient.client_type">;
}
const { Option } = Select;
export const SelectClientTypes = ({ errors, field }: Props) => {
  const { data, loading } = useClientTypes();
  const options = data;
  return (
    <>
      <Select
        placeholder="Seleccione Tipo de Cliente"
        className={errors ? "selectInputError" : "selectInputCustom"}
        loading={loading}
        variant="borderless"
        optionLabelProp="label"
        {...field}
        popupClassName="selectDrop"
      >
        {options?.map((value) => {
          return (
            <Option
              className="selectOptions"
              value={`${value.id}-${value.clientType}`}
              key={value.id}
            >
              {`${value.id}-${value.clientType}`}
            </Option>
          );
        })}
      </Select>
      {errors && (
        <Typography.Text className="textError">El tipo de cliente es obligatorio *</Typography.Text>
      )}
    </>
  );
};
