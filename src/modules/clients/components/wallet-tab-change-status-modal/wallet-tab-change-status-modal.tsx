import React, { useState } from "react";
import { Button, Flex, Modal, Radio, RadioChangeEvent } from "antd";
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
  const [selectedState, setSelectedState] = useState<string | undefined>();
  const [selectedEvidence, setSelectedEvidence] = useState<File[]>([]);
  const [commentary, setCommentary] = useState<string | undefined>();
  const [isSecondView, setIsSecondView] = useState(false);

  const handleOnChangeRadioGroup = (e: RadioChangeEvent) => {
    setSelectedState(e.target.value);
  };

  const handlegoBackToFirstView = () => {
    setIsSecondView(false);
    setSelectedState(undefined);
    setSelectedEvidence([]);
    setCommentary(undefined);
  };

  const handleOnChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentary(e.target.value);
  };

  const handleAttachEvidence = () => {
    console.log("evidencia adjuntada: ", selectedEvidence);
    console.log("state: ", selectedState);
    console.log("commentary: ", commentary);
  };

  const handleOnChangeDocument: any = (info: FileObject) => {
    const { file } = info;
    if (file) {
      setSelectedEvidence([...selectedEvidence, file]);
    }
  };

  const handleOnDeleteDocument = (fileName: string) => {
    console.log("delete");
    const updatedFiles = selectedEvidence?.filter((file) => file.name !== fileName);
    setSelectedEvidence(updatedFiles);
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
          handleOnChange={handleOnChangeDocument}
          handleOnDelete={() => handleOnDeleteDocument(selectedEvidence[0]?.name)}
          fileName={selectedEvidence[0]?.name}
          fileSize={selectedEvidence[0]?.size}
        />
        {selectedEvidence?.map((file) => {
          if (!file) {
            return (
              <DocumentButton
                key={selectedEvidence[0]?.name}
                handleOnChange={handleOnChangeDocument}
                handleOnDelete={() => handleOnDeleteDocument(selectedEvidence[0]?.name)}
                fileName={selectedEvidence[0]?.name}
                fileSize={selectedEvidence[0]?.size}
              />
            );
          }
          return (
            <React.Fragment key={file.name}>
              <p>.</p>
              <DocumentButton
                handleOnChange={handleOnChangeDocument}
                handleOnDelete={() => handleOnDeleteDocument(file.name)}
                fileName={file.name}
                fileSize={file.size}
              />
            </React.Fragment>
          );
        })}

        <p>Comentarios</p>
        <textarea onChange={handleOnChangeTextArea} placeholder="Ingresar un comentario" />
      </div>
    ),
    footer: (
      <div className={styles.footer}>
        <Button className={styles.cancelButton}>Cancelar</Button>
        <Button
          onClick={handleAttachEvidence}
          disabled={commentary && selectedEvidence ? false : true}
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
