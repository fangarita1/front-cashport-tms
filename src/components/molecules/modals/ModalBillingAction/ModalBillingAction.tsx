import { Flex, Modal } from "antd";
import { CaretLeft, X } from "phosphor-react";
import { useEffect, useState } from "react";
import styles from "./ModalBillingAction.module.scss";
import ActionList from "./ActionList/ActionList";
import ConfirmClose from "./ConfirmClose/ConfirmClose";
import UploadInvoice from "./UploadInvoice/UploadInvoice";
import { MessageInstance } from "antd/es/message/interface";

export enum BillingStatusEnum {
  PorAceptar = "Por aceptar",
  Aceptadas = "Aceptadas",
  Preautorizado = "Preautorizado",
  Facturado = "Facturado"
}
export enum ViewEnum {
  "SELECT" = "SELECT",
  "CONFIRM_CLOSE" = "CONFIRM_CLOSE",
  "UPLOAD_INVOICE" = "UPLOAD_INVOICE"
}

type PropsModal = {
  idTR: number;
  totalValue: number;
  billingStatus: BillingStatusEnum;
  isOpen: boolean;
  onClose: () => void;
  messageApi: MessageInstance;
};

export default function ModalBillingAction(props: Readonly<PropsModal>) {
  const { isOpen, onClose, idTR, totalValue, billingStatus, messageApi } = props;
  const [selectedView, setSelectedView] = useState<ViewEnum>(ViewEnum.SELECT);

  const renderView = () => {
    switch (selectedView) {
      case ViewEnum.SELECT:
        return <ActionList setSelectedView={setSelectedView} billingStatus={billingStatus} />;
      case ViewEnum.CONFIRM_CLOSE:
        return (
          <ConfirmClose
            setSelectedView={setSelectedView}
            onClose={onClose}
            idTR={idTR}
            totalValue={totalValue}
            messageApi={messageApi}
          />
        );
      case ViewEnum.UPLOAD_INVOICE:
        return <UploadInvoice idTR={idTR} onClose={onClose} messageApi={messageApi} />;
      default:
        return <ActionList setSelectedView={setSelectedView} billingStatus={billingStatus} />;
    }
  };

  const renderTitle = () => {
    switch (selectedView) {
      case ViewEnum.SELECT:
        return <p className={styles.selectTitle}>Selecciona la acción que vas a realizar</p>;
      case ViewEnum.CONFIRM_CLOSE:
        return (
          <Flex gap={8} align="center">
            <CaretLeft size={20} onClick={() => setSelectedView(ViewEnum.SELECT)} />
            <p className={styles.actionTitle}>Aceptar cierre de TR</p>
          </Flex>
        );
      case ViewEnum.UPLOAD_INVOICE:
        return <p className={styles.actionTitle}>Cargar facturas</p>;
      default:
        return "";
    }
  };

  useEffect(() => {
    return () => {
      setSelectedView(ViewEnum.SELECT);
    };
  }, [isOpen]);

  return (
    <Modal
      width={698}
      title={renderTitle()}
      styles={{ body: { maxHeight: "32rem", overflowY: "auto", paddingTop: 24 } }}
      centered
      open={isOpen}
      onClose={() => onClose()}
      closeIcon={
        selectedView !== ViewEnum.CONFIRM_CLOSE && <X size={20} weight="bold" onClick={onClose} />
      }
      footer={<></>}
    >
      {renderView()}
    </Modal>
  );
}
