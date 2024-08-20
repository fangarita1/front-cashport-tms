import { Select, Typography } from "antd";

import {
  ControllerRenderProps,
  FieldErrorsImpl,
  Merge,
  FieldError as OriginalFieldError
} from "react-hook-form";
import { ClientFormType } from "@/types/clients/IClients";

import "../commonInputStyles.scss";
import { useClientTypes } from "@/hooks/useClientTypes";

type ExtendedFieldError =
  | OriginalFieldError
  | Merge<OriginalFieldError, FieldErrorsImpl<{ value: number; label: string }>>;

interface Props {
  errors: ExtendedFieldError | undefined;
  field: ControllerRenderProps<ClientFormType, "infoClient.client_type">;
}

export const SelectClientTypes = ({ errors, field }: Props) => {
  const { data, loading } = useClientTypes();
  const options = data?.map((option) => {
    return {
      value: option.id,
      label: option.clientType,
      className: "selectOptions"
    };
  });

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
        options={options}
        labelInValue
      />

      {errors && (
        <Typography.Text className="textError">El tipo de cliente es obligatorio *</Typography.Text>
      )}
    </>
  );
};
