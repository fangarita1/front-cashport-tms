import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button, Modal } from "antd";

import { ModalBillingPeriod } from "../ModalBillingPeriod/ModalBillingPeriod";
import { IBillingPeriodForm } from "@/types/billingPeriod/IBillingPeriod";

import { ModalBusinessRules } from "../ModalBusinessRules/ModalBusinessRules";
import { ISelectedBussinessRules } from "@/types/bre/IBRE";
import { IShipTo, ShipToFormType } from "@/types/shipTo/IShipTo";

import "./modalShipTo.scss";
import { ModalCreateShipTo } from "./ModalCreateShipTo/ModalCreateShipTo";
import { ISelectType } from "@/types/clients/IClients";
import { MessageInstance } from "antd/es/message/interface";

interface Props {
  setIsShipToModalOpen: Dispatch<
    SetStateAction<{
      open: boolean;
      accounting_code: string | undefined;
    }>
  >;
  isShipToModalOpen: {
    open: boolean;
    accounting_code: string | undefined;
  };
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
  // eslint-disable-next-line no-unused-vars
  getShipTo: (shipToCode: string) => Promise<IShipTo>;
  editShipTo: (
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
  setIsShipToModalOpen,
  isShipToModalOpen,
  getClientValues,
  messageApi,
  createShipTo,
  getShipTo,
  editShipTo
}: Props) => {
  const [currentView, setCurrentView] = useState<"main" | "businessRules">("main");
  const [selectedShipToData, setSelectedShipToData] = useState<ShipToFormType | undefined>();
  const [isBillingPeriodOpen, setIsBillingPeriodOpen] = useState(false);
  const [billingPeriod, setBillingPeriod] = useState<IBillingPeriodForm | undefined>();
  const [zones, setZones] = useState([] as number[]);
  const [selectedStructure, setSelectedStructure] = useState<ISelectedBussinessRules>(
    initDatSelectedBusinessRules
  );

  const handleSubmitShipTo = () => {
    // If we are editing
    if (isShipToModalOpen.accounting_code) {
      if (selectedShipToData) {
        editShipTo(selectedShipToData, zones, selectedStructure, messageApi);
      }
      return;
    }
    if (selectedShipToData) {
      createShipTo(selectedShipToData, zones, selectedStructure, messageApi);
    }
    setCurrentView("main");
    setIsShipToModalOpen({ open: false, accounting_code: undefined });
  };

  useEffect(() => {
    const fetchShipTo = async () => {
      if (!isShipToModalOpen.accounting_code) {
        setBillingPeriod(undefined);
        setZones([]);
        setSelectedShipToData(undefined);
        setSelectedStructure(initDatSelectedBusinessRules);
        return;
      }
      const response = await getShipTo(isShipToModalOpen.accounting_code);
      setSelectedShipToData({
        shipTo: {
          code: response.accounting_code,
          dependency_client: Boolean(response.dependecy_client),
          address: response.full_address,
          address_id: response.address_id,
          billing_period: response.billing_period,
          condition_payment: {
            value: response.condition_payment,
            label: response.condition_day.toString()
          },
          radication_type: { value: response.radication_type, label: response.radication_name }
        }
      });
      // Waiting 4 back with this info
      // setZones()
      // setSelectedStructure({channels: [], lines: [], sublines: []})
    };

    fetchShipTo();
  }, [isShipToModalOpen]);

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
          onClick={handleSubmitShipTo}
          disabled={selectedStructure.channels.length === 0 || zones.length === 0}
          className="acceptButton"
        >
          {isShipToModalOpen.accounting_code ? "Actualizar Ship To" : "Crear Ship To"}
        </Button>
      </div>
    )
  };

  return (
    <>
      <Modal
        zIndex={2}
        width={"40%"}
        destroyOnClose
        open={isShipToModalOpen.open}
        className="modalcreateshipto"
        okButtonProps={{
          className: "buttonOk"
        }}
        cancelButtonProps={{
          className: "buttonCancel"
        }}
        footer={currentView === "businessRules" ? businessRulesViewModal.footer : null}
        onCancel={() => {
          setIsShipToModalOpen({ open: false, accounting_code: undefined });
        }}
      >
        {currentView === "main" && (
          <ModalCreateShipTo
            setIsShipToModalOpen={setIsShipToModalOpen}
            isShipToModalOpen={isShipToModalOpen}
            setCurrentView={setCurrentView}
            setSelectedShipToData={setSelectedShipToData}
            selectedShipToData={selectedShipToData}
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
