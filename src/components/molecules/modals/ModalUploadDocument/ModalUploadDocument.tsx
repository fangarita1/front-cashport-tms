import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Flex, Modal, Typography } from "antd";

import "./modaluploaddocument.scss";
import { UploadDocumentButton } from "@/components/atoms/UploadDocumentButton/UploadDocumentButton";
import { useParams } from "next/navigation";
import useModalUploadDocument from "@/hooks/useModalUploadDocument";

interface Props {
  isOpen: boolean;
  clientTypeId?: string | number;
  setIsOpenUpload: Dispatch<SetStateAction<boolean>>;
  setClientDocuments: Dispatch<SetStateAction<File[]>>;
}

interface FileObject {
  docReference: string;
  file: File | undefined;
}

const { Title, Text } = Typography;

const mockFiles = [
  { id: 1, title: "RUT", isMandatory: true },
  { id: 2, title: "Cámara de Comercio", isMandatory: true },
  { id: 3, title: "Estados Financieros", isMandatory: true },
  { id: 4, title: "Formato de Creación", isMandatory: false },
  { id: 5, title: "Certificación bancaria", isMandatory: false },
  { id: 6, title: "Archivos adicionales", isMandatory: false }
];

export const ModalUploadDocument = ({
  isOpen,
  clientTypeId,
  setIsOpenUpload,
  setClientDocuments
}: Props) => {
  // Hay un estado de files en el modal para poder dejar la posibilidad de verificacion
  // El estado de clientDocuments ya deberia contener todos los documentos necesarios
  const [files, setFiles] = useState<FileObject[] | any[]>([]);
  const { data } = useModalUploadDocument(clientTypeId);
  const handleOnSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const justDocuments = files.map((file) => file.file);
    setClientDocuments(justDocuments);
    setIsOpenUpload(false);
  };

  const handleOnCancel = () => {
    setIsOpenUpload(false);
    setFiles([]);
  };

  useEffect(() => {
    console.log({ data, p: "modal" });
  }, [data]);

  const _data = data?.data?.map(({ id, document_name, required }) => {
    return { id, title: document_name, isMandatory: required };
  });
  return (
    <Modal
      width={"40%"}
      open={isOpen}
      okButtonProps={{ className: "buttonOk" }}
      cancelButtonProps={{
        className: "buttonCancel"
      }}
      okText="Adjuntar documentos"
      cancelText="Cancelar"
      title={<Title level={4}>Cargar Documentos</Title>}
      className="modaluploaddocument"
      onCancel={handleOnCancel}
      onOk={handleOnSubmit}
    >
      <Text className="description">
        Haz clic en cada casilla para adjuntar los documentos requeridos
      </Text>
      <Flex vertical className="mainUploadDocuments">
        {_data &&
          _data?.map((file) => (
            <UploadDocumentButton
              key={file.id}
              title={file.title}
              isMandatory={file.isMandatory === 1}
              setFiles={setFiles}
            />
          ))}
      </Flex>
    </Modal>
  );
};
