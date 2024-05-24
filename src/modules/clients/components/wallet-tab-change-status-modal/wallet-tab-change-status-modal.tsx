import React, { useState } from "react";
import { Button, Flex, Modal, Radio } from "antd";
import styles from "./wallet-tab-change-status-modal.module.scss";
import { CaretLeft } from "phosphor-react";
import { DocumentButton } from "@/components/atoms/DocumentButton/DocumentButton";

interface Props {
  isOpen: boolean;
}
interface FileObject {
  docReference: string;
  file: File | undefined;
}

const WalletTabChangeStatusModal: React.FC<Props> = ({ isOpen }) => {
  const [selectedState, setSelectedState] = useState();
  const [selectedEvidence, setSelectedEvidence] = useState<File | undefined>();
  const [description, setDescription] = useState();
  const [isSecondView, setIsSecondView] = useState(false);

  const handleOnChangeRadioGroup = (e) => {
    console.log("radio checked", e.target.value);
    setSelectedState(e.target.value);
  };

  const handlegoBackToFirstView = () => {
    setIsSecondView(false);
    setSelectedState(undefined);
  };

  const handleOnChangeTextArea = (e) => {
    setDescription(e.target.value);
  };

  const handleAttachEvidence = () => {
    console.log("evidencia adjuntada: ", selectedEvidence);
    console.log("state: ", selectedState);
    console.log("description: ", description);
  };

  const handleOnChangeDocument: any = (info: FileObject) => {
    const { file } = info;
    setSelectedEvidence(file);
  };

  const firstViewModal = {
    title: "Cambio de estado",
    description: "Selecciona el nuevo estado de la factura",
    innerContent: (
      <div className={styles.content__status}>
        {invoiceStates.map((state) => (
          <Radio.Group
            className={styles.content__status}
            onChange={handleOnChangeRadioGroup}
            value={selectedState}
            key={state}
          >
            <Radio className={styles.content__status__item} value={state}>
              {state}
            </Radio>
          </Radio.Group>
        ))}
      </div>
    ),
    footer: (
      <div className={styles.footer}>
        <Button className={styles.cancelButton}>Cancelar</Button>
        <Button
          disabled={!selectedState}
          className={styles.acceptButton}
          onClick={() => setIsSecondView(!isSecondView)}
        >
          Cambiar de estado
        </Button>
      </div>
    )
  };

  const secondViewModal = {
    title: "Evidencia",
    description: "Adjunta la evidencia e ingresa un comentario",
    innerContent: (
      <div className={styles.content__evidence}>
        <Flex vertical>
          <p>Evidencia</p>
          <em className="descriptionDocument">*Obligatorio</em>
        </Flex>
        <DocumentButton
          title={"meh"}
          handleOnChange={handleOnChangeDocument}
          handleOnDrop={() => console.log("handleOnDrop")}
          handleOnDelete={() => console.log("handleOnDelete")}
          fileName={selectedEvidence?.name}
          fileSize={selectedEvidence?.size}
        />

        <p>Comentarios</p>
        <textarea onClick={handleOnChangeTextArea} placeholder="Ingresar un comentario" />
      </div>
    ),
    footer: (
      <div className={styles.footer}>
        <Button className={styles.cancelButton}>Cancelar</Button>
        <Button
          onClick={handleAttachEvidence}
          disabled={description && selectedEvidence ? false : true}
          className={styles.acceptButton}
        >
          Adjuntar evidencia
        </Button>
      </div>
    )
  };

  return (
    <>
      <Modal
        className={styles.wrapper}
        width={"50%"}
        open={isOpen}
        footer={isSecondView ? secondViewModal.footer : firstViewModal.footer}
        closable={false}
      >
        <div className={styles.content}>
          <Button
            onClick={isSecondView ? handlegoBackToFirstView : undefined}
            className={styles.content__header}
          >
            <CaretLeft size={"1.25rem"} />
            <p>{isSecondView ? secondViewModal.title : firstViewModal.title}</p>
          </Button>

          <p className={styles.content__description}>
            {isSecondView ? secondViewModal.description : firstViewModal.description}
          </p>
          {isSecondView ? secondViewModal.innerContent : firstViewModal.innerContent}
        </div>
      </Modal>
    </>
  );
};

export default WalletTabChangeStatusModal;

const invoiceStates = ["Emitida", "Conciliada", "Glosada", "Devolucion", "Anulación"];
