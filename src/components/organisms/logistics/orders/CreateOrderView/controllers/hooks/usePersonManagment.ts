import { useState } from "react";
import { ITransferOrderPersons } from "@/types/logistics/schema";

export const usePersonManagement = () => {
  const [dataPersons, setDataPersons] = useState<ITransferOrderPersons[]>([]);

  const addPerson = (person: ITransferOrderPersons) => {
    setDataPersons((prevData) => {
      return [...prevData, person];
    });
  };

  const handleDeletePerson = (personId: number) => {
    setDataPersons((prevData) => prevData.filter((item) => item.id !== personId));
  };

  return { dataPersons, setDataPersons, addPerson, handleDeletePerson };
};
