import { Select, Typography } from "antd";
import useSWR from "swr";

import { fetcher } from "@/utils/api/api";
import { IRadicationTypes } from "@/types/radicationTypes/IRadicationTypes";
import {
  FieldError as OriginalFieldError,
  ControllerRenderProps,
  FieldErrorsImpl,
  Merge,
  FieldValues
} from "react-hook-form";

import "../commonInputStyles.scss";

type ExtendedFieldError =
  | OriginalFieldError
  | Merge<OriginalFieldError, FieldErrorsImpl<{ value: number; label: string }>>;

interface Props<T extends FieldValues> {
  errors: ExtendedFieldError | undefined;
  field: ControllerRenderProps<T, any>;
}

export const SelectRadicationTypes = <T extends FieldValues>({ errors, field }: Props<T>) => {
  const { data, isLoading } = useSWR<IRadicationTypes>("/client/radication-types", fetcher, {});
  const options = data?.data.map((option) => {
    return {
      value: option.id,
      label: option.radication_name,
      className: "selectOptions"
    };
  });

  return (
    <>
      <Select
        placeholder="Seleccione el tipo de radicado"
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
        <Typography.Text className="textError">
          El tipo de radicado es obligatorio *
        </Typography.Text>
      )}
    </>
  );
};
