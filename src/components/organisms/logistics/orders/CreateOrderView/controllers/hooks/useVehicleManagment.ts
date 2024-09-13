import { useState } from "react";
import { IVehicleType } from "@/types/logistics/schema";

export const useVehicleManagement = () => {
  const [dataVehicles, setDataVehicles] = useState<IVehicleType[]>([]);

  const addVehicle = (vehicle: IVehicleType) => {
    setDataVehicles((prevData) => {
      const itemExists = prevData.some((item) => item.id === vehicle.id);
      if (itemExists) {
        return prevData.map((item) =>
          item.id === vehicle.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevData, { ...vehicle, quantity: 1 }];
      }
    });
  };

  const handleDeleteVehicle = (vehicleId: number) => {
    setDataVehicles((prevData) => prevData.filter((item) => item.id !== vehicleId));
  };

  const handleQuantityVehicle = (vehicleId: number, sign: string) => {
    setDataVehicles((prevData) =>
      prevData.map((item) => {
        if (item.id === vehicleId) {
          if (sign === "+") {
            return { ...item, quantity: item.quantity + 1 };
          }
          if (sign === "-") {
            if (item.quantity === 1) return item;
            return { ...item, quantity: item.quantity - 1 };
          }
        }
        return item;
      })
    );
  };

  return { dataVehicles, setDataVehicles, addVehicle, handleDeleteVehicle, handleQuantityVehicle };
};
