import { Flex, Select, Typography } from "antd";
import {
  ControllerRenderProps,
  FieldErrorsImpl,
  FieldValues,
  Merge,
  FieldError as OriginalFieldError
} from "react-hook-form";

import "../commonInputStyles.scss";
import { useLocations } from "@/hooks/useLocations";
import axios from "axios";

type ExtendedFieldError =
  | OriginalFieldError
  | Merge<OriginalFieldError, FieldErrorsImpl<{ value: number; label: string }>>;

interface Props<T extends FieldValues> {
  errors: ExtendedFieldError | undefined;
  field: ControllerRenderProps<T, any>;
}

export const SelectLocations = <T extends FieldValues>({ errors, field }: Props<T>) => {
  const { data, isLoading, error } = useLocations();
  // console.log({ data, error });
  if (axios.isAxiosError(data)) {
    return null
  }
    const options = data?.map((location) => {
      return {
        value: location.id,
        label: location.city,
        className: "selectOptions"
      };
    });

  return (
    <Flex vertical>
      <h4 className="inputTitle">Ciudad</h4>
      <Select
        placeholder="Seleccione la ciudad"
        className={errors ? "selectInputError" : "selectInputCustom"}
        loading={isLoading}
        variant="borderless"
        optionLabelProp="label"
        {...field}
        popupClassName="selectDrop"
        options={options}
        labelInValue
      />
      {errors && (
        <Typography.Text className="textError">La ciudad es obligatoria *</Typography.Text>
      )}
    </Flex>
  );
};
