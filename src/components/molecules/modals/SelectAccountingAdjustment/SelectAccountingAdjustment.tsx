import React, { Dispatch, SetStateAction } from "react";
import "./selectAccountingAdjustment.scss";
import { Flex } from "antd";
import { ISelectedAccountingAdjustment } from "../ModalActionDiscountCredit/ModalActionDiscountCredit";
import ItemsActionsModal from "@/components/atoms/ItemsModal/ItemsActionsModal";
import { Plus } from "phosphor-react";

interface Props {
  type: number;
  selectedRows: ISelectedAccountingAdjustment[];
  setSelectedRows: Dispatch<SetStateAction<ISelectedAccountingAdjustment[]>>;
  onClose: () => void;
  setCurrentView: Dispatch<SetStateAction<string>>;
}

export const SelectAccountingAdjustment = ({
  type,
  selectedRows,
  onClose,
  setCurrentView,
  setSelectedRows
}: Props) => {
  const mockData: ISelectedAccountingAdjustment[] = [
    { id: 1232, current_value: 1000, motive_name: "motive 1", percentage: 11, intialAmount: 10000 },
    {
      id: 211232,
      current_value: 100000,
      motive_name: "motive 2",
      percentage: 50,
      intialAmount: 100000
    },
    {
      id: 31132,
      current_value: 1000,
      motive_name: "motive 3",
      percentage: 81,
      intialAmount: 10000
    },
    {
      id: 41232,
      current_value: 100000,
      motive_name: "motive 4",
      percentage: 17,
      intialAmount: 100000
    },
    {
      id: 511232,
      current_value: 1000,
      motive_name: "motive 5",
      percentage: 10,
      intialAmount: 10000
    },
    {
      id: 61132,
      current_value: 100000,
      motive_name: "motive 6",
      percentage: 15,
      intialAmount: 100000
    },
    { id: 71132, current_value: 1000, motive_name: "motive 7", percentage: 5, intialAmount: 10000 },
    {
      id: 81232,
      current_value: 100000,
      motive_name: "motive 8",
      percentage: 25,
      intialAmount: 100000
    },
    {
      id: 911232,
      current_value: 1000,
      motive_name: "motive 9",
      percentage: 30,
      intialAmount: 10000
    },
    {
      id: 101132,
      current_value: 100000,
      motive_name: "motive 10",
      percentage: 20,
      intialAmount: 100000
    }
  ];
  const handleCheckClick = (item: ISelectedAccountingAdjustment) => {
    const isExist = selectedRows.some((row) => row.id === item.id);
    if (isExist) setSelectedRows((prevRows) => prevRows.filter((row) => row.id !== item.id));
    else setSelectedRows((prevRows) => [...prevRows, item]);
  };

  const dateSelect = mockData.map((item) => {
    return {
      ...item,
      selected: selectedRows.some((row) => row.id === item.id)
    };
  });

  return (
    <div className="modalContent">
      <p className="subTitleModalAction">{subtitleMap[type || 1]}</p>
      <div className="modalContentScroll">
        {dateSelect.map((item, index) => (
          <ItemsActionsModal
            key={index}
            item={item}
            type={type || 1}
            onHeaderClick={() => handleCheckClick(item)}
          />
        ))}
      </div>
      <button
        type="button"
        className="button__create__action"
        onClick={() => setCurrentView("create")}
      >
        <Plus /> Crear {typeMap[type || 1]}
      </button>
      <Flex gap="8px">
        <button
          type="button"
          className="button__action__text button__action__text__white"
          onClick={() => onClose()}
        >
          Cancelar
        </button>
        <button
          type="button"
          className={`button__action__text ${selectedRows.length > 0 ? "button__action__text__green" : ""}`}
          onClick={() => {
            selectedRows.length > 0 && setCurrentView("apply");
          }}
        >
          Continuar
        </button>
      </Flex>
    </div>
  );
};

const typeMap: Record<number, string> = {
  1: "débito",
  2: "crédito",
  3: "descuento"
};

const subtitleMap: Record<number, string> = {
  1: "Selecciona la(s) nota(s) débito a aplicar",
  2: "Selecciona la(s) nota(s) crédito a aplicar",
  3: "Selecciona los descuento a aplicar"
};
