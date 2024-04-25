import { Select, Typography } from "antd";
import useSWR from "swr";

import { fetcher } from "@/utils/api/api";
import { IPaymentConditions } from "@/types/paymentConditions/IPaymentConditions";

import "../commonInputStyles.scss";

interface Props {
  errors: any;
  field: any;
}
const { Option } = Select;
export const SelectPaymentConditions = ({ errors, field }: Props) => {
  const { data, isLoading } = useSWR<IPaymentConditions>("/client/condition-payments", fetcher, {});
  const options = data?.data;

  if (!field.value) {
    const HARDCODED_VALUE = 1;
    field.value = HARDCODED_VALUE;
  }

  return (
    <Select
      placeholder="Condicion de pago"
      className={errors ? "selectInputRolesError" : "selectInputRoles"}
      loading={isLoading}
      variant="borderless"
      optionLabelProp="label"
      {...field}
    >
      {options?.map((value) => {
        return (
          <Option value={`${value.id} - ${value.condition_day}`} key={value.id}>
            {`${value.id} - ${value.condition_day}`}
          </Option>
        );
      })}
      {errors && (
        <Typography.Text className="textError">
          La condición de pago es obligatoria *
        </Typography.Text>
      )}
    </Select>
  );
};
