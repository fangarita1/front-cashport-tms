import { useState } from "react";
import { Flex, Modal, Typography } from "antd";
import ItemsActionsModal from "@/components/atoms/ItemsModal/ItemsActionsModal";

import "./modalActionDiscountCredit.scss";
import { Plus } from "phosphor-react";
import { InputDate } from "@/components/atoms/InputDate/InputDate";
const { Title } = Typography;

interface Props {
  isOpen: boolean;
  onClose: () => void;
  showActionDetailModal: {
    isOpen: boolean;
    invoiceId: number;
  };
}

interface ISelectedRows {
  id: number;
  amount: number;
}

export const ModalActionDiscountCredit = ({ isOpen, onClose, showActionDetailModal }: Props) => {
  const [selectedRows, setSelectedRows] = useState<ISelectedRows[]>([]);

  const handleHeaderClick = (item: ISelectedRows) => {
    const isExist = selectedRows.some((row) => row.id === item.id);
    if (isExist) setSelectedRows((prevRows) => prevRows.filter((row) => row.id !== item.id));
    else setSelectedRows((prevRows) => [...prevRows, item]);
  };

  const mockData = [
    { id: 1, amount: 100000 },
    { id: 2, amount: 100000 },
    { id: 3, amount: 100000 },
    { id: 4, amount: 100000 },
    { id: 5, amount: 100000 },
    { id: 6, amount: 100000 }
  ];
  return (
    <Modal
      className="modalCustom"
      width={"40%"}
      open={isOpen}
      title={<Title level={4}>{titleMap[showActionDetailModal?.invoiceId || 1]}</Title>}
      footer={null}
      onCancel={onClose}
    >
      <div className="modalContent">
        <p className="subTitleModalAction">{subtitleMap[showActionDetailModal?.invoiceId || 1]}</p>
        <div className="modalContentScroll">
          {mockData.map((item, index) => (
            <ItemsActionsModal
              key={index}
              item={item}
              type={showActionDetailModal?.invoiceId || 1}
              onHeaderClick={() => handleHeaderClick(item)}
            />
          ))}
        </div>
        <button type="button" className="button__create__action">
          <Plus /> Crear {typeMap[showActionDetailModal?.invoiceId || 1]}
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
              console.log(selectedRows);
            }}
          >
            Continuar
          </button>
        </Flex>
      </div>
      <InputDate />
    </Modal>
  );
};

const subtitleMap: Record<number, string> = {
  1: "Selecciona la(s) nota(s) crédito a aplicar",
  2: "Selecciona los descuento a aplicar",
  3: "Selecciona la(s) nota(s) débito a aplicar"
};
const titleMap: Record<number, string> = {
  1: "Aplicar nota crédito",
  2: "Aplicar descuento",
  3: "Aplicar nota débito"
};

const typeMap: Record<number, string> = {
  1: "crédito",
  2: "descuento",
  3: "débito"
};
