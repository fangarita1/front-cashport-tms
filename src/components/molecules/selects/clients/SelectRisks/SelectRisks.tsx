import { Select, Typography } from "antd";
import useSWR from "swr";

import { fetcher } from "@/utils/api/api";
import { IRisks } from "@/types/risks/IRisks";

import "../commonInputStyles.scss";

interface Props {
  errors: any;
  field: any;
}
const { Option } = Select;
export const SelectRisks = ({ errors, field }: Props) => {
  const { data, isLoading } = useSWR<IRisks>("/risk", fetcher, {});
  const options = data?.data;
  return (
    <>
      <Select
        placeholder="Seleccione un riesgo"
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
              value={`${value.id}-${value.risk_name}`}
              key={value.id}
            >
              {`${value.id}-${value.risk_name}`}
            </Option>
          );
        })}
      </Select>
      {errors && (
        <Typography.Text className="textError">El riesgo es obligatorio *</Typography.Text>
      )}
    </>
  );
};
