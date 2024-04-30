import { Flex, Select, Typography } from "antd";
import { Dispatch, SetStateAction } from "react";

import "../commonInputStyles.scss";
import { IBillingPeriodForm } from "@/types/billingPeriod/IBillingPeriod";

interface Props {
  titleSelect?: string;
  placeHolder?: string;
  errors: any;
  field?: any;
  options: any[];
  orderRadioValue: IBillingPeriodForm;
  setValueSelected: Dispatch<SetStateAction<IBillingPeriodForm>>;
}
const { Option } = Select;
export const SelectBillingPeriodDay = ({
  titleSelect = "",
  placeHolder = "",
  errors,
  options = [],
  orderRadioValue,
  setValueSelected
}: Props) => {
  const onChangeSelect = (value: string) => {
    setValueSelected({ ...orderRadioValue, day_of_week: value });
  };
  return (
    <Flex vertical style={{ width: "100%" }}>
      {titleSelect.length > 0 && <Typography.Title level={5}>{titleSelect}</Typography.Title>}
      <Select
        placeholder={titleSelect.length > 0 ? titleSelect : placeHolder}
        className={errors ? "selectInputError" : "selectInputCustom"}
        variant="borderless"
        optionLabelProp="label"
        onChange={onChangeSelect}
      >
        {options?.map((value) => {
          return (
            <Option value={value} key={value}>
              {value}
            </Option>
          );
        })}
        {errors && <Typography.Text className="textError">El día es obligatorio *</Typography.Text>}
      </Select>
    </Flex>
  );
};
