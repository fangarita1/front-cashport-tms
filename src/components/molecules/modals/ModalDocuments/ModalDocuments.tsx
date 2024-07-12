import PrincipalButton from "@/components/atoms/buttons/principalButton/PrincipalButton";
import {
  FileObject,
  UploadDocumentButton
} from "@/components/atoms/UploadDocumentButton/UploadDocumentButton";
import { CertificateType } from "@/types/logistics/certificate/certificate";
import { Cross } from "@phosphor-icons/react";
import { Col, Flex, Modal, Row, Select, Typography } from "antd";
import { X } from "phosphor-react";

const { Text, Title } = Typography;

type PropsModalDocuments = {
  mockFiles: CertificateType[];
  setFiles: React.Dispatch<React.SetStateAction<any[] | FileObject[]>>;
  setMockFiles: React.Dispatch<React.SetStateAction<CertificateType[]>>;
  documentsType?: CertificateType[];
  isLoadingDocuments: boolean;
  isOpen: boolean;
  onClose: () => void;
};

export default function ModalDocuments(props: PropsModalDocuments) {
  const { mockFiles, setFiles, setMockFiles, documentsType, isLoadingDocuments, isOpen, onClose } =
    props;
  return (
    <Modal
      title="Cargar documentos adicionales"
      bodyStyle={{ minHeight: 500 }}
      open={isOpen}
      onOk={onClose}
      onClose={() => onClose()}
      closeIcon={<X onClick={onClose} />}
      footer={
        <Flex justify="flex-end">
          <PrincipalButton onClick={onClose}>Cerrar</PrincipalButton>
        </Flex>
      }
    >
      <Flex style={{ width: "100%" }} justify="space-between">
        <Row style={{ width: "100%" }} justify="space-between">
          <Col span={24}>
            <Row style={{ width: "100%" }}>
              {mockFiles.map((file) => (
                // eslint-disable-next-line react/jsx-key
                <UploadDocumentButton
                  key={file.id}
                  title={file.description}
                  isMandatory={file.optional.data.includes(0)}
                  aditionalData={file.id}
                  setFiles={setFiles}
                />
              ))}
            </Row>
          </Col>
          <Col span={24}>
            <Title className="title" level={5}>
              Seleccione los documentos adicionales
            </Title>
            <Select
              mode="multiple"
              allowClear
              style={{ width: "100%" }}
              placeholder="Seleccione documentos"
              defaultValue={mockFiles?.map((document) => document.id.toString()) || []}
              loading={isLoadingDocuments}
              onChange={(value) => {
                setMockFiles(
                  documentsType?.filter((document) => value.includes(document.id.toString())) || []
                );
              }}
              options={documentsType?.map((document) => ({
                label: <span>{document.description}</span>,
                value: document.id.toString()
              }))}
            />
          </Col>
        </Row>
      </Flex>
    </Modal>
  );
}
