import { useEffect, useRef, useState } from "react";
import { Button, Card, Col, Flex, Row, Switch, Typography, message } from "antd";
import { Controller, useForm } from "react-hook-form";
import { ArrowsClockwise, CaretLeft, Pencil, Plus, XCircle } from "phosphor-react";

// components
import { ModalChangeStatus } from "@/components/molecules/modals/ModalChangeStatus/ModalChangeStatus";
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

//interfaces
import { InputForm } from "@/components/atoms/inputs/InputForm/InputForm";

import {
  _onSubmitLocation,
  normalizeLocationData,
  validationButtonText,
  LocationFormTabProps
} from "./locationFormTab.mapper";
import "./locationformtab.scss";
import { ICity, IFormLocation, IGroupLocation, ILocationTypes, IState } from "@/types/logistics/schema";
import useSWR from "swr";
import ModalDocuments from "@/components/molecules/modals/ModalDocuments/ModalDocuments";
// get deptos munis, grups , tipos
import { addLocation, updateLocation, getAllStatesByCountry, getAllCitiesByState, getAllLocationTypes, getAllGroupByLocation, getAllDocumentsType} from "@/services/logistics/locations";
import { DocumentCompleteType } from "@/types/logistics/certificate/certificate";
import { UploadDocumentButton } from "@/components/atoms/UploadDocumentButton/UploadDocumentButton";
import UploadDocumentChild from "@/components/atoms/UploadDocumentChild/UploadDocumentChild";
import { useRouter } from "next/navigation";
import Link from "next/link";
import dayjs from "dayjs";
import SubmitFormButton from "@/components/atoms/SubmitFormButton/SubmitFormButton";
import LoadDocumentsButton from "@/components/atoms/LoadDocumentsButton/LoadDocumentsButton";
import { SelectInputForm } from "@/components/molecules/logistics/SelectInputForm/SelectInputForm";
import ModalDocumentsType from "@/components/molecules/modals/ModalDocumentsType/ModalDocumentsType";

const { Title, Text } = Typography;

export const LocationFormTab = ({
  data,
  handleFormState = () => {},
  onEditLocation = () => {},
  onSubmitForm = () => {},
  statusForm = "create",
  onActiveLocation = () => {},
  onDesactivateLocation = () => {},
  params
}: LocationFormTabProps) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isOpenModalDocuments, setIsOpenModalDocuments] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();  
  const [isSelectedState, setIsSelectedState] = useState(false);
  const [selectedState, setSelectedState] = useState<any>(null);

  const { data: documentsType, isLoading: isLoadingDocuments } = useSWR(
    "2",
    getAllDocumentsType,
    { revalidateIfStale:false,
      revalidateOnFocus:false,
      revalidateOnReconnect:false
    }
  );
  const { data: locationTypesData, isLoading: isLoadingLocationTypes } = useSWR(
    "locationtype",
    getAllLocationTypes,
    { revalidateIfStale:false,
      revalidateOnFocus:false,
      revalidateOnReconnect:false
    }
  );
  const { data: groupLocationData, isLoading: isLoadingGroupLocation } = useSWR(
    "grouplocation",
    getAllGroupByLocation,
    { revalidateIfStale:false,
      revalidateOnFocus:false,
      revalidateOnReconnect:false
    }
  );
  const { data: statesData, isLoading: isLoadingStates } = useSWR(
    "1",
    getAllStatesByCountry,
    { revalidateIfStale:false,
      revalidateOnFocus:false,
      revalidateOnReconnect:false
    }
  );

  const { data: citiesData, isLoading: isLoadingCities } = useSWR(
    isSelectedState? 'city-'+selectedState: null,
    getAllCitiesByState,
    { revalidateIfStale:false,
      revalidateOnFocus:false,
      revalidateOnReconnect:false
    }
  );

  useEffect(() => {
    const subscription = watch((data, {name, type}) =>{
        console.log(data, name, type);
        if(name == 'general.state_id'){
          setIsSelectedState(true);
          setSelectedState(data.general?.state_id)
        }
        if(name == 'general.latitude'){
          setLatitude(data.general?.latitude)
          markerRef.current.setLngLat([longitude,latitude])
          mapRef.current.flyTo({
            center: [longitude,latitude]
          });
        }
        if(name == 'general.longitude'){
          setLongitude(data.general?.longitude)
          markerRef.current.setLngLat([longitude,latitude])
          mapRef.current.flyTo({
            center: [longitude,latitude]
          });
        }
      }
    )
    return () => subscription.unsubscribe()
  }, []);

  const defaultValues = statusForm === "create" ? {} : normalizeLocationData(data as any);
  const {
    watch,
    control,
    handleSubmit,
    resetField,
    reset,
    setValue,
    getValues,
    trigger,
    formState: { errors, isValid }
  } = useForm<IFormLocation>({
    defaultValues,
    disabled: statusForm === "review",
    mode: 'onChange' 
  });
  const { push } = useRouter();

  const isFormCompleted = () => {
    return isValid;
  }
  const isSubmitButtonEnabled = isFormCompleted() && !loading

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  /* MAPBOX */
  const mapsAccessToken = 'pk.eyJ1IjoiamNib2JhZGkiLCJhIjoiY2x4aWgxejVsMW1ibjJtcHRha2xsNjcxbCJ9.CU7FHmPR635zv6_tl6kafA';//import.meta.env.VITE_MAP_BOX_ACCESS_TOKEN,

  const mapContainerRef = useRef(null);
  const mapRef:any = useRef(null);
  const markerRef:any = useRef(null);
  const [coordinates, setCoordinates] = useState(['','']);
  const [longitude, setLongitude] = useState<any>(-74.07231699675322);
  const [latitude, setLatitude] = useState<any>(4.66336863727521);
  
  useEffect(() => {
    mapboxgl.accessToken = mapsAccessToken;

    if(!mapContainerRef.current) return;
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [longitude,latitude],
      zoom: 12
    });

    markerRef.current = new mapboxgl.Marker({
      draggable: true
    })
      .setLngLat([longitude,latitude])
      .addTo(mapRef.current);

    function onDragEnd() {
      const lngLat = markerRef.current.getLngLat();
      setCoordinates([`Longitude: ${lngLat.lng}`, `Latitude: ${lngLat.lat}`]);
      setValue("general.latitude", lngLat.lat);
      setValue("general.longitude", lngLat.lng);
      markerRef.current.setLngLat(lngLat)
      mapRef.current.flyTo({
        center: lngLat
      });
    }

    markerRef.current.on('dragend', onDragEnd);
    return () => {
      mapRef.current.remove();
    };
  }, []);

  /*archivos*/
  interface FileObject {
    docReference: string;
    file: File | undefined;
  }
  const [files, setFiles] = useState<FileObject[] | any[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<DocumentCompleteType[]>([]);

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
    console.log(data);
    return;
    const locationData: any = {
      ...data.general
    };    
    _onSubmitLocation(
      locationData,
      selectedFiles,
      setLoading,
      onSubmitForm
    )
  };

  const convertStatesToSelectOptions = (states: IState[]) => {
    return states?.map((state) => ({
      value: state.description,
      id: state.id,
    }));
  };

  const convertCitiesToSelectOptions = (cities: ICity[]) => {
    return cities?.map((city) => ({
      value: city.description,
      id: city.id,
    }));
  };

  const convertLocationTypesToSelectOptions = (locationTypes: ILocationTypes[]) => {
    return locationTypes?.map((locationType) => ({
      value: locationType.description,
      id: locationType.id,
    }));
  };

  const convertGroupLocationsToSelectOptions = (groupLocations: IGroupLocation[]) => {
    return groupLocations?.map((groupLocation) => ({
      value: groupLocation.description,
      id: groupLocation.id,
    }));
  };

  return (
    <>
      {contextHolder}
      <form className="vehiclesFormTab" onSubmit={handleSubmit(onSubmit)}>
        <Flex component={"header"} className="headerProyectsForm">
            <Link href={`/logistics/configuration/locations/all`} passHref>
              <Button
                type="text"
                size="large"
                className="buttonGoBack"
                icon={<CaretLeft size={"1.45rem"} />}
              >
                Ver Ubicaciones
              </Button>
            </Link>
              <Flex gap={"1rem"}>
              {(statusForm === "review") && (
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
        <Flex component={"main"} flex="3" vertical>
          <Row gutter={[16,16]}>
            <Col span={12}>  {/* Columna Mapa */}
              <Title className="title" level={4}>
                Mapa
              </Title>
              <Row>
                <Col span={24}>
                  <div
                    id="map" 
                    ref={mapContainerRef}
                    style={{
                      width: "100%",
                      height: "37vh",
                      border: "1px #F7F7F7 solid",
                    }}
                  />
                  <div
                    style={{
                      background: 'rgba(0, 0, 0, 0.5)',
                      color: '#fff',
                      position: 'absolute',
                      bottom: '20px',
                      left: '10px',
                      padding: '5px 10px',
                      margin: 0,
                      fontFamily: 'monospace',
                      fontWeight: 'bold',
                      fontSize: '11px',
                      lineHeight: '18px',
                      borderRadius: '3px',
                      display: coordinates ? 'block' : 'none'
                    }}
                  >
                    {coordinates &&
                      coordinates.map((coord, idx) => (
                        <p key={idx} style={{ marginBottom: 0 }}>{coord}</p>
                      ))}
                  </div>
                </Col>
              </Row>
            </Col>
            <Col span={12} >  {/* Columna Informacion general */}
              <Title className="title" level={4}>
                Informacion General
              </Title>
              <Row gutter={[16,16]}>
                <Col span={24}>
                  <InputForm
                    titleInput="Nombre"
                    placeholder="Ingresar nombre"
                    nameInput="general.description"
                    control={control}
                    disabled={statusForm === "review"}  
                    error={errors.general?.description}
                  />
                </Col>
                <Col span={12}>
                  <InputForm
                    titleInput="Longitud"
                    placeholder="0°"
                    nameInput="general.longitude"
                    control={control}
                    disabled={statusForm === "review"}  
                    error={errors?.general?.longitude}
                  />
                </Col>
                <Col span={12}>
                  <InputForm
                    titleInput="Latitud"
                    placeholder="0°"
                    nameInput="general.latitude"
                    control={control}
                    disabled={statusForm === "review"}  
                    error={errors?.general?.latitude}
                  />
                </Col>
                <Col span={12}  className="selectButton">
                  <Title className="title" level={5}>
                    Departamento
                  </Title>
                   <Controller
                    name="general.state_id"
                    control={control}
                    disabled={statusForm === "review"} 
                    rules={{ required: true }}
                    render={({ field }) => (
                      <SelectInputForm
                      placeholder="Selecciona departamento"
                      error={errors?.general?.state_id}
                      field={field}
                      loading={isLoadingStates}
                      options={convertStatesToSelectOptions((statesData?.data.data as any) || [])}                                          
                      />
                    )}                    
                  /> 
                </Col>
                <Col span={12}  className="selectButton">
                  <Title className="title" level={5}>
                    Municipio
                  </Title>
                   <Controller
                    name="general.city_id"
                    control={control}
                    disabled={statusForm === "review"} 
                    rules={{ required: true }}
                    render={({ field }) => (
                      <SelectInputForm
                      placeholder="Selecciona ciudad"
                      error={errors?.general?.city_id}
                      field={field}
                      loading={isLoadingCities}
                      options={convertCitiesToSelectOptions((citiesData?.data.data as any) || [])}                                          
                      />
                    )}                    
                  /> 
                </Col>
                <Col span={12}  className="selectButton">
                  <Title className="title" level={5}>
                    Tipo de ubicación
                  </Title>
                   <Controller
                    name="general.location_type"
                    control={control}
                    disabled={statusForm === "review"} 
                    rules={{ required: true }}
                    render={({ field }) => (
                      <SelectInputForm
                      placeholder="Seleccionar"
                      error={errors?.general?.city_id}
                      field={field}
                      loading={isLoadingLocationTypes}
                      options={convertLocationTypesToSelectOptions((locationTypesData?.data.data as any) || [])}                                          
                      />
                    )}                    
                  /> 
                </Col>
                <Col span={12}  className="selectButton">
                  <Title className="title" level={5}>
                    Grupo de ubicación
                  </Title>
                   <Controller
                    name="general.group_location_id"
                    control={control}
                    disabled={statusForm === "review"} 
                    rules={{ required: false }}
                    render={({ field }) => (
                      <SelectInputForm
                      placeholder="Seleccionar"
                      error={errors?.general?.group_location_id}
                      field={field}
                      loading={isLoadingGroupLocation}
                      options={convertGroupLocationsToSelectOptions((groupLocationData?.data.data as any) || [])}                                          
                      />
                    )}                    
                  /> 
                </Col>
              </Row>
            </Col>
          </Row>  
          <Row gutter={[16,16]}  style={{marginTop:'1rem'}}> {/* Fila Informacion Adicional */}
            <Col span={24}>
              <Title className="title" level={4}>
                Informacion Adicional
              </Title>
              <InputForm
                placeholder="Escribir información adicional"
                titleInput=""
                nameInput="general.additional_info"
                control={control}
                validationRules={{required: false}}
                disabled={statusForm === "review"} 
                error={errors.general?.additional_info}
              />
            </Col>
          </Row>
          <Row gutter={[16,16]} style={{marginTop:'1rem'}}> {/* Fila Datos de Contacto */}
            <Col span={12}>
              <Title className="title" level={4}>
                Datos de contacto
              </Title>
              <Row>
                <Col span={12}>
                  <InputForm
                    placeholder="Ingrese nombre"
                    titleInput="Nombres y apellidos"
                    nameInput="general.contact_name"
                    control={control}
                    validationRules={{required: false}}
                    disabled={statusForm === "review"} 
                    error={errors.general?.contact_name}
                  />
                </Col>
                <Col span={10} offset={1}>
                  <InputForm
                    placeholder="Ingrese teléfono"
                    titleInput="Teléfono"
                    nameInput="general.contact_number"
                    control={control}
                    validationRules={{required: false}}
                    disabled={statusForm === "review"} 
                    error={errors.general?.contact_number}
                  />
                </Col> 
              </Row>          
            </Col>
          </Row>          
          <Row style={{marginTop: "2rem", marginBottom: "2rem"}}> {/* Fila Documentos */}
              <Col span={8}>
                <Title className="title" level={4}>
                  Documentos
                </Title>
              </Col>
              <Col span={8} offset={8} style={{display: "flex", justifyContent: "flex-end"}}>
                {(statusForm === "create" || statusForm === "edit" ) && (
                  <LoadDocumentsButton 
                    text="Cargar documentos" 
                    onClick={() => setIsOpenModalDocuments(true)}/>
                )}
              </Col>
            <Row style={{marginTop: "1rem", width: "100%"}} >
              {selectedFiles.map((file, index) => (
                <Col span={8} key={`file-${file.id}`}  style={{ marginBottom: "16px", paddingRight: "16px" }}>
                  <Card key={file.id} className="filecard">
                    <Row>
                      <Col span={23}>{file.description}</Col>
                      <Col span={1}><XCircle size={16} /></Col>
                      <Col span={24}>{file.entity_type_desc}</Col>
                      <Col>
                        {file?.link ? (
                          <UploadDocumentChild
                            linkFile={file.link}
                            nameFile={file.link.split("-").pop() ?? ""}
                            onDelete={()=>{}}
                            showTrash={false}
                          />
                        ) : undefined}
                    </Col>
                    </Row>
                  </Card>
                </Col>
              ))}
            </Row>
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
      </form>
      <ModalChangeStatus
        isActiveStatus={true}
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        onActive={onActiveLocation}
        onDesactivate={onDesactivateLocation}
      />
      <ModalDocumentsType
        isOpen={isOpenModalDocuments}
        mockFiles={selectedFiles}
        setFiles={setFiles}
        documentsType={documentsType}
        isLoadingDocuments={isLoadingDocuments}
        onClose={() => setIsOpenModalDocuments(false)}
        handleChange={handleChange}
        setSelectedFiles={setSelectedFiles}
      />
    </>
  );
};
