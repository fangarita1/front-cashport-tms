import React from "react";
import { Button, Flex, Modal, UploadFile } from "antd";
import { CaretLeft, Plus } from "@phosphor-icons/react";
import { DocumentButton } from "@/components/atoms/DocumentButton/DocumentButton";
import { InputDateForm } from "@/components/atoms/inputs/InputDate/InputDateForm";
import { UploadChangeParam } from "antd/es/upload";
import { IInvoice } from "@/types/invoices/IInvoices";
import { MessageInstance } from "antd/es/message/interface";
import { useForm, Controller, FieldError } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./radicationInvoice.scss";
import { InputForm } from "@/components/atoms/inputs/InputForm/InputForm";
import { radicateInvoice } from "@/services/accountingAdjustment/accountingAdjustment";

interface RadicationInvoiceProps {
  isOpen: boolean;
  onClose: () => void;
  clientId?: number;
  projectId?: number;
  invoiceSelected?: IInvoice[];
  messageShow: MessageInstance;
}

interface IFormRadicationInvoice {
  radication_date: Date;
  commentary: string;
  evidence: File[];
}

const schema = yup.object().shape({
  radication_date: yup
    .date()
    .typeError("Debe ser una fecha válida")
    .required("La fecha de radicación es requerida"),
  commentary: yup.string().required("El comentario es requerido"),
  evidence: yup
    .array()
    .min(1, "Se requiere al menos un archivo de evidencia")
    .required("La evidencia es requerida")
});

const RadicationInvoice = ({
  isOpen,
  onClose,
  clientId,
  invoiceSelected,
  messageShow
}: RadicationInvoiceProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    reset,
    watch,
    trigger
  } = useForm<IFormRadicationInvoice>({
    resolver: yupResolver(schema),
    defaultValues: {
      commentary: "",
      evidence: []
    }
  });

  const evidence = watch("evidence");

  const handleOnChangeDocument = (info: UploadChangeParam<UploadFile<any>>) => {
    const file = info.file.originFileObj;
    if (file) {
      const fileSizeInMB = file.size / (1024 * 1024);
      if (fileSizeInMB > 30) {
        messageShow.error(
          "El archivo es demasiado grande. Por favor, sube un archivo de menos de 30 MB."
        );
        return;
      }
      setValue("evidence", [...evidence, file]);
      trigger("evidence");
    }
  };

  const handleOnDeleteDocument = (fileName: string) => {
    const updatedFiles = evidence.filter((file) => file.name !== fileName);
    setValue("evidence", updatedFiles);
    trigger("evidence");
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
      setValue("evidence", [...evidence, file]);
      trigger("evidence");
    }
  };

  const onSubmit = async (data: IFormRadicationInvoice) => {
    try {
      const radicationData = {
        invoices_id: invoiceSelected?.map((invoice) => invoice.id) as number[], // Asumiendo que tienes el ID de la factura
        radication_type: "1", // O el valor que corresponda
        accept_date: data.radication_date.toISOString().split("T")[0], // Formato YYYY-MM-DD
        comments: data.commentary
      };

      const response = await radicateInvoice(radicationData, data.evidence, clientId as number);
      console.log("Respuesta del servidor:", response);
      messageShow.success("Factura radicada con éxito");
      reset();
      onClose();
    } catch (error) {
      console.error("Error al radicar la factura:", error);
      messageShow.error("Error al radicar la factura");
    }
  };

  return (
    <Modal className="contentRegisterNews" width="50%" footer={null} open={isOpen} closable={false}>
      <button className="contentRegisterNews__header" onClick={onClose}>
        <CaretLeft size="1.25rem" />
        <h4>Registrar novedad</h4>
      </button>
      <p className="contentRegisterNews__description">
        Adjunta la evidencia e ingresa un comentario
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="contentRegisterNews__form">
        <div className="contentRegisterNews__select">
          <Flex vertical>
            <InputForm
              disabled
              placeholder="EMAIL"
              nameInput={""}
              control={control}
              error={undefined}
              titleInput="Tipo de radicación"
            />
          </Flex>
          <InputDateForm
            titleInput="Fecha de radicación"
            nameInput="radication_date"
            control={control}
            error={errors.radication_date as FieldError}
          />
        </div>
        <div className="contentRegisterNews__evidence">
          <Flex vertical>
            <p>Evidencia</p>
            <em className="descriptionDocument">*Obligatorio</em>
          </Flex>
          <Flex vertical gap="0.7rem">
            <DocumentButton
              key={evidence[0]?.name}
              title={evidence[0]?.name}
              handleOnChange={handleOnChangeDocument}
              handleOnDelete={() => handleOnDeleteDocument(evidence[0]?.name)}
              fileName={evidence[0]?.name}
              fileSize={evidence[0]?.size}
            />
            {evidence.slice(1).map((file, index) => (
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
            {evidence.length > 0 && (
              <>
                <Button
                  onClick={() => {
                    const fileInput = document.getElementById("fileInput");
                    if (fileInput) {
                      fileInput.click();
                    }
                  }}
                  className="addDocument"
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
            {errors.evidence && <p className="error">{errors.evidence.message}</p>}
          </Flex>
          <p>Comentarios</p>
          <div>
            <Controller
              name="commentary"
              control={control}
              render={({ field }) => <textarea {...field} placeholder="Ingresar un comentario" />}
            />
            {errors.commentary && <p className="error">{errors.commentary.message}</p>}
          </div>
        </div>
        <div className="footer">
          <Button
            className="cancelButton"
            onClick={() => {
              reset();
              onClose();
            }}
          >
            Cancelar
          </Button>

          <Button
            className={`acceptButton ${isValid ? "acceptButton__green" : ""}`}
            htmlType="submit"
          >
            Adjuntar evidencia
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default RadicationInvoice;
