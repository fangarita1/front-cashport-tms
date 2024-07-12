import { useEffect, useRef, useState } from "react";
import {
  Button,
  Col,
  ColorPicker,
  Flex,
  Form,
  Input,
  message,
  Modal,
  Row,
  Select,
  Typography
} from "antd";
import { Controller, useForm } from "react-hook-form";
import { ArrowsClockwise, CaretLeft, CaretRight, Pencil, Plus, PlusCircle } from "phosphor-react";

// components
import { SelectCountries } from "@/components/molecules/selects/SelectCountries/SelectCountries";
import { SelectCurrencies } from "@/components/molecules/selects/SelectCurrencies/SelectCurrencies";
import { ModalChangeStatus } from "@/components/molecules/modals/ModalChangeStatus/ModalChangeStatus";
import { IFormProject } from "@/types/projects/IFormProject";
import { UploadImg } from "@/components/atoms/UploadImg/UploadImg";

import { InputForm } from "@/components/atoms/inputs/InputForm/InputForm";

import "./driverformtab.scss";
import { IBillingPeriodForm } from "@/types/billingPeriod/IBillingPeriod";
import {
  _onSubmit,
  dataToProjectFormData,
  validationButtonText,
  DriverFormTabProps
} from "./driverFormTab.mapper";
import { IDriver, IFormDriver, VehicleType } from "@/types/logistics/schema";
import { InputDateForm } from "@/components/atoms/inputs/InputDate/InputDateForm";
import { SelectDocument } from "@/components/molecules/logistics/SelectDocument/SelectDocument";
import { bloodTypes, SelectRh } from "@/components/molecules/logistics/SelectRh/SelectRh";
import {
  glasses,
  SelectGlasses
} from "@/components/molecules/logistics/SelectGlasses/SelectGlasses";
import { UploadDocumentButton } from "@/components/atoms/UploadDocumentButton/UploadDocumentButton";
import {
  licences,
  SelectLCategory
} from "@/components/molecules/logistics/SelectLicenceCategory/SelectLicenceCategory";
import useSWR from "swr";
import { getDocumentsByEntityType } from "@/services/logistics/certificates";
import { CertificateType } from "@/types/logistics/certificate/certificate";
import ModalDocuments from "@/components/molecules/modals/ModalDocuments/ModalDocuments";
import { getVehicleType } from "@/services/logistics/vehicle";

const { Title, Text } = Typography;

export const DriverFormTab = ({
  onEditProject = () => {},
  onSubmitForm = () => {},
  statusForm = "review",
  data = [] as IDriver[],
  onActiveProject = () => {},
  onDesactivateProject = () => {}
}: DriverFormTabProps) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenModalDocuments, setIsOpenModalDocuments] = useState(false);
  const { data: documentsType, isLoading: isLoadingDocuments } = useSWR(
    "2",
    getDocumentsByEntityType
  );

  const { data: vehiclesTypesData, isLoading: loadingVicles } = useSWR(
    "/vehicle/type",
    getVehicleType
  );

  const [imageFile, setImageFile] = useState<any | undefined>(undefined);
  const [loading, setloading] = useState(false);
  const [imageError, setImageError] = useState(false);

  const defaultValues = statusForm === "create" ? {} : dataToProjectFormData(data[0]);
  const {
    watch,
    setValue,
    getValues,
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty }
  } = useForm<IFormDriver>({
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

  useEffect(() => {
    console.log(files);
  }, [files]);

  const convertToSelectOptions = (vehicleTypes: VehicleType[]) => {
    if (!Array.isArray(vehicleTypes)) return [];
    return vehicleTypes?.map((vehicleType) => ({
      label: vehicleType.description,
      value: vehicleType.id.toString()
    }));
  };

  const onSubmit = (data: any) => {
    data.general.license_categorie = licences.data.find(
      (item) => item.id === data.general.license_category
    )?.value;
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
                imgDefault={
                  watch("general.photo") ||
                  "https://cdn.icon-icons.com/icons2/1622/PNG/512/3741756-bussiness-ecommerce-marketplace-onlinestore-store-user_108907.png"
                }
                setImgFile={setImageFile}
              />
              {imageError && (
                <Text className="textError">{"foto del conductor es obligatorio *"}</Text>
              )}
            </Col>
            <Col span={19}>
              <Title className="title" level={4}>
                Informacion General
              </Title>
              <Flex component={"section"} className="generalProject" justify="flex-start">
                <InputForm
                  titleInput="Nombres"
                  nameInput="general.name"
                  control={control}
                  error={undefined}
                />
                <InputForm
                  titleInput="Apellidos"
                  nameInput="general.last_name"
                  control={control}
                  error={undefined}
                />
                <Flex vertical className="containerInput">
                  <Title className="title" level={5}>
                    Tipo de Sangre
                  </Title>
                  <Controller
                    name="general.rh"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => <SelectRh errors={errors} field={field} />}
                  />
                </Flex>
                <Flex vertical className="containerInput">
                  <InputDateForm
                    titleInput="Fecha de nacimiento"
                    nameInput="general.birth_date"
                    placeholder="Seleccionar fecha de nacimiento"
                    control={control}
                    error={undefined}
                  />
                </Flex>
                <Flex vertical className="containerInput">
                  <Title className="title" level={5}>
                    Tipo de documento
                  </Title>
                  <Controller
                    name="general.document_type"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => <SelectDocument errors={errors} field={field} />}
                  />
                </Flex>
                <InputForm
                  titleInput="Numero de documento"
                  nameInput="general.document"
                  control={control}
                  error={undefined}
                />
                <InputForm
                  titleInput="Telefono"
                  nameInput="general.phone"
                  control={control}
                  error={errors?.general?.phone}
                />
                <InputForm
                  titleInput="Correo"
                  nameInput="general.email"
                  control={control}
                  error={errors?.general?.email}
                />
                <Flex vertical className="containerInput">
                  <Title className="title" level={5}>
                    Usas lentes
                  </Title>
                  <Controller
                    name="general.glasses"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <SelectGlasses errors={errors.general?.glasses} field={field} />
                    )}
                  />
                </Flex>
              </Flex>
            </Col>
          </Row>
          <Row>
            <Col span={5}></Col>
            <Col span={19}>
              <Title className="title" level={4}>
                Datos de la licencia
              </Title>
              <Flex component={"section"} className="generalProject" justify="flex-start">
                <InputForm
                  titleInput="Licencia"
                  nameInput="general.license"
                  control={control}
                  error={errors?.general?.license}
                />
                <Flex vertical className="containerInput">
                  <Title className="title" level={5}>
                    Categoria
                  </Title>
                  <Controller
                    name="general.license_category"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <SelectLCategory errors={errors?.general?.license_category} field={field} />
                    )}
                  />
                </Flex>
                <Flex vertical className="containerInput">
                  <InputDateForm
                    titleInput="Fecha de expiración"
                    nameInput="general.license_expiration"
                    placeholder="Seleccionar fecha de expiración"
                    control={control}
                    validationRules={{ required: true }}
                    error={errors?.general?.license_expiration}
                  />
                </Flex>
              </Flex>
            </Col>
          </Row>
          {/* -----------------------------------General--------------------------------------- */}

          <Title className="title" level={4}>
            Vehiculos
          </Title>
          <Row style={{ width: "100%" }}>
            <Col span={24}>
              <Flex component={"section"} className="containerInput" style={{ width: "100%" }}>
                <Row style={{ width: "100%" }}>
                  <Col span={8}>
                    <label className="input-form-title">
                      Vehículos que está autorizados a manejar
                    </label>
                  </Col>
                  <Col span={16}>
                    <Select
                      mode="multiple"
                      allowClear
                      style={{ width: "50%" }}
                      placeholder="Seleccione vehiculos"
                      loading={loadingVicles}
                      defaultValue={getValues("general.vehicle_type")?.map(
                        (i: any) => i.id_vehicle_type.toString()
                      )}
                      onChange={(value) => setValue("general.vehicle_type", value.map(Number))}
                      options={convertToSelectOptions((vehiclesTypesData?.data as any) || [])}
                    />
                  </Col>
                </Row>
              </Flex>
            </Col>
          </Row>

          {/* -----------------------------------Contact----------------------------------- */}
          <Title className="title" level={4}>
            Datos de Contacto
          </Title>
          <Flex component={"section"} className="generalProject" justify="flex-start">
            <InputForm
              titleInput="Nombres y apellidos"
              nameInput="general.emergency_contact"
              control={control}
              error={errors?.general?.emergency_contact}
            />
            <InputForm
              typeInput="tel"
              titleInput="Telefono"
              nameInput="general.emergency_number"
              control={control}
              error={errors?.general?.emergency_number}
              validationRules={{
                pattern: {
                  value: /^\+?\d+$/,
                  message: "Solo se permiten números y un signo '+' al comienzo"
                }
              }}
            />
          </Flex>
          <label className="locationLabels" style={{ display: "flex", marginTop: "2rem" }}>
            <text>Documentos</text>
          </label>
          <Row className="mainUploadDocuments">
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
          <Row>
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
