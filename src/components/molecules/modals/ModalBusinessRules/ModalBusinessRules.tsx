import { Dispatch, SetStateAction, useState } from "react";
import { Modal, Typography } from "antd";

import "./modalbusinessrules.scss";
import { SelectStructure } from "../../selects/SelectStructure/SelectStructure";
const { Title } = Typography;
interface Props {
  isOpen: boolean;
  setIsBR: Dispatch<SetStateAction<boolean>>;
}
export type ShipToType = {
  info: {
    name: string;
    cargo: string;
    email: string;
    phone: string;
    rol: string;
  };
};

export const ModalBusinessRules = ({ isOpen, setIsBR }: Props) => {
  const [selectedSublines, setSelectedSublines] = useState<
    { idChannel: number; idLine: number; subline: { id: number; description: string } }[]
  >([]);

  return (
    <Modal
      width={"40%"}
      open={isOpen}
      title={<Title level={4}>Reglas de negocio</Title>}
      className="modalbusinessrules"
      okButtonProps={{
        className: "buttonOk"
      }}
      cancelButtonProps={{
        className: "buttonCancel"
      }}
      okText="Siguiente"
      cancelText="Cancelar"
      onCancel={() => setIsBR(false)}
    >
      <SelectStructure
        selectedSublines={selectedSublines}
        setSelectedSublines={setSelectedSublines}
        sublinesUser={[] as any}
      />
    </Modal>
  );
};
