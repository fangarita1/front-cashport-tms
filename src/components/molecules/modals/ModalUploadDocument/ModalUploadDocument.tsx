import { Dispatch, SetStateAction } from "react";
import { Flex, Modal, Typography } from "antd";

import "./modaluploaddocument.scss";
import { UploadDocumentButton } from "@/components/atoms/UploadDocumentButton/UploadDocumentButton";

interface Props {
  isOpen: boolean;
  setIsOpenUpload: Dispatch<SetStateAction<boolean>>;
}
const { Title, Text } = Typography;

export const ModalUploadDocument = ({ isOpen, setIsOpenUpload }: Props) => {
  return (
    <Modal
      width={"40%"}
      open={isOpen}
      okButtonProps={{ className: "buttonOk" }}
      cancelButtonProps={{
        className: "buttonCancel"
      }}
      okText="Guardar ubicación"
      title={<Title level={4}>Cargar Documentos</Title>}
      className="modaluploaddocument"
      onCancel={() => setIsOpenUpload(false)}
      onOk={() => setIsOpenUpload(false)}
    >
      <Text className="description">
        Haz clic en cada casilla para adjuntar los documentos requeridos
      </Text>
      <Flex vertical className="mainUploadDocuments">
        <UploadDocumentButton />
        <UploadDocumentButton />
        <UploadDocumentButton />
        <UploadDocumentButton />
        <UploadDocumentButton />
        <UploadDocumentButton />
      </Flex>
    </Modal>
  );
};
