import { Select, Typography } from "antd";

import "./SelectVehicleType.scss";

interface Props {
  errors: any;
  field: any;
  selected?: any;
}

export const vehicleTypes = {
  data: [
    {
      id: 1,
      value: "test"
    },
    {
      id: 2,
      value: "CAMIONETA 4X4"
    },
    {
      id: 3,
      value: "CAMPERO"
    },
    {
      id: 4,
      value: "VAN 9 PASAJEROS"
    },
    {
      id: 5,
      value: "MICROBUS 12 PASAJEROS"
    },
    {
      id: 6,
      value: "MICROBUS 13 PASAJEROS"
    },
    {
      id: 7,
      value: "MICROBUS 16 PASAJEROS"
    },
    {
      id: 8,
      value: "MICROBUS 19 PASAJEROS"
    }
  ]
};
export const SelectVehicleType = ({ errors, field, selected }: Props) => {
  const options = vehicleTypes?.data.map((option) => {
    return {
      value: option.id,
      label: option.value
    };
  });

  return (
    <>
      <Select
        placeholder="Selecciona Tipo de Vehiculo"
        className={
          errors?.general?.currencies ? "selectInputCurrenciesError" : "selectInputCurrencies"
        }
        variant="borderless"
        optionLabelProp="label"
        {...field}
        options={options}
      />
      {errors?.general?.rh && (
        <Typography.Text className="textError">Campo es obligatorio *</Typography.Text>
      )}
    </>
  );
};
