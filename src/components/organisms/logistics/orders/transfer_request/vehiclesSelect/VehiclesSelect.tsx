import { Select } from "antd";

interface VehiclesSelectProps {
  id_journey: number;
  vehiclesSelected: string | undefined;
  optionsVehicles: {
    value: any;
    label: any;
    key: number;
    searchParam: string;
    disabled: boolean;
  }[];
  isLoadingVehicles: boolean;
  // eslint-disable-next-line no-unused-vars
  selectVehicle: (key: number) => void;
}

const VehiclesSelect: React.FC<VehiclesSelectProps> = ({
  vehiclesSelected,
  optionsVehicles,
  isLoadingVehicles,
  selectVehicle
}) => {
  return (
    <Select
      showSearch
      placeholder="Agregar vehículo"
      style={{ width: "28%", height: "45px" }}
      optionFilterProp="searchParam"
      value={vehiclesSelected ? vehiclesSelected + " " : undefined}
      virtual={false}
      options={optionsVehicles.map((option) => ({
        value: option.value,
        key: option.key,
        label: option.label,
        searchParam: option.searchParam,
        disabled: option.disabled
      }))}
      onSelect={(_, { key }) => selectVehicle(key)}
      listHeight={510}
      dropdownStyle={{ width: "600px" }}
      loading={isLoadingVehicles}
    >
      {optionsVehicles.map((option) => (
        <Select.Option key={option.value} value={option.value}>
          {option.label}
        </Select.Option>
      ))}
    </Select>
  );
};

export default VehiclesSelect;
