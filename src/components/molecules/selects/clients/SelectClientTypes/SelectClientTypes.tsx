import { Select, Typography } from "antd";

import { ControllerRenderProps, FieldError, UseFormSetValue } from "react-hook-form";
import { ClientFormType } from "@/types/clients/IClients";

import "../commonInputStyles.scss";
import { useClientTypes } from "@/hooks/useClientTypes";

interface Props {
  errors: FieldError | undefined;
  field: ControllerRenderProps<ClientFormType, "infoClient.client_type">;
  setValue: UseFormSetValue<ClientFormType>;
  watch: any;
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
        placeholder="Seleccione Tipo de Documento"
        className={errors ? "selectInputError" : "selectInputCustom"}
        loading={loading}
        variant="borderless"
        optionLabelProp="label"
        {...field}
        popupClassName="selectDrop"
        options={options}
      />

      {errors && (
        <Typography.Text className="textError">
          El tipo de documento es obligatorio *
        </Typography.Text>
      )}
    </>
  );
};
