import { Dispatch, SetStateAction, useState } from "react";
import { Modal, Typography } from "antd";

import "./modalbusinessrules.scss";
import { SelectStructure } from "../../selects/SelectStructure/SelectStructure";
import { ISelectedBussinessRules } from "@/types/bre/IBRE";
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
  const [selectedBusinessRules, setSelectedBusinessRules] = useState<ISelectedBussinessRules>(
    initDatSelectedBusinessRules
  );

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
        selectedBusinessRules={selectedBusinessRules}
        setSelectedBusinessRules={setSelectedBusinessRules}
      />
    </Modal>
  );
};

const initDatSelectedBusinessRules: ISelectedBussinessRules = {
  channels: [],
  lines: [],
  sublines: []
};
