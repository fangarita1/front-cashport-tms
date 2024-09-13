import { useState } from "react";
import { IMaterial } from "@/types/logistics/schema";

export const useMaterialManagement = () => {
  const [dataCarga, setDataCarga] = useState<IMaterial[]>([]);

  const addMaterial = (material: IMaterial) => {
    setDataCarga((prevData) => {
      const itemExists = prevData.some((item) => item.id === material.id);
      if (itemExists) {
        return prevData.map((item) =>
          item.id === material.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevData, { ...material, quantity: 1 }];
      }
    });
  };

  const handleDeleteMaterial = (materialId: number) => {
    setDataCarga((prevData) => prevData.filter((item) => item.id !== materialId));
  };

  const handleQuantityMaterial = (materialId: number, sign: string) => {
    setDataCarga((prevData) =>
      prevData.map((item) => {
        if (item.id === materialId) {
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

  return { dataCarga, addMaterial, handleDeleteMaterial, handleQuantityMaterial };
};
