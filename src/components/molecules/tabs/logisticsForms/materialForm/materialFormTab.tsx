import { useEffect, useState } from "react";
import {
  Button,
  Col,
  Flex,
  Form,
  Row,
  Typography,
  Image
} from "antd";
import { Controller, useForm } from "react-hook-form";
import { ArrowsClockwise, CaretLeft, Pencil } from "phosphor-react";

// components
import { ModalChangeStatus } from "@/components/molecules/modals/ModalChangeStatus/ModalChangeStatus";
import { UploadImg } from "@/components/atoms/UploadImg/UploadImg";
import { InputForm } from "@/components/atoms/inputs/InputForm/InputForm";

import "./materialformtab.scss";
import {
  _onSubmit,
  dataToProjectFormData,
  validationButtonText,
  MaterialFormTabProps
} from "./materialFormTab.mapper";
import {  IFormMaterial, IMaterialType, IMaterialTransportType, IMaterialTransportByMaterial, CustomFile } from "@/types/logistics/schema";
import { InputDateForm } from "@/components/atoms/inputs/InputDate/InputDateForm";

import {
  FileObject,
  UploadDocumentButton
} from "@/components/atoms/UploadDocumentButton/UploadDocumentButton";

import useSWR from "swr";
import { getDocumentsByEntityType } from "@/services/logistics/certificates";
import { DocumentCompleteType } from "@/types/logistics/certificate/certificate";
import ModalDocuments from "@/components/molecules/modals/ModalDocuments/ModalDocuments";
import { getAllMaterialType, getAllMaterialTransportType } from "@/services/logistics/materials";
import Link from "next/link";
import dayjs from "dayjs";
import SubmitFormButton from "@/components/atoms/SubmitFormButton/SubmitFormButton";
import MultiSelectTags from "@/components/ui/multi-select-tags/MultiSelectTags";

const { Title, Text } = Typography;

interface OptionType {
  value: number;
  label: string;
}

export const MaterialFormTab = ({
  onEditProject = () => {},
  onSubmitForm = () => {},
  statusForm = "review",
  data,
  params,
  handleFormState = () => {},
  onActiveMaterial = () => {},
  onDesactivateMaterial = () => {},
}: MaterialFormTabProps) => {

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenModalDocuments, setIsOpenModalDocuments] = useState(false);
  const { data: documentsType, isLoading: isLoadingDocuments } = useSWR(
    "2",
    getDocumentsByEntityType
  );

  const { data: materialsTypesData, isLoading: loadingMaterialsTypes } = useSWR(
    "materialtypes",
    getAllMaterialType
  );

  const { data: materialsTransportTypesData, isLoading: loadingMaterialsTransportTypes } = useSWR(
    "materialtransporttypes",
    getAllMaterialTransportType
  );

  const [imageFile, setImageFile] = useState<any | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [imageError, setImageError] = useState(false);

  const [selectedFiles, setSelectedFiles] = useState<DocumentCompleteType[]>([]);

  interface ImageState {
    file: File | undefined;
  }

  const [images, setImages] = useState<ImageState[]>(
    Array(5).fill({ file: undefined, error: false })
  );

  const defaultValues = statusForm === "create" ? {} : dataToProjectFormData(data);
  const {
    watch,
    setValue,
    getValues,
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid }
  } = useForm<IFormMaterial>({
    defaultValues,
    disabled: statusForm === "review"
  });

  const formImages = watch("images");

  const hasImages = () => {
    return images.some((img) => img.file) || (formImages && formImages.length > 0);
  };
  const isFormCompleted = () => {
    return isValid && hasImages();
  };

  const isSubmitButtonEnabled = isFormCompleted() && !loading;
  /*archivos*/

  const [files, setFiles] = useState<(FileObject & { aditionalData?: any })[]>([]);

  useEffect(() => {
    if (Array.isArray(documentsType)) {
      const isFirstLoad = data?.documents?.length && selectedFiles.length === 0;
      if (isFirstLoad) {
        const docsWithLink =
          documentsType
            ?.filter((f) => data.documents?.find((d) => d.id_document_type === f.id))
            .map((f) => ({
              ...f,
              file: undefined,
              link: data.documents?.find((d) => d.id_document_type === f.id)?.url_archive,
              expirationDate: dayjs(
                data.documents?.find((d) => d.id_document_type === f.id)?.expiration_date
              )
            })) || [];
        setSelectedFiles(docsWithLink);
      } else {
        const documentsFiltered = documentsType?.filter(
          (f) => !f?.optional || selectedFiles?.find((f2) => f2.id === f.id)
        );
        const docsWithFile = documentsFiltered.map((f) => {
          const prevFile = selectedFiles.find((f2) => f2.id === f.id);
          return {
            ...f,
            link: prevFile?.link || undefined,
            file: prevFile?.link ? undefined : files.find((f2) => f2.aditionalData === f.id)?.file,
            expirationDate: prevFile?.expirationDate
          };
        });
        if (docsWithFile?.length) {
          setSelectedFiles([...docsWithFile]);
        } else {
          setSelectedFiles([]);
        }
      }
    }
  }, [files, documentsType]);

  useEffect(() => {
    if (statusForm === "review"){
      if (Array.isArray(documentsType)) {
        const docsWithLink =
          documentsType
            ?.filter((f) => data?.documents?.find((d) => d.id_document_type === f.id))
            .map((f) => ({
              ...f,
              file: undefined,
              link: data?.documents?.find((d) => d.id_document_type === f.id)?.url_archive,
              expirationDate: dayjs(
                data?.documents?.find((d) => d.id_document_type === f.id)?.expiration_date
              )
            })) || [];
        setSelectedFiles(docsWithLink);
      }
    }
  }, [statusForm]);

  const convertToSelectOptions = (materialTypes: IMaterialType[]) => {
    if (!Array.isArray(materialTypes)) return [];
    return materialTypes?.map((materialType) => ({
      label: materialType.description,
      value: materialType.id
    }));
  };

  const convertToSelectOptionsData = (materialTypes: IMaterialType[]) => {
    if (materialTypes.length == 0) return [];
    let results:OptionType[] = []
    data?.material_type.forEach(matty => {
      let matfilter = materialTypes?.filter(f => f.id == matty.id_material_type);
      let option: OptionType={
        value: matfilter[0].id,
        label: matfilter[0].description
      }
      results.push(option);
    });
    return results;
  };

  const convertToSelectOptionsTransport = (materialTransportTypes: IMaterialTransportType[]) => {
    if (!Array.isArray(materialTransportTypes)) return [];
    return materialTransportTypes?.map((materialTransportType) => ({
      label: materialTransportType.description,
      value: materialTransportType.id
    }));
  };

  const convertToSelectOptionsTransportData = (materialTransportTypes: IMaterialTransportType[]) => {
    if (materialTransportTypes.length == 0) return [];
    let results:OptionType[] = []
    data?.material_transport.forEach(mattr => {
      let matfilter = materialTransportTypes?.filter(f => f.id == mattr.id_material_transport_type);
      let option: OptionType={
        value: matfilter[0].id,
        label: matfilter[0].description
      }
      results.push(option);
    });
    return results;
  };

  const handleChangeExpirationDate = (index: number, value: any) => {
    setSelectedFiles((prevState: any[]) => {
      const updatedFiles = [...prevState];
      updatedFiles[index].expirationDate = value;
      return updatedFiles;
    });
  };

  const handleChange = (value: string[]) => {
    const sf = documentsType?.filter((file) => value.includes(file.id.toString()));
    if (sf) {
      setSelectedFiles((prevState) => {
        return sf.map((file) => {
          const prevFile = prevState.find((f) => f.id === file.id);
          return {
            ...file,
            file: prevFile?.link ? undefined : prevFile?.file,
            link: prevFile?.link || undefined,
            expirationDate: prevFile?.expirationDate
          };
        });
      });
    }
  };

  const onSubmit = async (data: any) => {

    const hasImage = data.images.length > 0;
    if (!hasImage){
      setImageError(true);
      return;
    } 

    const formImages = [...data.images]
    setImages(Array(5).fill({ file: undefined }));
    _onSubmit(
      data,
      selectedFiles,
      formImages,
      setImageError,
      setLoading,
      onSubmitForm
    );
  };

  return (
    <>
      <Form className="materialFormTab">
        <Flex component={"header"} className="headerProyectsForm">
          <Link href={`/logistics/configuration`} passHref>
            <Button
              type="text"
              size="large"
              className="buttonGoBack"
              icon={<CaretLeft size={"1.45rem"} />}
            >
              Ver Materiales
            </Button>
          </Link>
          <Flex gap={"1rem"}>
            {(statusForm === "review" || statusForm === "edit") && (
              <Button
                className="buttons"
                htmlType="button"
                disabled={statusForm === "review"}
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
                  handleFormState("edit");
                  e.preventDefault();
                }}
              >
                {validationButtonText(statusForm)}
                <Pencil size={"1.2rem"} />
              </Button>
            ) : (
              ""
            )}
            {statusForm === "edit" ? (
              <Button
                className="buttons -edit"
                htmlType="button"
                onClick={(e) => {
                  handleFormState("review");
                  e.preventDefault();
                  reset();
                }}
              >
                {"Cancelar edición"}
              </Button>
            ) : (
              ""
            )}
          </Flex>
        </Flex>
        <Flex component={"main"} flex="1" vertical style={{ paddingRight: "1rem" }}>
          <Row gutter={[16, 16]}>
            <Col span={6}>
              {" "}
              {/* Columna Fotos del Vehiculo */}
              <Title className="title" level={4}>
                Fotos del material
              </Title>
              {/* ------------Image Project-------------- */}
              <Row>
                <Col span={24} className="colfoto">
                  <UploadImg
                      disabled={statusForm === "review"}
                      imgDefault={formImages ? formImages[0]?.url_archive : undefined}
                      setImgFile={(file) => {
                        const currentUrlArchive = formImages ? formImages[0]?.url_archive : undefined; // obtener el valor actual de url_archive
                        if (currentUrlArchive) {
                          (file as any).url_archive = currentUrlArchive;
                          setValue(`images.${0}`, file);
                        } else {
                          setValue(`images.${0}`, file);
                        }
                        setImages((prev) =>
                          prev.map((img, index) => (index === 0 ? { ...img, file } : img))
                        );
                        if (file) {
                          //console.log(file)
                          setImageError(false);
                        }
                      }}
                    />
                    {imageError && (                    
                      <Text className="textError">{"Al menos 1 imagen debe ser cargada *"}</Text>
                    )}
                </Col>
              </Row>
              <Row gutter={16}>
                {images.slice(1).map((image, index) => (
                  <Col xs={24} sm={12} lg={6} className="colfotomin" key={index + 1}>
                    <UploadImg
                      disabled={statusForm === "review"}
                      imgDefault={formImages ? formImages[index + 1]?.url_archive : undefined}
                      setImgFile={(file) => {
                        const currentUrlArchive = formImages
                          ? formImages[index + 1]?.url_archive
                          : undefined; // obtener el valor actual de url_archive
                        if (currentUrlArchive) {
                          (file as any).url_archive = currentUrlArchive;
                          setValue(`images.${index + 1}`, file);
                        } else {
                          setValue(`images.${index + 1}`, file);
                        }
                        setImages((prev) =>
                          prev.map((img, imgIndex) =>
                            imgIndex === index + 1 ? { ...img, file } : img
                          )
                        );
                        // if (file) {
                        //   setImageError(false);
                        // }
                      }}
                    />
                  </Col>
                ))}
              </Row>
            </Col>
            <Col span={18}>
              {" "}
              {/* Columna Informacion general*/}
              <Row>
                <Col span={24}>
                  <Title className="title" level={4}>
                    Datos del material
                  </Title>
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                {" "}
                {/* Fila campos info gral*/}
                <Col span={12}>
                  <InputForm
                    titleInput="Código"
                    nameInput="general.code_sku"
                    control={control}
                    error={errors?.general?.code_sku}
                  />
                </Col>
                <Col span={12}>
                  <InputForm
                    titleInput="Nombre"
                    nameInput="general.description"
                    control={control}
                    error={errors?.general?.description}
                  />
                </Col>
                <Col span={6}>
                  <InputForm                  
                    typeInput="number"
                    titleInput="Alto (m)"
                    nameInput="general.mt_height"
                    control={control}
                    error={errors?.general?.mt_height}
                  />
                </Col>
                <Col span={6}>
                  <InputForm
                    typeInput="number"
                    titleInput="Largo (m)"
                    nameInput="general.mt_width"
                    control={control}
                    error={errors?.general?.mt_width}
                  />
                </Col>
                <Col span={6}>
                  <InputForm
                    typeInput="number"
                    titleInput="Ancho (m)"
                    nameInput="general.mt_length"
                    control={control}
                    error={errors?.general?.mt_length}
                  />
                </Col>
                <Col span={6}>
                  <InputForm
                    typeInput="number"
                    titleInput="Peso (kg)"
                    nameInput="general.kg_weight"
                    control={control}
                    error={errors?.general?.kg_weight}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
          {/* ----------------------------------Vehiculos--------------------------------- */}

          <Row style={{ width: "100%", marginTop: "2rem" }}>
              <Col span={24}>
                <Title className="title" level={4}>
                  Características
                </Title>
                <Row style={{ width: "100%", marginTop: "2rem" }}>
                  <Col span={24}>
                    <Controller
                      name="general.material_transport"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => 
                        <MultiSelectTags
                          field={field}
                          placeholder="Seleccionar"
                          title="Características de transporte"
                          errors={errors?.general?.material_transport}
                          defaultValue={convertToSelectOptionsTransportData((materialsTransportTypesData?.data.data as any) || [])}
                          options={convertToSelectOptionsTransport((materialsTransportTypesData?.data.data as any) || [])}
                          disabled={statusForm === "review"} 
                        />
                      }
                    />
                  </Col>
                  <Col span={24}>
                    <Controller
                      name="general.material_type"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => 
                        <MultiSelectTags
                          field={field}
                          placeholder="Seleccionar"
                          title="Características de seguridad"
                          errors={errors?.general?.material_type}
                          defaultValue={convertToSelectOptionsData((materialsTypesData?.data.data as any) || [])}
                          options={convertToSelectOptions((materialsTypesData?.data.data as any) || [])}
                          disabled={statusForm === "review"} 
                        />
                      }
                    />
                  </Col>                  
                </Row>
              </Col>              
          </Row>

          {["edit", "create"].includes(statusForm) && (
            <Row justify={"end"}>
              <SubmitFormButton
                text={validationButtonText(statusForm)}
                disabled={!isSubmitButtonEnabled}
                onClick={handleSubmit(onSubmit)}
              />
            </Row>
          )}
        </Flex>
      </Form>
      <ModalChangeStatus
        isActiveStatus={true}
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        onActive={onActiveMaterial}
        onDesactivate={onDesactivateMaterial}
      />
      <ModalDocuments
        isOpen={isOpenModalDocuments}
        mockFiles={selectedFiles}
        setFiles={setFiles}
        documentsType={documentsType}
        isLoadingDocuments={isLoadingDocuments}
        onClose={() => setIsOpenModalDocuments(false)}
        handleChange={handleChange}
        handleChangeExpirationDate={handleChangeExpirationDate}
        setSelectedFiles={setSelectedFiles}
      />
    </>
  );
};
