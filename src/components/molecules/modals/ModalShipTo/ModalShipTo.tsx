import { Dispatch, SetStateAction, useState } from "react";
import { Button, Modal } from "antd";

import { ModalBillingPeriod } from "../ModalBillingPeriod/ModalBillingPeriod";
import { IBillingPeriodForm } from "@/types/billingPeriod/IBillingPeriod";

import { ModalBusinessRules } from "../ModalBusinessRules/ModalBusinessRules";
import { ISelectedBussinessRules } from "@/types/bre/IBRE";
import { ShipToFormType } from "@/types/shipTo/IShipTo";

import "./modalShipTo.scss";
import { ModalCreateShipTo } from "./ModalCreateShipTo/ModalCreateShipTo";
import { ISelectType } from "@/types/clients/IClients";
import { MessageInstance } from "antd/es/message/interface";

interface Props {
  isOpen: boolean;
  setIsShipToModalOpen: Dispatch<SetStateAction<boolean>>;
  getClientValues: () => {
    billingPeriod: string;
    radicationType: ISelectType;
    conditionPayment: ISelectType;
  };
  messageApi: MessageInstance;
  createShipTo: (
    // eslint-disable-next-line no-unused-vars
    selectedData: ShipToFormType,
    // eslint-disable-next-line no-unused-vars
    zones: number[],
    // eslint-disable-next-line no-unused-vars
    selectedStructure: ISelectedBussinessRules,
    // eslint-disable-next-line no-unused-vars
    messageApi: MessageInstance
  ) => void;
}

export const ModalShipTo = ({
  isOpen,
  setIsShipToModalOpen,
  getClientValues,
  messageApi,
  createShipTo
}: Props) => {
  const [currentView, setCurrentView] = useState<"main" | "businessRules">("main");
  const [selectedShipToData, setSelectedShipToData] = useState<ShipToFormType | undefined>();
  const [isBillingPeriodOpen, setIsBillingPeriodOpen] = useState(false);
  const [billingPeriod, setBillingPeriod] = useState<IBillingPeriodForm | undefined>();
  const [zones, setZones] = useState([] as number[]);
  const [selectedStructure, setSelectedStructure] = useState<ISelectedBussinessRules>(
    initDatSelectedBusinessRules
  );

  const handleCreateShipTo = () => {
    if (selectedShipToData) {
      createShipTo(selectedShipToData, zones, selectedStructure, messageApi);
    }
    setCurrentView("main");
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
        onCancel={() => {
          setCurrentView("main");
          setIsShipToModalOpen(false);
          setBillingPeriod(undefined);
          setZones([]);
          setSelectedStructure(initDatSelectedBusinessRules);
        }}
      >
        {currentView === "main" && (
          <ModalCreateShipTo
            setIsShipToModalOpen={setIsShipToModalOpen}
            setCurrentView={setCurrentView}
            setSelectedShipToData={setSelectedShipToData}
            setIsBillingPeriodOpen={setIsBillingPeriodOpen}
            billingPeriod={billingPeriod}
            getClientValues={getClientValues}
          />
        )}
        {currentView === "businessRules" && businessRulesViewModal.content}
      </Modal>
      <ModalBillingPeriod
        isOpen={isBillingPeriodOpen}
        billingPeriod={billingPeriod}
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
