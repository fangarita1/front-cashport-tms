import { Select, Typography } from "antd";
import useSWR from "swr";

import { fetcher } from "@/utils/api/api";
import { IPaymentConditions } from "@/types/paymentConditions/IPaymentConditions";
import { ControllerRenderProps, FieldError } from "react-hook-form";
import { ClientFormType } from "@/types/clients/IClients";

import "../commonInputStyles.scss";

interface Props {
  errors: FieldError | undefined;
  field: ControllerRenderProps<ClientFormType, "infoClient.condition_payment">;
}
const { Option } = Select;
export const SelectPaymentConditions = ({ errors, field }: Props) => {
  const { data, isLoading } = useSWR<IPaymentConditions>("/client/condition-payments", fetcher, {});
  const options = data?.data;

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
      >
        {options?.map((value) => {
          return (
            <Option
              className="selectOptions"
              value={`${value.id} - A ${value.condition_day} días`}
              key={value.id}
            >
              {`${value.id} - A ${value.condition_day} días`}
            </Option>
          );
        })}
      </Select>
      {errors && (
        <Typography.Text className="textError">
          La condición de pago es obligatoria *
        </Typography.Text>
      )}
    </>
  );
};
