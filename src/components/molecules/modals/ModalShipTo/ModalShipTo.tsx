import { Dispatch, SetStateAction, useState } from "react";
import { Button, Modal } from "antd";

import { ModalAddress } from "../ModalAddress/ModalAddress";

import { ModalBillingPeriod } from "../ModalBillingPeriod/ModalBillingPeriod";
import { IBillingPeriodForm } from "@/types/billingPeriod/IBillingPeriod";

import { ModalBusinessRules } from "../ModalBusinessRules/ModalBusinessRules";
import { ISelectedBussinessRules } from "@/types/bre/IBRE";
import { createShipTo } from "@/services/shipTo/shipTo";
import { ShipToFormType } from "@/types/shipTo/IShipTo";

import "./modalShipTo.scss";
import { ModalCreateShipTo } from "./ModalCreateShipTo/ModalCreateShipTo";

interface Props {
  isOpen: boolean;
  setIsShipToModalOpen: Dispatch<SetStateAction<boolean>>;
  clientId: number;
  projectId: number;
}

export const ModalShipTo = ({ isOpen, setIsShipToModalOpen, clientId, projectId }: Props) => {
  const [currentView, setCurrentView] = useState<"main" | "businessRules" | "address">("main");
  const [selectedShipToData, setSelectedShipToData] = useState<ShipToFormType | undefined>();
  const [isBillingPeriodOpen, setIsBillingPeriodOpen] = useState(false);
  const [billingPeriod, setBillingPeriod] = useState<IBillingPeriodForm | undefined>();
  const [zones, setZones] = useState([] as number[]);
  const [selectedStructure, setSelectedStructure] = useState<ISelectedBussinessRules>(
    initDatSelectedBusinessRules
  );

  const handleCreateShipTo = () => {
    // console.log("BillingPeriod: ", billingPeriod);
    // Aca iria la creacion del ShipTo POST
    // Falta saber como se envia el billingPeriod para crear un ShipTo
    if (selectedShipToData) {
      createShipTo(clientId, projectId, selectedShipToData, zones, selectedStructure);
    }
    setIsShipToModalOpen(false);
  };

  const businessRulesViewModal = {
    content: (
      <ModalBusinessRules
        setCurrentView={setCurrentView}
        zones={zones}
        setZones={setZones}
        selectedStructure={selectedStructure}
        setSelectedStructure={setSelectedStructure}
      />
    ),
    footer: (
      <div className="footer">
        <Button className="cancelButton" onClick={() => setCurrentView("main")}>
          Cancelar
        </Button>
        <Button
          onClick={handleCreateShipTo}
          disabled={selectedStructure.channels.length === 0 || zones.length === 0}
          className="acceptButton"
        >
          Crear Ship To
        </Button>
      </div>
    )
  };

  return (
    <>
      <Modal
        width={"40%"}
        open={isOpen}
        className="modalcreateshipto"
        okButtonProps={{
          className: "buttonOk"
        }}
        cancelButtonProps={{
          className: "buttonCancel"
        }}
        footer={currentView === "businessRules" ? businessRulesViewModal.footer : null}
        onCancel={() => setIsShipToModalOpen(false)}
      >
        {currentView === "main" && (
          <ModalCreateShipTo
            setIsShipToModalOpen={setIsShipToModalOpen}
            setCurrentView={setCurrentView}
            setSelectedShipToData={setSelectedShipToData}
            setIsBillingPeriodOpen={setIsBillingPeriodOpen}
            billingPeriod={billingPeriod}
          />
        )}
        {currentView === "businessRules" && businessRulesViewModal.content}
        {currentView === "address" && <ModalAddress setCurrentView={setCurrentView} />}
      </Modal>
      <ModalBillingPeriod
        isOpen={isBillingPeriodOpen}
        setIsBillingPeriodOpen={setIsBillingPeriodOpen}
        setBillingPeriod={setBillingPeriod}
      />
    </>
  );
};

const initDatSelectedBusinessRules: ISelectedBussinessRules = {
  channels: [],
  lines: [],
  sublines: []
};
