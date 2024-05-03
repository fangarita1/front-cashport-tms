import { Select, Typography } from "antd";
import useSWR from "swr";

import { fetcher } from "@/utils/api/api";
import { IClientTypes } from "@/types/clientTypes/clientTypes";
import { ControllerRenderProps, FieldError } from "react-hook-form";
import { ClientFormType } from "@/types/clients/IClients";

import "../commonInputStyles.scss";

interface Props {
  errors: FieldError | undefined;
  field: ControllerRenderProps<ClientFormType, "infoClient.client_type">;
}
const { Option } = Select;
export const SelectClientTypes = ({ errors, field }: Props) => {
  const { data, isLoading } = useSWR<IClientTypes>("/client/types", fetcher, {});
  const options = data?.data;
  return (
    <>
      <Select
        placeholder="Seleccione Tipo de Documento"
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
              value={`${value.id}-${value.clientType}`}
              key={value.id}
            >
              {`${value.id}-${value.clientType}`}
            </Option>
          );
        })}
      </Select>
      {errors && (
        <Typography.Text className="textError">
          El tipo de documento es obligatorio *
        </Typography.Text>
      )}
    </>
  );
};
