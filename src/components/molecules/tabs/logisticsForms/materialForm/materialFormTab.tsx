import { useEffect, useState } from "react";
import {
  Button,
  Col,
  Flex,
  Form,
  Row,
  Typography
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
  MaterialFormTabProps,
} from "./materialFormTab.mapper";
import {  IFormMaterial, IMaterialType, IMaterialTransportType } from "@/types/logistics/schema";
import { InputDateForm } from "@/components/atoms/inputs/InputDate/InputDateForm";

import { UploadDocumentButton } from "@/components/atoms/UploadDocumentButton/UploadDocumentButton";

import useSWR from "swr";
import { getDocumentsByEntityType } from "@/services/logistics/certificates";
import { DocumentCompleteType } from "@/types/logistics/certificate/certificate";
import ModalDocuments from "@/components/molecules/modals/ModalDocuments/ModalDocuments";
import { getAllMaterialType, getAllMaterialTransportType } from "@/services/logistics/materials";
import Link from "next/link";
import dayjs from "dayjs";
import UploadDocumentChild from "@/components/atoms/UploadDocumentChild/UploadDocumentChild";
import SubmitFormButton from "@/components/atoms/SubmitFormButton/SubmitFormButton";
import LoadDocumentsButton from "@/components/atoms/LoadDocumentsButton/LoadDocumentsButton";
import { SelectInputForm } from "@/components/molecules/logistics/SelectInputForm/SelectInputForm";
import { bloodTypesOptions, documentTypesOptions, glassesOptions, licencesOptions } from "../formSelectOptions";
import MultiSelectTags from "@/components/ui/multi-select-tags/MultiSelectTags";

const { Title, Text } = Typography;

export const MaterialFormTab = ({
  onEditProject = () => {},
  onSubmitForm = () => {},
  statusForm = "review",
  data,
  onActiveProject = () => {},
  onDesactivateProject = () => {},
  params,
  handleFormState = () => {},
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
    formState: { errors, isValid}
  } = useForm<IFormMaterial>({
    defaultValues,
    disabled: statusForm === "review"
  });

  const formImages = watch("images")

  const hasImages = () => {
    return (images.some(img=>img.file) || (formImages && formImages.length > 0))
  }
  const isFormCompleted = () => {
    return isValid && hasImages()
  }

  const isSubmitButtonEnabled = isFormCompleted() && !loading
  /*archivos*/
  interface FileObject {
    docReference: string;
    file: File | undefined;
  }
  const [files, setFiles] = useState<(FileObject & { aditionalData?: any })[]>([]);

  useEffect(() => {
    if (Array.isArray(documentsType)) {
      const isFirstLoad = data?.documents?.length && selectedFiles.length === 0 
      if (isFirstLoad) {

        const docsWithLink =
          documentsType
            ?.filter((f) => data.documents?.find((d) => d.id_document_type === f.id))
            .map((f) => ({
              ...f,
              file:  undefined,
              link: data.documents?.find((d) => d.id_document_type === f.id)?.url_archive,
              expirationDate: dayjs(
                data.documents?.find((d) => d.id_document_type === f.id)?.expiration_date
              )
            })) || [];
        setSelectedFiles(docsWithLink);
      } else {
        
        const documentsFiltered = documentsType?.filter((f) => !f?.optional || selectedFiles?.find((f2) => f2.id === f.id))
        const docsWithFile =  documentsFiltered.map((f) => {
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
                file:  undefined,
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
    //console.log(materialTypes)
    if (!Array.isArray(materialTypes)) return [];
    return materialTypes?.map((materialType) => ({
      label: materialType.description,
      value: materialType.id
    }));
  };

  const convertToSelectOptionsTransport = (materialTransportTypes: IMaterialTransportType[]) => {
    //console.log(materialTransportTypes)
    if (!Array.isArray(materialTransportTypes)) return [];
    return materialTransportTypes?.map((materialTransportType) => ({
      label: materialTransportType.description,
      value: materialTransportType.id
    }));
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

  const onSubmit = (data: any) => {
    data.general.license_categorie = licencesOptions.find(
      (item) => item.id === data.general.license_category
    )?.value;
    data.general.rhval = bloodTypesOptions.find((item) => item.id === data.general.rh)?.value;
    data.general.vehicle_type = data.general.vehicle_type.map((v:any)=>v.value)
    _onSubmit(
      data,
      selectedFiles,
      imageFile ? [{ docReference: "imagen", file: imageFile }] : undefined,
      setImageError,
      setLoading,
      onSubmitForm,
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
                    handleFormState("edit")
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
                    handleFormState("review")
                    e.preventDefault();
                    reset()
                  }}
                >
                  {"Cancelar edición"}
                </Button>
              ) : (
                ""
              )}
          </Flex>
        </Flex>
        <Flex component={"main"} flex="1" vertical style={{paddingRight: "1rem"}}>
          <Row gutter={[16,16]}> 
            <Col span={6}>  {/* Columna Fotos del Vehiculo */}
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
                      imgDefault={formImages ? formImages[index+1]?.url_archive : undefined}
                      setImgFile={(file) => {
                      const currentUrlArchive = formImages ? formImages[index+1]?.url_archive : undefined; // obtener el valor actual de url_archive
                        if (currentUrlArchive) {
                          (file as any).url_archive = currentUrlArchive;
                          setValue(`images.${index+1}`, file);
                        } else {
                          setValue(`images.${index+1}`, file);
                        }
                        setImages((prev) =>
                          prev.map((img, imgIndex) =>
                            imgIndex === index + 1 ? { ...img, file } : img
                          )
                        );
                        if (file) {
                          setImageError(false);
                        }
                      }}
                    />
                  </Col>
                ))}
              </Row>
            </Col>
            <Col span={18}> {/* Columna Informacion general*/}
              <Row>
                <Col span={24}>
                  <Title className="title" level={4}>
                      Datos del material
                  </Title>
                </Col>
              </Row>

              <Row gutter={[16,16]}> {/* Fila campos info gral*/}
                <Col span={12}>
                  <InputForm
                    titleInput="Código"
                    nameInput="general.id"
                    control={control}
                    error={errors?.general?.id}
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
                    titleInput="Alto"
                    nameInput="general.mt_height"
                    control={control}
                    error={errors?.general?.mt_height}
                  />
                </Col>
                <Col span={6}>
                  <InputForm
                    titleInput="Largo"
                    nameInput="general.mt_width"
                    control={control}
                    error={errors?.general?.mt_width}
                  />
                </Col>
                <Col span={6}>
                  <InputForm
                    titleInput="Ancho"
                    nameInput="general.mt_length"
                    control={control}
                    error={errors?.general?.mt_length}
                  />
                </Col>
                <Col span={6}>
                  <InputForm
                    titleInput="Peso"
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
                          errors={errors?.general?.material_type}
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
            <Row justify={"end"} >
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
        onActive={onActiveProject}
        onDesactivate={onDesactivateProject}
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
