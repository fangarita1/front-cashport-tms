import { useEffect, useRef, useState } from "react";
import { Button, Col, ColorPicker, Flex, Form, Modal, Row, Select, Switch, Typography } from "antd";
import { Controller, useForm } from "react-hook-form";
import { ArrowsClockwise, CaretLeft, Pencil, Plus, PlusCircle } from "phosphor-react";

// components
import { SelectCurrencies } from "@/components/molecules/selects/SelectCurrencies/SelectCurrencies";
import { ModalChangeStatus } from "@/components/molecules/modals/ModalChangeStatus/ModalChangeStatus";
import { UploadImg } from "@/components/atoms/UploadImg/UploadImg";

//interfaces
import { InputForm } from "@/components/atoms/inputs/InputForm/InputForm";

import {
  _onSubmit,
  dataToVehicleFormData,
  validationButtonText,
  VehicleFormTabProps
} from "./vehicleFormTab.mapper";

import "./vehicleformtab.scss";
import { IFormVehicle, IVehicle } from "@/types/logistics/schema";
import { getDocumentsByEntityType } from "@/services/logistics/certificates";
import { CertificateType } from "@/types/logistics/certificate/certificate";
import useSWR from "swr";
import { SelectVehicleType } from "@/components/molecules/logistics/SelectVehicleType/SelectVehicleType";
import { UploadDocumentButton } from "@/components/atoms/UploadDocumentButton/UploadDocumentButton";
import ModalDocuments from "@/components/molecules/modals/ModalDocuments/ModalDocuments";

const { Title, Text } = Typography;
const { Option } = Select;

export const VehicleFormTab = ({
  onEditVehicle = () => {},
  onSubmitForm = () => {},
  statusForm = "review",
  data = [] as IVehicle[],
  onActiveVehicle = () => {},
  onDesactivateVehicle = () => {}
}: VehicleFormTabProps) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [loading, setloading] = useState(false);
  const [isOpenModalDocuments, setIsOpenModalDocuments] = useState(false);

  const { data: documentsType, isLoading: isLoadingDocuments } = useSWR(
    "0",
    getDocumentsByEntityType
  );

  const [imageFile1, setImageFile1] = useState<any | undefined>(undefined);
  const [imageError1, setImageError1] = useState(false);
  const [imageFile2, setImageFile2] = useState<any | undefined>(undefined);
  const [imageError2, setImageError2] = useState(false);
  const [imageFile3, setImageFile3] = useState<any | undefined>(undefined);
  const [imageError3, setImageError3] = useState(false);
  const [imageFile4, setImageFile4] = useState<any | undefined>(undefined);
  const [imageError4, setImageError4] = useState(false);
  const [imageFile5, setImageFile5] = useState<any | undefined>(undefined);
  const [imageError5, setImageError5] = useState(false);

  const defaultValues = statusForm === "create" ? {} : dataToVehicleFormData(data[0]);
  const {
    watch,
    setValue,
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty }
  } = useForm<IFormVehicle>({
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
            <Text>Cargar documentos adicionales</Text>
            <Col span={24}>
              <Row style={{ width: "100%" }}>
                {mockFiles.map((file) => (
                  // eslint-disable-next-line react/jsx-key
                  <Col span={12} style={{ padding: "15px" }} key={`file-${file.id}`}>
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
            </Col>
            <Col span={24}>
              <Select
                mode="multiple"
                allowClear
                style={{ width: "100%" }}
                placeholder="Seleccione documentos"
                defaultValue={mockFiles?.map((document) => document.id.toString()) || []}
                loading={isLoadingDocuments}
                onChange={(value) => {
                  setMockFiles(
                    documentsType?.filter((document) => value.includes(document.id.toString())) ||
                      []
                  );
                }}
                options={documentsType?.map((document) => ({
                  label: <span>{document.description}</span>,
                  value: document.id.toString()
                }))}
              />
              {/* 
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
      onOk: () => {
        /* 
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

  useEffect(() => {
    console.log(files);
  }, [files]);

  const onSubmit = (data: any) => {
    if (!imageFile1) return setImageError1(true);
    setImageError1(false);

    _onSubmit(
      data,
      setloading,
      setImageError1,
      imageFile1 ? [{ docReference: "imagen1", file: imageFile1 }] : undefined,
      setImageError2,
      imageFile2 ? [{ docReference: "imagen2", file: imageFile2 }] : undefined,
      setImageError3,
      imageFile3 ? [{ docReference: "imagen3", file: imageFile3 }] : undefined,
      setImageError4,
      imageFile4 ? [{ docReference: "imagen4", file: imageFile4 }] : undefined,
      setImageError5,
      imageFile5 ? [{ docReference: "imagen5", file: imageFile5 }] : undefined,
      files,
      onSubmitForm,
      reset
    );
  };
  return (
    <>
      <form className="mainProyectsForm" onSubmit={handleSubmit(onSubmit)}>
        <Flex component={"header"} className="headerProyectsForm">
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
                className="buttons"
                htmlType="button"
                onClick={(e) => {
                  e.preventDefault();
                  onEditVehicle();
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
        <Flex component={"main"} flex="3" vertical>
          <Row>
            <Col span={6}>
              <Title className="title" level={4}>
                Fotos de vehículo
              </Title>
              {/* ------------Image Project-------------- */}
              <Row>
                <Col span={24} className="colfoto">
                  <UploadImg
                    disabled={statusForm === "review"}
                    imgDefault={watch("general.image1")}
                    setImgFile={setImageFile1}
                  />
                </Col>
                <Col span={6} className="colfotomin">
                  <UploadImg
                    disabled={statusForm === "review"}
                    imgDefault={watch("general.image2")}
                    setImgFile={setImageFile2}
                  />
                </Col>
                <Col span={6} className="colfotomin">
                  <UploadImg
                    disabled={statusForm === "review"}
                    imgDefault={watch("general.image3")}
                    setImgFile={setImageFile3}
                  />
                </Col>
                <Col span={6} className="colfotomin">
                  <UploadImg
                    disabled={statusForm === "review"}
                    imgDefault={watch("general.image4")}
                    setImgFile={setImageFile4}
                  />
                </Col>
                <Col span={6} className="colfotomin">
                  <UploadImg
                    disabled={statusForm === "review"}
                    imgDefault={watch("general.image5")}
                    setImgFile={setImageFile5}
                  />
                </Col>
              </Row>
            </Col>
            <Col span={18}>
              <Title className="title" level={4}>
                Informacion General
              </Title>
              <Flex component={"section"} className="generalProject" justify="flex-start">
                <Flex vertical className="containerInput">
                  <Title className="title" level={5}>
                    Tipo de Vehiculo
                  </Title>
                  <Controller
                    name="general.vehicle_type"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => <SelectVehicleType errors={errors} field={field} />}
                  />
                  <Text className="textError">
                    {errors?.general?.vehicle_type && "Tipo es obligatorio *"}
                  </Text>
                </Flex>
                <InputForm
                  titleInput="Placa"
                  nameInput="general.plate_number"
                  control={control}
                  error={errors.general?.plate_number}
                />
                <InputForm
                  titleInput="Marca"
                  nameInput="general.brand"
                  control={control}
                  error={errors?.general?.brand}
                />
                <InputForm
                  titleInput="Modelo"
                  nameInput="general.model"
                  control={control}
                  error={errors?.general?.model}
                />
                <InputForm
                  titleInput="Linea"
                  nameInput="general.line"
                  control={control}
                  error={errors.general?.line}
                />
                <InputForm
                  titleInput="Año"
                  nameInput="general.year"
                  control={control}
                  error={undefined}
                  // error={errors.general?.year}
                />
                <InputForm
                  titleInput="Color"
                  nameInput="general.color"
                  control={control}
                  error={errors.general?.color}
                />
                <InputForm
                  titleInput="Ciudad"
                  nameInput="general.country"
                  control={control}
                  error={errors.general?.country}
                />
              </Flex>
              <Flex
                component={"section"}
                className="generalProject"
                justify="flex-start"
                style={{ marginTop: "2rem" }}
              >
                <Switch defaultChecked />{" "}
                <h5 className="ant-typography input-form-title">&nbsp;&nbsp;Equipado por GPS</h5>
              </Flex>
              <Flex
                component={"section"}
                className="generalProject"
                justify="flex-start"
                style={{ marginTop: "2rem" }}
              >
                <InputForm
                  titleInput="Usuario"
                  nameInput="general.gps_user"
                  control={control}
                  error={errors.general?.gps_user}
                />
                <InputForm
                  titleInput="Contraseña"
                  nameInput="general.gps_password"
                  control={control}
                  error={errors.general?.gps_password}
                />
                <InputForm
                  titleInput="Link"
                  nameInput="general.gps_link"
                  control={control}
                  error={errors.general?.gps_link}
                />
              </Flex>
            </Col>
            <Col span={24}>
              <Title className="title" level={4}>
                Informacion Adicional
              </Title>
              <InputForm
                placeholder="Escribir información adicional"
                titleInput=""
                nameInput="general.aditional_info"
                control={control}
                error={errors.general?.aditional_info}
              />
            </Col>
            <Col span={24} className="text-right">
              <ModalDocuments
                isOpen={isOpenModalDocuments}
                mockFiles={mockFiles}
                setFiles={setFiles}
                setMockFiles={setMockFiles}
                documentsType={documentsType}
                isLoadingDocuments={isLoadingDocuments}
                onClose={() => setIsOpenModalDocuments(false)}
              />
              <Row>
                <Flex justify="flex-end" style={{ width: "100%", margin: "1rem" }}>
                  <Button type="text" onClick={() => setIsOpenModalDocuments(true)}>
                    <Plus />
                    &nbsp;<Text>Cargar documentos</Text>
                  </Button>
                </Flex>
              </Row>
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
      </form>
      <ModalChangeStatus
        isActiveStatus={true}
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        onActive={onActiveVehicle}
        onDesactivate={onDesactivateVehicle}
      />
    </>
  );
};
