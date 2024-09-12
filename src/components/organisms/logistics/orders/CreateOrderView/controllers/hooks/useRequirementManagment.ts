import { useState } from "react";
import { ITransferOrderOtherRequirements } from "@/types/logistics/schema";

export const useRequirementManagement = () => {
  const [dataRequirements, setDataRequirements] = useState<ITransferOrderOtherRequirements[]>([]);

  const addRequirement = (material: ITransferOrderOtherRequirements) => {
    setDataRequirements((prevData) => {
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

  const handleDeleteRequirement = (requirementId: number) => {
    setDataRequirements((prevData) => prevData.filter((item) => item.id !== requirementId));
  };

  const handleQuantityRequirement = (requirementId: number, sign: string) => {
    setDataRequirements((prevData) =>
      prevData.map((item) => {
        if (item.id === requirementId) {
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

  return {
    dataRequirements,
    setDataRequirements,
    addRequirement,
    handleDeleteRequirement,
    handleQuantityRequirement
  };
};
