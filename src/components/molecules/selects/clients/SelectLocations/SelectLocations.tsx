import { Select, Typography } from "antd";
import useSWR from "swr";
import { ControllerRenderProps, FieldError } from "react-hook-form";

import { fetcher } from "@/utils/api/api";
import { ILocation, ILocations } from "@/types/locations/ILocations";
import { ClientFormType } from "@/types/clients/IClients";

import "../commonInputStyles.scss";

interface Props {
  errors: FieldError | undefined;
  field: ControllerRenderProps<ClientFormType, "infoClient.locations">;
}
const { Option } = Select;
export const SelectLocations = ({ errors, field }: Props) => {
  const { data, isLoading } = useSWR<ILocations>("/location", fetcher, {});
  const options = data?.data;
  let cities: string[] | string = [];
  if (Array.isArray(field?.value)) {
    cities = field.value.map((location: ILocation) => location.city);
  }
  if (typeof field?.value === "string") {
    cities = field.value;
  }
  const locationField = { ...field, value: cities };

  return (
    <Select
      placeholder="Seleccione la ciudad"
      className={errors ? "selectInputError" : "selectInputCustom"}
      loading={isLoading}
      variant="borderless"
      optionLabelProp="label"
      {...locationField}
    >
      {options?.map((value) => {
        return (
          <Option value={`${value.id}-${value.city}`} key={value.id}>
            {`${value.id}-${value.city}`}
          </Option>
        );
      })}
      {errors && (
        <Typography.Text className="textError">La ciudad es obligatoria *</Typography.Text>
      )}
    </Select>
  );
};
