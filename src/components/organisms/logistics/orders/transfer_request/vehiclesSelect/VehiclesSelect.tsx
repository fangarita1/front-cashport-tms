import React, { useEffect, useState } from "react";
import { Flex, Select, Typography } from "antd";
import { IVehiclesPricing } from "@/types/logistics/schema";
import { getTransferRequestVehicles } from "@/services/logistics/transfer-request";
import { Circle } from "@phosphor-icons/react";
import { formatMoney } from "@/utils/utils";

const { Text } = Typography;

interface VehiclesSelectProps {
  id_journey: number;
  setVehiclesSelected: React.Dispatch<React.SetStateAction<IVehiclesPricing[]>>;
  vehiclesSelected: IVehiclesPricing[];
  index: number;
}

const VehiclesSelect: React.FC<VehiclesSelectProps> = ({
  id_journey,
  setVehiclesSelected,
  vehiclesSelected,
  index,
}) => {
  const [optionsVehicles, setOptionsVehicles] = useState<any[]>([]);
  const [sugestedVehicles, setSugestedVehicles] = useState<IVehiclesPricing[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    const loadSuggestedVehicles = async () => {
      const res = await getTransferRequestVehicles(id_journey);
      const result: any = [];
      if (res.data.data.vehiclesPricing.length > 0) {
        res.data.data.vehiclesPricing.forEach((item: any) => {
          const strlabel = (
            <Flex align="center" gap={12}>
            <Circle size={24} />
            <div style={{ display: "flex", flexDirection: "column", width: "100%", gap: "4px" }}>
              <Flex justify="space-between">
                <Text>
                  <b>{item.description}</b>
                </Text>
                <div>{formatMoney(item.price)}</div>
              </Flex>
              <Text>
                Ocupación Volumen {item.m3_volume} - Peso {item.kg_capacity}
              </Text>
              <Text>Cantidad disponibles: {item.disponibility}</Text>
            </div>
          </Flex>
          );

          result.push({ value: item.description, label: strlabel });
        });
      }

      setSugestedVehicles(res.data.data.vehiclesPricing);
      setOptionsVehicles(result);
      setIsLoading(false);
    };

    loadSuggestedVehicles();
  }, [id_journey]);

  const addVehicle = (index: number, selectedOption: any) => {
    const vehicle = sugestedVehicles.find((v) => v.description === selectedOption.value);
    if (vehicle) {
      setVehiclesSelected((prevVehicles) => {
        const updatedVehicles = [...prevVehicles];
        updatedVehicles[index] = vehicle;
        return updatedVehicles;
      });
    }
  };

  return (
    <Select
      showSearch
      placeholder="Agregar vehículo"
      style={{ width: "28%", height: "45px" }}
      optionFilterProp="children"
      value={vehiclesSelected.find((v) => v.id === index)?.description || null}
      options={optionsVehicles.map((option) => ({
        value: option.value,
        key: option.value,
        label: option.label
      }))}
      onSelect={(value) => {
        const selectedVehicle = optionsVehicles.find(
          (option) => option.value === value
        );
        if (selectedVehicle) {
          addVehicle(index, selectedVehicle);
        }
      }}
      listHeight={510}
      dropdownStyle={{ width: "600px" }}
      loading={isLoading}
    />
  );
};

export default VehiclesSelect;