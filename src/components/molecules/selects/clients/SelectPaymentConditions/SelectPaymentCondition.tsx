import { Select, Typography } from "antd";
import useSWR from "swr";

import { fetcher } from "@/utils/api/api";
import { IPaymentConditions } from "@/types/paymentConditions/IPaymentConditions";
import {
  ControllerRenderProps,
  FieldErrorsImpl,
  FieldValues,
  Merge,
  FieldError as OriginalFieldError
} from "react-hook-form";

import "../commonInputStyles.scss";

type ExtendedFieldError =
  | OriginalFieldError
  | Merge<OriginalFieldError, FieldErrorsImpl<{ value: number; label: string }>>;

interface Props<T extends FieldValues> {
  errors: ExtendedFieldError | undefined;
  field: ControllerRenderProps<T, any>;
}

export const SelectPaymentConditions = <T extends FieldValues>({ errors, field }: Props<T>) => {
  const { data, isLoading } = useSWR<IPaymentConditions>("/client/condition-payments", fetcher, {});
  const options = data?.data.map((option) => {
    return {
      value: option.id,
      label: `A ${option.condition_day} días`,
      className: "selectOptions"
    };
  });

  return (
    <>
      <Select
        placeholder="A 30 días"
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
          La condición de pago es obligatoria *
        </Typography.Text>
      )}
    </>
  );
};
