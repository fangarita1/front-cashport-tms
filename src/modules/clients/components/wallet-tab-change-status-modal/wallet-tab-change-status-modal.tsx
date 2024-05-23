import React, { useState } from "react";
import { Button, Modal, Radio } from "antd";
import styles from "./wallet-tab-change-status-modal.module.scss";
import { CaretLeft } from "phosphor-react";

interface Props {
  isOpen: boolean;
}

const WalletTabChangeStatusModal: React.FC<Props> = ({ isOpen }) => {
  const [selectedState, setSelectedState] = useState();

  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setSelectedState(e.target.value);
  };

  const firstFooter = (
    <div className={styles.footer}>
      <Button className={styles.cancelButton}>Cancelar</Button>
      <Button disabled={!selectedState} className={styles.acceptButton}>
        Cambiar de estado
      </Button>
    </div>
  );

  return (
    <>
      <Modal
        className={styles.wrapper}
        width={"50%"}
        open={isOpen}
        footer={firstFooter}
        closable={false}
      >
        <div className={styles.content}>
          <div className={styles.content__header}>
            <CaretLeft size={"1.25rem"} />
            <p>Cambio de estado</p>
          </div>
          <p className={styles.content__description}>Selecciona el nuevo estado de la factura</p>
          <div className={styles.content__status}>
            {invoiceStates.map((state) => (
              <Radio.Group
                className={styles.content__status}
                onChange={onChange}
                value={selectedState}
                key={state}
              >
                <Radio className={styles.content__status__item} value={state}>
                  {state}
                </Radio>
              </Radio.Group>
            ))}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default WalletTabChangeStatusModal;

const invoiceStates = ["Emitida", "Conciliada", "Glosada", "Devolucion", "Anulación"];
