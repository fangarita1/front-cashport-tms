"use client";
import React, {
  useEffect,
  Dispatch,
  SetStateAction,
  forwardRef,
  useImperativeHandle,
  useState
} from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { Flex, Select } from "antd";
import { FileObject } from "@/components/atoms/UploadDocumentButton/UploadDocumentButton";
import { ICarrierRequestDrivers, ICarrierRequestVehicles } from "@/types/logistics/schema";
import styles from "./vehicleAndDriverAsignation.module.scss";
import DriverRenderOption from "./components/DriverRenderOption/DriverRenderOption";
import DriverRenderLabel from "./components/DriverRenderLabel/DriverRenderLabel";
import VehicleRenderOption from "./components/VehicleRenderOption/VehicleRenderOption";
import VehicleRenderLabel from "./components/VehicleRenderLabel/VehicleRenderLabel";
import AddRemoveButton from "./components/AddRemoveButton/AddRemoveButton";
import { DriverDocument, VehicleDocument } from "@/types/logistics/carrier/carrier";
import { DocumentFields } from "./components/DocumentFields/DocumentFields";
import {
  IDriverAPI,
  IVehicleAPI
} from "../../../view/AceptCarrierDetailView/AceptCarrierDetailView";
import { VehicleDocumentFields } from "./components/VehicleDocumentsFields/VehicleDocumentsFields";

const { Option } = Select;

interface VehicleAndDriverAsignationProps {
  setIsNextStepActive: Dispatch<SetStateAction<boolean>>;
  setVehicleSelectedId: Dispatch<SetStateAction<number | null>>;
  setDriversSelectedIds: Dispatch<SetStateAction<number[]>>;
  driversOptions: ICarrierRequestDrivers[] | null | undefined;
  vehiclesOptions: ICarrierRequestVehicles[] | null | undefined;
  driversSelectedIds: number[];
  vehicleSelectedId: number | null;
  formMode: "edit" | "view";
  driversMandatoryDocs: DriverDocument[];
  vehicleMandatoryDocs: VehicleDocument[];
  currentVehicle: IVehicleAPI | null;
  currentDrivers: IDriverAPI[];
}

export interface FileComplete extends FileObject {
  link?: string;
  id_document_type?: number;
  description?: string;
  entity_type?: number;
}
export interface IDriverForm {
  driverId: number | null;
  documents: FileComplete[];
}

export interface IVehicleForm {
  vehicleId: number | null;
  documents: FileComplete[];
}
export interface FormValues {
  vehicleForm: IVehicleForm;
  driversForm: IDriverForm[];
}

const VehicleAndDriverAsignation = forwardRef(function VehicleAndDriverAsignation(
  {
    driversOptions,
    vehiclesOptions,
    setIsNextStepActive,
    setVehicleSelectedId,
    setDriversSelectedIds,
    driversSelectedIds,
    vehicleSelectedId,
    formMode,
    driversMandatoryDocs,
    vehicleMandatoryDocs,
    currentVehicle,
    currentDrivers
  }: VehicleAndDriverAsignationProps,
  ref
) {
  const createDefaultDocuments = (type: "driver" | "vehicle") => {
    if (type === "driver") return driversMandatoryDocs;
    else return vehicleMandatoryDocs;
  };

  const createDocuments = (type: "driver" | "vehicle", id: number) => {
    if (type === "driver") return currentDrivers.find((cd) => cd.id === id)?.driver_documents;
    else return currentVehicle?.vehicle_documents;
  };
  const createDrivers = () => {
    const defaultDrivers = driversSelectedIds.length
      ? driversSelectedIds.map((cd) => ({
          driverId: cd,
          documents: createDocuments("driver", cd)
        }))
      : [{ driverId: null, documents: createDefaultDocuments("driver") }];
    return defaultDrivers;
  };
  const { control, watch, register, getValues, setValue, trigger } = useForm<FormValues>({
    defaultValues: {
      vehicleForm: {
        vehicleId: vehicleSelectedId ?? null,
        documents: vehicleSelectedId
          ? createDocuments("vehicle", vehicleSelectedId)
          : createDefaultDocuments("vehicle")
      },
      driversForm: createDrivers()
    }
  });
  const {
    fields: driversFields,
    append,
    remove
  } = useFieldArray({
    control,
    name: "driversForm"
  });

  const formCurrentValues = getValues();
  const selectedVehicle = watch("vehicleForm");
  const selectedDrivers = watch("driversForm");

  const DRIVERS_MAX_QUANTITY = 5;
  const [isOpenModalDocuments, setIsOpenModalDocuments] = useState<boolean>(false);

  useEffect(() => {
    setIsNextStepActive(false);
  }, []);

  useEffect(() => {
    console.log("formCurrentValues", formCurrentValues);
    const { vehicleForm, driversForm } = formCurrentValues;
    if (vehicleForm && driversForm[0].driverId !== null) {
      setIsNextStepActive(true);
    }
  }, [formCurrentValues]);

  //falta agregar los documentos al submit
  const onSubmit = (data: FormValues) => {
    const { vehicleForm, driversForm } = data;
    vehicleForm && setVehicleSelectedId(vehicleForm.vehicleId);
    const driversIdsArray = driversForm
      .map((d) => d.driverId ?? null)
      .filter((driverId) => driverId !== null && driverId !== undefined);
    setDriversSelectedIds(driversIdsArray);
  };

  const handleSubmitDriverVehicleForm = () => {
    onSubmit(formCurrentValues);
  };

  // Expone el método al padre
  useImperativeHandle(ref, () => ({
    handleSubmitDriverVehicleForm
  }));

  function filterDrivers(driverIndex: number) {
    const selectedDriverIds = selectedDrivers
      .map((driver) => driver.driverId)
      .filter((id) => id !== null);
    return driversOptions?.filter(
      (driver) =>
        !selectedDriverIds.includes(driver.id) ||
        driver.id === selectedDrivers[driverIndex]?.driverId
    );
  }

  const handleOnChangeDocument = (fileToSave: any, driverIndex: number, documentIndex: number) => {
    console.log("HANDLE IN CHANGE DOC", fileToSave, driverIndex, documentIndex);
    const { file: rawFile } = fileToSave;
    if (rawFile) {
      const fileSizeInMB = rawFile.size / (1024 * 1024);
      if (fileSizeInMB > 30) {
        console.log(
          "El archivo es demasiado grande. Por favor, sube un archivo de menos de 30 MB."
        );
        return;
      }
      setValue(`driversForm.${driverIndex}.documents.${documentIndex}.file`, rawFile);
      trigger(`driversForm.${driverIndex}.documents.${documentIndex}`);
    }
  };

  const handleOnDeleteDocument = (driverIndex: number, documentIndex: number) => {
    setValue(`driversForm.${driverIndex}.documents.${documentIndex}.file`, undefined);
    trigger(`driversForm.${driverIndex}.documents.${documentIndex}`);
  };
  const handleOnChangeDocumentVehicle = (fileToSave: any, documentIndex: number) => {
    const { file: rawFile } = fileToSave;
    if (rawFile) {
      const fileSizeInMB = rawFile.size / (1024 * 1024);
      if (fileSizeInMB > 30) {
        console.log(
          "El archivo es demasiado grande. Por favor, sube un archivo de menos de 30 MB."
        );
        return;
      }
      setValue(`vehicleForm.documents.${documentIndex}.file`, rawFile);
      trigger(`vehicleForm.documents.${documentIndex}`);
    }
  };

  const handleOnDeleteDocumentVehicle = (documentIndex: number) => {
    setValue(`vehicleForm.documents.${documentIndex}.file`, undefined);
    trigger(`vehicleForm.documents.${documentIndex}`);
  };
  return (
    <div className={styles.wrapper}>
      <p className={styles.sectionTitle}>Vehiculo</p>
      <div className={styles.container} style={{ gap: "6px" }}>
        <p className={styles.subtitle}>Seleccione el vehículo</p>
        <Controller
          {...register(`vehicleForm.vehicleId`)}
          control={control}
          render={({ field }) => {
            return (
              <Select
                {...field}
                disabled={formMode === "view"}
                showSearch
                placeholder="Seleccion el vehículo"
                style={{ width: "25rem", height: "2.5rem" }}
                optionLabelProp="label"
                labelRender={(selectedValue) => (
                  <VehicleRenderLabel vehicles={vehiclesOptions} selectedValue={selectedValue} />
                )}
                optionFilterProp="label"
                filterOption={(input: string, option: any) => {
                  if (option) {
                    return option.label?.toLowerCase().includes(input.toLowerCase());
                  }
                  return false;
                }}
              >
                {vehiclesOptions?.map((vehicle, index) => (
                  <Option
                    key={`option-vehicle-${vehicle.id}-${index}`}
                    value={vehicle.id}
                    label={`${vehicle.vehicle_type} ${vehicle.brand} ${vehicle.line} ${vehicle.color} ${vehicle.plate_number}`}
                  >
                    <VehicleRenderOption
                      data={vehicle}
                      index={index}
                      selectedVehicle={selectedVehicle.vehicleId}
                    />
                  </Option>
                ))}
              </Select>
            );
          }}
        />
        <div className={styles.documentsTop}>
          <p className={styles.subtitle}>Documentos del vehículo</p>
          {/* <EditDocsButton
            onClick={() => setIsOpenModalDocuments(true)}
            text="Editar documentos"
            disabled={formMode === "view"}
          /> */}
        </div>
        <VehicleDocumentFields
          control={control}
          register={register}
          handleOnChangeDocument={handleOnChangeDocumentVehicle}
          handleOnDeleteDocument={handleOnDeleteDocumentVehicle}
          currentVehicle={selectedVehicle}
        />
        {/* <div className={styles.uploadContainer}>
          {vehicleDocuments.map((file) => (
            <UploadDocumentButton
              key={file.id}
              title={file.description}
              isMandatory={true}
              aditionalData={file.id}
              setFiles={() => {}}
              files={file.file}
              disabled
              column
            >
              {file?.link ? (
                <UploadDocumentChild
                  linkFile={file.link}
                  nameFile={file.link.split("-").pop() ?? ""}
                  onDelete={() => {}}
                  showTrash={false}
                />
              ) : undefined}
            </UploadDocumentButton>
          ))}
        </div> */}
      </div>
      {driversFields.map((driver, driverIndex: number) => {
        const currentDriver = watch(`driversForm.${driverIndex}`);
        return (
          <div key={`field-${driver.id}-${driverIndex}`}>
            <hr style={{ borderTop: "1px solid #dddddd" }}></hr>
            <Flex style={{ width: "100%" }} justify="space-between">
              <p className={styles.sectionTitle} style={{ marginTop: "2rem" }}>
                Conductor {driverIndex !== 0 && driverIndex + 1}
              </p>
              {driversFields.length > 1 && (
                <AddRemoveButton
                  type="remove"
                  onClick={() => remove(driverIndex)}
                  disabled={formMode === "view"}
                />
              )}
            </Flex>
            <div className={styles.container}>
              <p className={styles.subtitle}>Seleccione el conductor</p>
              <div className={styles.selector}>
                <Controller
                  {...register(`driversForm.${driverIndex}.driverId`)}
                  control={control}
                  render={({ field }) => {
                    return (
                      <Select
                        {...field}
                        disabled={formMode === "view"}
                        showSearch
                        placeholder="Seleccion el conductor"
                        style={{ width: "25rem", height: "2.5rem" }}
                        optionLabelProp="label"
                        labelRender={(selectedValue) => (
                          <DriverRenderLabel
                            selectedValue={selectedValue}
                            drivers={driversOptions}
                          />
                        )}
                        optionFilterProp="label"
                        filterOption={(input: string, option: any) => {
                          if (option) {
                            return option.label?.toLowerCase().includes(input.toLowerCase());
                          }
                          return false;
                        }}
                      >
                        {filterDrivers(driverIndex)?.map((driver, index) => (
                          <Option
                            key={`option-driver-${driver.id}-${index}`}
                            value={driver.id}
                            label={`${driver.name} ${driver.last_name} ${driver.phone}`}
                          >
                            <DriverRenderOption
                              selectedDrivers={selectedDrivers}
                              data={driver}
                              index={index}
                              selectIndex={driverIndex}
                            />
                          </Option>
                        ))}
                      </Select>
                    );
                  }}
                />
                {driverIndex === driversFields.length - 1 && (
                  <AddRemoveButton
                    type="add"
                    onClick={() =>
                      append({ driverId: null, documents: createDefaultDocuments("driver") })
                    }
                    disabled={driversFields.length === DRIVERS_MAX_QUANTITY || formMode === "view"}
                    text="Agregar otro conductor"
                  />
                )}
              </div>
              <div className={styles.documentsTop}>
                <p className={styles.subtitle}>Documentos del conductor</p>
                {/* <EditDocsButton
                onClick={() => setIsOpenModalDocuments(true)}
                text="Editar documentos"
                disabled={formMode === "view"}
              /> */}
              </div>

              <DocumentFields
                control={control}
                register={register}
                driverIndex={driverIndex}
                handleOnChangeDocument={handleOnChangeDocument}
                handleOnDeleteDocument={handleOnDeleteDocument}
                currentDriver={currentDriver}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
});

VehicleAndDriverAsignation.displayName = "VehicleAndDriverAsignation";

export default VehicleAndDriverAsignation;
