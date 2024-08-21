import PrincipalButton from "@/components/atoms/buttons/principalButton/PrincipalButton";
import { InputForm } from "@/components/atoms/inputs/InputForm/InputForm";
import {
  FileObject,
  UploadDocumentButton
} from "@/components/atoms/UploadDocumentButton/UploadDocumentButton";
import UploadDocumentChild from "@/components/atoms/UploadDocumentChild/UploadDocumentChild";
import { CertificateType, DocumentCompleteType } from "@/types/logistics/certificate/certificate";
import { Button, Col, DatePicker, Flex, Modal, Row, Select, Spin, Switch, Tabs, TabsProps, Typography, Upload } from "antd";
import { CheckCircle, FileArrowUp, FloppyDisk, X } from "phosphor-react";
import { Controller, useForm } from "react-hook-form";
import { SelectInputForm } from "../../logistics/SelectInputForm/SelectInputForm";
import { InputCreateDocument } from "@/components/atoms/inputs/inputCreate/InputCreateDocument";
import SecondaryButton from "@/components/atoms/buttons/secondaryButton/SecondaryButton";
import { useState } from "react";

const { Title } = Typography;
const { Option } = Select;

type PropsModalDocuments = {
  mockFiles: DocumentCompleteType[];
  setFiles: React.Dispatch<React.SetStateAction<any[] | FileObject[]>>;
  documentsType?: CertificateType[];
  isLoadingDocuments: boolean;
  isOpen: boolean;
  onClose: () => void;
  // eslint-disable-next-line no-unused-vars
  handleChange: (value: string[]) => void;
  allOptional?: boolean;
  setSelectedFiles?: React.Dispatch<React.SetStateAction<DocumentCompleteType[]>>
};

export default function ModalDocuments(props: PropsModalDocuments) {
  const {
    mockFiles,
    setSelectedFiles,
    setFiles,
    documentsType,
    isLoadingDocuments,
    isOpen,
    onClose,
    handleChange,
    allOptional = false
  } = props;

  const {
    control,
  } = useForm<CertificateType>();

  const [selectedFile, setSelectedFile] = useState<any>(null);

  const handleUploadChange = (info: any) => {
    const file = info.file.originFileObj || info.file;
    setSelectedFile(file);
  };
  
  return (
    <Modal
      title="Cargar documentos"
      styles={{ body: { maxHeight: "30rem", overflowY: "auto", paddingRight: "0.5rem" } }}
      centered
      open={isOpen}
      onOk={onClose}
      onClose={() => {
        onClose()
      }}
      closeIcon={<X onClick={onClose} />}
      afterOpenChange={()=>{
        console.log(mockFiles)
      }}
      footer={
        <Flex justify="flex-end">
          <PrincipalButton onClick={onClose}>Cerrar</PrincipalButton>
        </Flex>
      }
    >
      <Tabs
        type="card"
        items = {[{
          key: '1',
          label: 'Documento Existente',
          children:
            <>
            <Flex style={{ width: "100%" }} justify="space-between">
              <Row style={{ width: "100%" }} justify="space-between">
                <Col span={24} style={{marginTop:'1rem'}}>
                  <Title className="title" level={5} style={{marginTop:'1rem'}}>
                    Seleccione tipo de documento existente
                  </Title>
                  {documentsType && Array.isArray(documentsType) ? (
                    <Select
                      mode="multiple"
                      allowClear={false}
                      style={{ width: "100%" }}
                      placeholder="Seleccione documento"
                      defaultValue={mockFiles?.map((document) => document.id.toString()) || []}
                      loading={isLoadingDocuments}
                      onChange={(value)=>{ handleChange(value)}}
                      options={documentsType?.map((document) => ({
                        label: <span>{document.description}</span>,
                        value: document.id.toString(),
                        //disabled: allOptional ? false : !document.optional
                      }))}
                    />
                  ) : (
                    <Spin spinning={true}>Loading documents...</Spin>
                  )}

                </Col>
                <Col span={12} offset={12} style={{marginTop:'1rem', marginBottom:'1rem', textAlign:'right'}}>

                </Col>
              </Row>
            </Flex>
            </>          
        },
        {
          key: '2',
          label: 'Nuevo Documento',
          children:
          <>
          <Flex style={{ width: "100%" }} justify="space-between">
            <Row style={{ width: "100%", marginBottom:'2rem' }} justify="space-between">
              <Col span={24}>                        
                <InputForm
                  placeholder="Ingresar nombre del documento"
                  titleInput="Nombre del documento"
                  nameInput="description"
                  validationRules={{ required: true }} control={control} error={undefined}
                  />
                    <div className="containerInput" style={{marginTop:'1rem'}}>
                      <Title className="input-form-title" level={5}>
                        Tipo de documento
                      </Title>
                    </div>
                    <Controller
                    name="entity_type"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <SelectInputForm
                        placeholder="Seleccionar"
                        field={field}
                        loading={undefined}
                        options={[
                          { id:1, value:"Vehículo"},
                          { id:2, value:"Conductor"},
                          { id:3, value:"Proveedor"}
                        ]} error={undefined} 
                        />
                      )}                    
                    /> 
              </Col>
              <Col span={12} style={{marginTop:'1rem', textAlign:'left'}}>
                  <Controller
                    name="template"
                    control={control}
                    render={({ field }) => (
                      <Upload
                        className="uploadDocumentButton"
                        {...props}
                        onChange={(info) => {
                          field.onChange(info.file.originFileObj || info.file);
                          handleUploadChange(info);
                        }}
                      >
                        <Button htmlType="button" className="">
                          <FileArrowUp size={16} />
                          Cargar Plantilla
                        </Button>{" "}
                      </Upload>
                    )}
                  />
              </Col>
              <Col span={12} style={{marginTop:'1rem', textAlign:'right'}}>
                <Button htmlType="button" className="">
                  <FloppyDisk size={16} />
                  Guardar
                </Button>{" "}
              </Col>
            </Row>
          </Flex>
          </>
        }]}
      />
      
    </Modal>
  );
}
