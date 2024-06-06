import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "antd";

import "./modalbusinessrules.scss";
import { SelectStructure } from "../../selects/SelectStructure/SelectStructure";
import { ISelectedBussinessRules } from "@/types/bre/IBRE";
import { CaretLeft } from "phosphor-react";
interface Props {
  setCurrentView: Dispatch<SetStateAction<"address" | "main" | "businessRules">>;
}

export const ModalBusinessRules = ({ setCurrentView }: Props) => {
  const [selectedBusinessRules, setSelectedBusinessRules] = useState<ISelectedBussinessRules>(
    initDatSelectedBusinessRules
  );

  return (
    <div className="modalBusinessRules">
      <Button
        className="modalTitle"
        icon={<CaretLeft size={"1.45rem"} />}
        onClick={() => setCurrentView("main")}
      >
        Reglas de negocio
      </Button>
      <SelectStructure
        selectedBusinessRules={selectedBusinessRules}
        setSelectedBusinessRules={setSelectedBusinessRules}
        disabled={false}
      />
    </div>
  );
};

const initDatSelectedBusinessRules: ISelectedBussinessRules = {
  channels: [],
  lines: [],
  sublines: []
};
