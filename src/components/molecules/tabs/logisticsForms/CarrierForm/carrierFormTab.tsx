import { useEffect, useRef, useState } from "react";
import { Button, Col, ColorPicker, Flex, Form, Input, message, Modal, Row, Select, Typography } from "antd";
import { Controller, useForm } from "react-hook-form";
import { ArrowsClockwise, CaretLeft, CaretRight, Pencil, PlusCircle } from "phosphor-react";

// component
import { ModalChangeStatus } from "@/components/molecules/modals/ModalChangeStatus/ModalChangeStatus";
import { UploadImg } from "@/components/atoms/UploadImg/UploadImg";

import { InputForm } from "@/components/atoms/inputs/InputForm/InputForm";

import "./carrierformtab.scss";
import {
  _onSubmit,
  dataToProjectFormData,
  validationButtonText,
  CarrierFormTabProps
} from "./carrierFormTab.mapper";
import { ICarrier, IFormCarrier, IFormDriver } from "@/types/logistics/schema";
import { InputDateForm } from "@/components/atoms/inputs/InputDate/InputDateForm";
import { SelectDocument } from "@/components/molecules/logistics/SelectDocument/SelectDocument";
import { bloodTypes, SelectRh } from "@/components/molecules/logistics/SelectRh/SelectRh";
import { glasses, SelectGlasses } from "@/components/molecules/logistics/SelectGlasses/SelectGlasses";
import { UploadDocumentButton } from "@/components/atoms/UploadDocumentButton/UploadDocumentButton";
import { licences, SelectLCategory } from "@/components/molecules/logistics/SelectLicenceCategory/SelectLicenceCategory";
import useSWR from "swr";
import { getDocumentsByEntityType } from "@/services/logistics/certificates";
import { CertificateType } from "@/types/logistics/certificate/certificate";

const { Title, Text } = Typography;
const { Option } = Select;

export const CarrierFormTab = ({
  onEditProject = () => {},
  onSubmitForm = () => {},
  statusForm = "review",
  data = [] as ICarrier[],
  onActiveProject = () => {},
  onDesactivateProject = () => {}
}: CarrierFormTabProps) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { data: documentsType, isLoading: isLoadingDocuments } = useSWR(
    "0",
    getDocumentsByEntityType
  );

  const [imageFile, setImageFile] = useState<any | undefined>(undefined);
  const [loading, setloading] = useState(false);
  const [imageError, setImageError] = useState(false);

  const defaultValues = statusForm === "create" ? {} : dataToProjectFormData(data[0]);
  const {
    watch,
    setValue,
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty }
  } = useForm<IFormCarrier>({
    defaultValues,
    disabled: statusForm === "review"
  });

   /*archivos*/
   interface FileObject {
    docReference: string;
    file: File | undefined;
  }
  const [files, setFiles] = useState<FileObject[] | any[]>([]);

  const [mockFiles, setMockFiles] = useState<CertificateType[]>([]);

  /* if (mockFiles.length < 1) {
    setMockFiles([
      { id: 1, key: 1, title: "archivo 1", isMandatory: true },
      { id: 2, key: 2, title: "archivo 2", isMandatory: true },
      { id: 3, key: 3, title: "archivo 3", isMandatory: false }
    ]);
  } */
  const newfile = useRef<any>("");

  const AddFileModal = () => {
    Modal.info({
      title: "Agregar otro documento",
      content: (
        <Flex style={{ width: "100%" }}>
          <Row style={{ width: "100%" }}>
          <Text >
          Cargar documentos adicionales
          </Text>
            <Col span={24}>
              <Select
                mode="multiple"
                allowClear
                style={{ width: "100%" }}
                placeholder="Seleccione documentos"
                defaultValue={mockFiles?.map((document) => document.id.toString()) || []}
                loading={isLoadingDocuments}
                onChange={(value) => {
                  setMockFiles(documentsType?.filter((document) => value.includes(document.id.toString()))|| []);
                }}
                options={documentsType?.map((document) => ({
                  label: <span>{document.description}</span>,
                  value: document.id.toString()
                }))}
              />{/* 
              <label className="locationLabels" style={{ display: "flex", marginTop: "2rem" }}>
                <text>Nombre del documento</text>
              </label>
              <Input
                placeholder="Escribir nombre"
                onChange={(e) => {
                  newfile.current = e.target.value;
                }}
              /> */}
            </Col>
          </Row>
        </Flex>
      ),
      onOk: () => {/* 
        if (newfile.current.length <= 0) {
          message.error("Debe digitar un nombre de archivo");
        } else {
          const lastitem = mockFiles.at(-1);
          const newvalue = {
            id: lastitem != undefined ? lastitem.id + 1 : 1,
            key: lastitem != undefined ? lastitem.key + 1 : 1,
            title: newfile.current,
            isMandatory: false
          };
          setMockFiles((mockFiles) => [...mockFiles, newvalue]);
        } */
      }
    });
  };

  useEffect(()=>{
    console.log(files)
  }, [files])
  

  const onSubmit = (data: any) => {
    data.general.license_categorie = licences.data.find((item) => item.id === data.general.license_category)?.value;
    data.general.rh = bloodTypes.data.find((item) => item.id === data.general.rh)?.value;
    _onSubmit(
      data,
      setloading,
      setImageError,
      imageFile ? [{ docReference: "imagen", file: imageFile }] : undefined,
      files,
      onSubmitForm,
      reset
    );
  };
  return (
    <>
      <Form className="mainProyectsForm">
        <Flex component={"header"} className="headerProyectsForm">
          <Button
            type="text"
            size="large"
            href="/logistics/providers/all"
            className="buttonGoBack"
            icon={<CaretLeft size={"1.45rem"} />}
          >
            Ver Conductores
          </Button>
          <Flex gap={"1rem"}>
            {(statusForm === "review" || statusForm === "edit") && (
              <Button
                className="buttons"
                htmlType="button"
                onClick={(e) => {
                  e.preventDefault();
                  setIsOpenModal(true);
                }}
              >
                Cambiar Estado
                <ArrowsClockwise size={"1.2rem"} />
              </Button>
            )}
            {statusForm === "review" ? (
              <Button
                className="buttons -edit"
                htmlType="button"
                onClick={(e) => {
                  e.preventDefault();
                  onEditProject();
                }}
              >
                {validationButtonText(statusForm)}
                <Pencil size={"1.2rem"} />
              </Button>
            ) : (
              ""
            )}
          </Flex>
        </Flex>
        <Flex component={"main"} flex="1" vertical>
          <Row>
            <Col span={5}>
              {/* ------------Photo Driver-------------- */}
              <UploadImg
                disabled={statusForm === "review"}
                imgDefault={watch("general.photo") || "https://cdn.icon-icons.com/icons2/1622/PNG/512/3741756-bussiness-ecommerce-marketplace-onlinestore-store-user_108907.png"}
                setImgFile={setImageFile}
              />
              {imageError && <Text className="textError">{"foto del conductor es obligatorio *"}</Text>}
            </Col>
            <Col span={19}>
              <Title className="title" level={4}>
                Informacion General
              </Title>
              <Flex component={"section"} className="generalProject" justify="flex-start">
                <InputForm
                  titleInput="Nit"
                  nameInput="general.nit"
                  control={control}
                  error={undefined}
                />
                <InputForm
                  titleInput="Nombre"
                  nameInput="general.description"
                  control={control}
                  error={undefined}
                />
                <InputForm
                  titleInput="Tipo de proveedor"
                  nameInput="general.carrier_type"
                  control={control}
                  error={undefined}
                />
                 <InputForm
                  titleInput="Razon social"
                  nameInput="general.description"
                  control={control}
                  error={undefined}
                />
                <InputForm
                  titleInput="Correo de facturacion"
                  nameInput="general.description"
                  control={control}
                  error={undefined}
                />
                <InputForm
                  titleInput="Correo de Comunicacion"
                  nameInput="general.carrier_type"
                  control={control}
                  error={undefined}
                />
                </Flex>
            </Col>
          </Row>
          <Row>
            <Col span={5}>
            </Col>
          </Row>
          {/* -----------------------------------General--------------------------------------- */}

          {/* -----------------------------------Contact----------------------------------- */}
          <Title className="title" level={4}>
            Datos de Contacto
          </Title>
          <Flex component={"section"} className="generalProject" justify="flex-start">
            <InputForm
              titleInput="Nombres y apellidos"
              nameInput="general.description"
              control={control}
              error={errors?.general?.description}
            />
            <InputForm
              typeInput="tel"
              titleInput="Telefono"
              nameInput="general.description"
              control={control}
              error={errors?.general?.description}
              validationRules={{
                pattern: {
                  value: /^\+?\d+$/,
                  message: "Solo se permiten números y un signo '+' al comienzo"
                }
              }}
            />
          </Flex>
          <label className="locationLabels" style={{ display: 'flex', marginTop: '2rem' }}>
            <text>Documentos</text>
          </label>
          <Row className="mainUploadDocuments">
            {mockFiles.map((file) => (
              // eslint-disable-next-line react/jsx-key
              <Col span={12} style={{padding:'15px'}} key={`file-${file.id}`}>
                <UploadDocumentButton
                  key={file.id}
                  title={file.description}
                  isMandatory={file.optional.data.includes(1)}
                  aditionalData={file.id}
                  setFiles={setFiles}
                />
              </Col>
            ))}
          </Row>
          <Row>
            <Col span={24} className="text-right">
              <button onClick={() =>AddFileModal()} className="btnagregarpsl"><PlusCircle></PlusCircle>&nbsp;&nbsp;<text>Agregar otro documento</text></button>
            </Col>
          </Row>
          
          {/* -----------------------------------Project Config----------------------------------- */}

          <Flex className="buttonNewProject">
            {["edit", "create"].includes(statusForm) && (
              <Button
                disabled={!isDirty}
                className={`button ${isDirty ? "active" : ""}`}
                style={{ display: "flex" }}
                htmlType={"submit"}
                onClick={handleSubmit(onSubmit)}
              >
                {validationButtonText(statusForm)}
              </Button>
            )}
          </Flex>
        </Flex>
      </Form>
      <ModalChangeStatus
        isActiveStatus={true}
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        onActive={onActiveProject}
        onDesactivate={onDesactivateProject}
      />
    </>
  );
};
