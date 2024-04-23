import { Select, Typography } from "antd";
import useSWR from "swr";

import { fetcher } from "@/utils/api/api";
import { IRadicationTypes } from "@/types/radicationTypes/IRadicationTypes";

import "../commonInputStyles.scss";

interface Props {
  errors: any;
  field: any;
}
const { Option } = Select;
export const SelectRadicationTypes = ({ errors, field }: Props) => {
  const { data, isLoading } = useSWR<IRadicationTypes>("/client/radication-types", fetcher, {});
  const options = data?.data;
  return (
    <Select
      placeholder="Seleccione el tipo de radicado"
      className={errors ? "selectInputRolesError" : "selectInputRoles"}
      loading={isLoading}
      variant="borderless"
      optionLabelProp="label"
      {...field}
    >
      {options?.map((value) => {
        return (
          <Option value={`${value.id}-${value.radication_name}`} key={value.id}>
            {`${value.id}-${value.radication_name}`}
          </Option>
        );
      })}
      {errors && (
        <Typography.Text className="textError">
          El tipo de radicado es obligatorio *
        </Typography.Text>
      )}
    </Select>
  );
};
