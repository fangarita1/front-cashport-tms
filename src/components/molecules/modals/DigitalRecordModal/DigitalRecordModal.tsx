import React from "react";
import { Button, Flex, Modal } from "antd";
import { MessageInstance } from "antd/es/message/interface";
import { CaretLeft, Plus } from "@phosphor-icons/react";

import { DocumentButton } from "@/components/atoms/DocumentButton/DocumentButton";
import { useForm, Controller, FieldError } from "react-hook-form";
import { InputForm } from "@/components/atoms/inputs/InputForm/InputForm";
import PrincipalButton from "@/components/atoms/buttons/principalButton/PrincipalButton";
import SecondaryButton from "@/components/atoms/buttons/secondaryButton/SecondaryButton";
import GeneralSearchSelect from "@/components/ui/general-search-select";

import { IInvoice } from "@/types/invoices/IInvoices";

import "./digitalRecordModal.scss";

interface DigitalRecordModalProps {
  isOpen: boolean;
  onClose: () => void;
  clientId?: number;
  projectId?: number;
  invoiceSelected?: IInvoice[];
  messageShow: MessageInstance;
}

interface infoObject {
  file: File;
  fileList: File[];
}

interface IFormDigitalRecordModal {
  forward_to: string[];
  copy_to: string[];
  subject: string;
  commentary: string;
  attachments: File[];
}

const DigitalRecordModal = ({
  isOpen,
  onClose,
  clientId,
  invoiceSelected,
  messageShow
}: DigitalRecordModalProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    watch,
    trigger
  } = useForm<IFormDigitalRecordModal>({
    defaultValues: {
      attachments: []
    }
  });

  const attachments = watch("attachments");

  const handleOnChangeDocument: any = (info: infoObject) => {
    const { file: rawFile } = info;
    if (rawFile) {
      const fileSizeInMB = rawFile.size / (1024 * 1024);
      if (fileSizeInMB > 30) {
        messageShow.error(
          "El archivo es demasiado grande. Por favor, sube un archivo de menos de 30 MB."
        );
        return;
      }
      setValue("attachments", [...attachments, rawFile]);
      trigger("attachments");
    }
  };

  const handleOnDeleteDocument = (fileName: string) => {
    const updatedFiles = attachments.filter((file: any) => file.name !== fileName);
    setValue("attachments", updatedFiles);
    trigger("attachments");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const fileSizeInMB = file.size / (1024 * 1024);
      if (fileSizeInMB > 30) {
        messageShow.error(
          "El archivo es demasiado grande. Por favor, sube un archivo de menos de 30 MB."
        );
        return;
      }
      setValue("attachments", [...attachments, file]);
      trigger("attachments");
    }
  };

  const onSubmit = async (data: IFormDigitalRecordModal) => {
    console.log(data);
    console.log(invoiceSelected);
    console.log(clientId);
  };

  return (
    <Modal className="digitalRecordModal" width="50%" footer={null} open={isOpen} closable={false}>
      <button className="digitalRecordModal__goBackBtn" onClick={onClose}>
        <CaretLeft size="1.25rem" />
        Enviar acta digital
      </button>

      <Flex vertical gap="1rem">
        <Controller
          name="forward_to"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <GeneralSearchSelect
              errors={errors.forward_to}
              field={field}
              title="Para"
              placeholder=""
              options={test}
              suffixIcon={null}
              showLabelAndValue
            />
          )}
        />

        <Controller
          name="copy_to"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <GeneralSearchSelect
              errors={errors.copy_to}
              field={field}
              title="CC"
              placeholder=""
              options={forwardToEmails}
              suffixIcon={null}
            />
          )}
        />

        <InputForm
          titleInput="Asunto"
          control={control}
          nameInput="subject"
          error={errors.subject}
        />

        <div>
          <p className="digitalRecordModal__titleInput">Adjuntos</p>
          <Flex vertical gap="0.7rem">
            <DocumentButton
              key={attachments[0]?.name}
              title={attachments[0]?.name}
              handleOnChange={handleOnChangeDocument}
              handleOnDelete={() => handleOnDeleteDocument(attachments[0]?.name)}
              fileName={attachments[0]?.name}
              fileSize={attachments[0]?.size}
            />
            {attachments.slice(1).map((file, index) => (
              <DocumentButton
                key={file.name}
                className={index > 0 ? "documentButton" : ""}
                title={file.name}
                handleOnChange={handleOnChangeDocument}
                handleOnDelete={() => handleOnDeleteDocument(file.name)}
                fileName={file.name}
                fileSize={file.size}
              />
            ))}
            {attachments.length > 0 && (
              <>
                <Button
                  onClick={() => {
                    const fileInput = document.getElementById("fileInput");
                    if (fileInput) {
                      fileInput.click();
                    }
                  }}
                  className="digitalRecordModal__addDocument"
                  icon={<Plus size={"1rem"} />}
                >
                  <p>Cargar otro documento</p>
                </Button>
                <input
                  type="file"
                  id="fileInput"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                  accept=".pdf,.png,.doc,.docx, .xls, .xlsx, .msg,  .eml"
                />
              </>
            )}
            {errors.attachments && (
              <p className="error">{(errors.attachments as FieldError).message}</p>
            )}
          </Flex>
        </div>
      </Flex>

      <div className="digitalRecordModal__footer">
        <SecondaryButton onClick={onClose}>Cancelar</SecondaryButton>

        <PrincipalButton onClick={handleSubmit(onSubmit)}>Enviar acta</PrincipalButton>
      </div>
    </Modal>
  );
};

export default DigitalRecordModal;

const forwardToEmails = ["hola, mundo1", "hola, mundo2", "hola, mundo3"];

const test = [
  {
    label: "Usuario 3",
    value: "gabriel.bonilla@alleycorpsur.com"
  },
  {
    label: "Luis",
    value: "alex@casandrasoft.com"
  },
  {
    label: "Enielys",
    value: "enielys00+pruebaadmin@gmail.com"
  }
];
