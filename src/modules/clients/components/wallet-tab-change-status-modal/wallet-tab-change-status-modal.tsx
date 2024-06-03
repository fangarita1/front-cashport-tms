import React, { useState } from "react";
import { Button, Flex, Modal, Radio, RadioChangeEvent } from "antd";
import styles from "./wallet-tab-change-status-modal.module.scss";
import { CaretLeft, Plus } from "phosphor-react";
import { DocumentButton } from "@/components/atoms/DocumentButton/DocumentButton";

interface Props {
  isOpen: boolean;
}

interface FileFromDragger {
  lastModified: number;
  lastModifiedDate: Date;
  name: string;
  originFileObj: File;
  percent: number;
  size: number;
  status: string;
  type: string;
  uid: string;
}
interface FileObjectFromButton {
  file: FileFromDragger;
  fileList: FileFromDragger[];
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
    // Aqui se debe hacer la llamada a la API para adjuntar la evidencia
    // que esta en los estados de selectedEvidence, selectedState y commentary
  };

  const handleOnChangeDocument: any = (info: FileObjectFromButton) => {
    const { file } = info;
    const rawFile = file.originFileObj;
    if (rawFile) {
      const fileSizeInMB = rawFile.size / (1024 * 1024);

      if (fileSizeInMB > 30) {
        alert("El archivo es demasiado grande. Por favor, sube un archivo de menos de 30 MB.");
        return;
      }

      setSelectedEvidence([...selectedEvidence, rawFile]);
    }
  };

  const handleOnDeleteDocument = (fileName: string) => {
    const updatedFiles = selectedEvidence?.filter((file) => file.name !== fileName);
    setSelectedEvidence(updatedFiles);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files as FileList);

    for (let i = 0; i < files.length; i++) {
      if (selectedEvidence.some((file) => file.name === files[i].name)) {
        alert("Ya existe un archivo con el mismo nombre");
        return;
      }
    }

    setSelectedEvidence((prevFiles) => [...prevFiles, ...files]);
  };

  const firstViewModal = {
    title: "Cambio de estado",
    description: "Selecciona el nuevo estado de la factura",
    innerContent: (
      <div className={styles.content__status}>
        {invoiceStates.map((state) => (
          <Radio.Group onChange={handleOnChangeRadioGroup} value={selectedState} key={state}>
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
          title={selectedEvidence[0]?.name}
          handleOnChange={handleOnChangeDocument}
          handleOnDelete={() => handleOnDeleteDocument(selectedEvidence[0]?.name)}
          fileName={selectedEvidence[0]?.name}
          fileSize={selectedEvidence[0]?.size}
        />
        {selectedEvidence.length > 0
          ? selectedEvidence.slice(1).map((file) => {
              return (
                <DocumentButton
                  key={file.name}
                  className={styles.documentButton}
                  title={file.name}
                  handleOnChange={handleOnChangeDocument}
                  handleOnDelete={() => handleOnDeleteDocument(file.name)}
                  fileName={file.name}
                  fileSize={file.size}
                />
              );
            })
          : null}
        {selectedEvidence.length > 0 && (
          <>
            <Button
              onClick={() => {
                const fileInput = document.getElementById("fileInput");
                if (fileInput) {
                  fileInput.click();
                }
              }}
              className={styles.addDocument}
              icon={<Plus size={"1rem"} />}
            >
              <p>Cargar otro documento</p>
            </Button>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={handleFileChange}
              accept=".pdf,.png,.doc,.docx"
            />
          </>
        )}

        <p>Comentarios</p>
        <textarea onChange={handleOnChangeTextArea} placeholder="Ingresar un comentario" />
      </div>
    ),
    footer: (
      <div className={styles.footer}>
        <Button className={styles.cancelButton}>Cancelar</Button>
        <Button
          onClick={handleAttachEvidence}
          disabled={commentary && selectedEvidence.length > 0 ? false : true}
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
