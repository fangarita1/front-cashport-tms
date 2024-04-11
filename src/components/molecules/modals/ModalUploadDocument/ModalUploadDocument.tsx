import { Dispatch, SetStateAction } from "react";
import { Flex, Modal, Typography } from "antd";

import "./modaluploaddocument.scss";
import { UploadDocumentButton } from "@/components/atoms/UploadDocumentButton/UploadDocumentButton";

interface Props {
  isOpen: boolean;
  setIsOpenUpload: Dispatch<SetStateAction<boolean>>;
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

export const ModalUploadDocument = ({ isOpen, setIsOpenUpload }: Props) => {
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
      onCancel={() => setIsOpenUpload(false)}
      onOk={() => setIsOpenUpload(false)}
    >
      <Text className="description">
        Haz clic en cada casilla para adjuntar los documentos requeridos
      </Text>
      <Flex vertical className="mainUploadDocuments">
        {mockFiles.map((file) => (
          <UploadDocumentButton key={file.id} title={file.title} isMandatory={file.isMandatory} />
        ))}
      </Flex>
    </Modal>
  );
};
