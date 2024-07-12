import { useEffect, useState } from "react";
import { Button, Col, Flex, Row, Switch, Typography } from "antd";
import { Controller, useForm } from "react-hook-form";
import { ArrowsClockwise, Pencil, Plus } from "phosphor-react";

// components
import { ModalChangeStatus } from "@/components/molecules/modals/ModalChangeStatus/ModalChangeStatus";
import { UploadImg } from "@/components/atoms/UploadImg/UploadImg";

//interfaces
import { InputForm } from "@/components/atoms/inputs/InputForm/InputForm";

import {
  dataToVehicleFormData,
  validationButtonText,
  VehicleFormTabProps
} from "./vehicleFormTab.mapper";

import "./vehicleformtab.scss";
import { IFormVehicle, IVehicle, VehicleType } from "@/types/logistics/schema";
import { getDocumentsByEntityType } from "@/services/logistics/certificates";
import { CertificateType } from "@/types/logistics/certificate/certificate";
import useSWR from "swr";
import { SelectVehicleType } from "@/components/molecules/logistics/SelectVehicleType/SelectVehicleType";
import ModalDocuments from "@/components/molecules/modals/ModalDocuments/ModalDocuments";
import { addVehicle, getVehicleType } from "@/services/logistics/vehicle";
import { DocumentButtonAction } from "@/components/atoms/DocumentButtonAction/DocumentButtonAction";

const { Title, Text } = Typography;

type ImageKeys =
  | "general.image1"
  | "general.image2"
  | "general.image3"
  | "general.image4"
  | "general.image5";
interface ImageState {
  file: File | undefined;
}

export const VehicleFormTab = ({
  onEditVehicle = () => {},
  statusForm = "review",
  data = [] as IVehicle[],
  onActiveVehicle = () => {},
  onDesactivateVehicle = () => {}
}: VehicleFormTabProps) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isOpenModalDocuments, setIsOpenModalDocuments] = useState(false);

  const { data: documentsType, isLoading: isLoadingDocuments } = useSWR(
    "1",
    getDocumentsByEntityType
  );
  const { data: vehiclesTypesData, isLoading: loadingVicles } = useSWR(
    "/vehicle/type",
    getVehicleType
  );

  const [images, setImages] = useState<ImageState[]>(
    Array(5).fill({ file: undefined, error: false })
  );
  const defaultValues = statusForm === "create" ? {} : dataToVehicleFormData(data[0]);
  const {
    watch,
    control,
    handleSubmit,
    reset,
    getValues,
    formState: { errors, isDirty }
  } = useForm<IFormVehicle>({
    defaultValues,
    disabled: statusForm === "review"
  });

  useEffect(() => {
    console.log(errors);
  }, [errors]);

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

  const onSubmit = async (data: any) => {
    const hasImage = images.some((image) => image.file);
    if (!hasImage) return;

    const imageFiles = images
      .map((image, index) =>
        image.file ? { docReference: `imagen${index + 1}`, file: image.file } : undefined
      )
      .filter(Boolean) as { docReference: string; file: File }[];

    const vehicleData: any = {
      ...data.general,
      id_carrier: Number(data.general.id_carrier) || 14
    };

    console.log({
      general: vehicleData,
      images: imageFiles,
      files: files
    });

    try {
      const response = await addVehicle(vehicleData, imageFiles, files);
      console.log("Vehicle created successfully:", response.data);
      // Optionally reset the form and images after successful submission
      setImages(Array(5).fill({ file: undefined }));
      reset();
    } catch (error) {
      console.log("Error creating vehicle:", error);
    }
  };

  const getImageKey = (index: number): ImageKeys => {
    return `general.image${index}` as ImageKeys;
  };

  const convertToSelectOptions = (vehicleTypes: VehicleType[]) => {
    return vehicleTypes?.map((vehicleType) => ({
      label: vehicleType.description,
      value: vehicleType.id.toString()
    }));
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
                    setImgFile={(file) =>
                      setImages((prev) =>
                        prev.map((img, index) => (index === 0 ? { ...img, file } : img))
                      )
                    }
                  />
                </Col>
                {images.slice(1).map((image, index) => (
                  <Col span={6} className="colfotomin" key={index + 1}>
                    <UploadImg
                      disabled={statusForm === "review"}
                      imgDefault={getValues(getImageKey(index + 1))}
                      setImgFile={(file) =>
                        setImages((prev) =>
                          prev.map((img, imgIndex) =>
                            imgIndex === index + 1 ? { ...img, file } : img
                          )
                        )
                      }
                    />
                  </Col>
                ))}
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
                    name="general.id_vehicle_type"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <SelectVehicleType
                        errors={errors}
                        field={field}
                        options={convertToSelectOptions((vehiclesTypesData?.data as any) || [])}
                        loading={loadingVicles}
                      />
                    )}
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
          <Row className="clientDocuments" gutter={16}>
            {files?.map((document, index) => (
              <Col key={`${index}${document.name}`} span={6}>
                <DocumentButtonAction
                  documentUrl={document.file ? URL.createObjectURL(document.file) : ""}
                />
              </Col>
            ))}
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
