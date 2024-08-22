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
import { UploadDocumentButton } from "@/components/atoms/UploadDocumentButton/UploadDocumentButton";
import { ICarrierRequestDrivers, ICarrierRequestVehicles } from "@/types/logistics/schema";
import styles from "./vehicleAndDriverAsignation.module.scss";
import DriverRenderOption from "./components/DriverRenderOption/DriverRenderOption";
import DriverRenderLabel from "./components/DriverRenderLabel/DriverRenderLabel";
import VehicleRenderOption from "./components/VehicleRenderOption/VehicleRenderOption";
import VehicleRenderLabel from "./components/VehicleRenderLabel/VehicleRenderLabel";
import AddRemoveButton from "./components/AddRemoveButton/AddRemoveButton";
import EditDocsButton from "./components/EditDocsButton/EditDocsButton";
import ModalDocuments from "@/components/molecules/modals/ModalDocuments/ModalDocuments";
import { documentsTypes } from "../../mockdata";
import { DocumentCompleteType } from "@/types/logistics/certificate/certificate";
import dayjs from "dayjs";
import UploadDocumentChild from "@/components/atoms/UploadDocumentChild/UploadDocumentChild";

const { Option } = Select;

interface VehicleAndDriverAsignationProps {
  setIsNextStepActive: Dispatch<SetStateAction<boolean>>;
  setVehicle: Dispatch<SetStateAction<number | null>>;
  setDrivers: Dispatch<SetStateAction<(number | null)[]>>;
  drivers: ICarrierRequestDrivers[] | null | undefined;
  vehicles: ICarrierRequestVehicles[] | null | undefined;
  currentDrivers: (number | null)[];
  currentVehicle: number | null;
  formMode: "edit" | "view";
}
interface FormValues {
  vehicleForm: number | null;
  driverForm: { driverId: number | null }[];
}

const VehicleAndDriverAsignation = forwardRef(function VehicleAndDriverAsignation(
  {
    drivers,
    vehicles,
    setIsNextStepActive,
    setVehicle,
    setDrivers,
    currentDrivers,
    currentVehicle,
    formMode
  }: VehicleAndDriverAsignationProps,
  ref
) {
  const MANDATORY_DRIVERS_DOCS = [7];
  const MANDATORY_VEHICLE_DOCS = [3, 4];

  const createDefault = () => {
    const defaultDrivers = currentDrivers
      ? currentDrivers.map((cd) => ({ driverId: cd }))
      : [{ driverId: null }];
    return defaultDrivers;
  };
  const { control, watch, register, getValues } = useForm<FormValues>({
    defaultValues: {
      vehicleForm: currentVehicle ?? null,
      driverForm: createDefault()
    }
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "driverForm"
  });
  const selectedVehicle = watch("vehicleForm");
  const selectedDrivers = watch("driverForm");
  const formCurrentValues = getValues();

  const DRIVERS_MAX_QUANTITY = 5;
  const [isOpenModalDocuments, setIsOpenModalDocuments] = useState<boolean>(false);

  useEffect(() => {
    setIsNextStepActive(false);
  }, []);

  useEffect(() => {
    console.log("formCurrentValues", formCurrentValues);
    const { vehicleForm, driverForm } = formCurrentValues;
    if (vehicleForm && driverForm[0].driverId !== null) {
      setIsNextStepActive(true);
    }
  }, [formCurrentValues]);

  const onSubmit = (data: FormValues) => {
    const { vehicleForm, driverForm } = data;
    vehicleForm && setVehicle(vehicleForm);
    const driversIdsArray = driverForm
      .map((d) => d.driverId ?? null)
      .filter((driverId) => driverId !== null && driverId !== undefined);
    setDrivers(driversIdsArray);
  };

  const handleSubmitDriverVehicleForm = () => {
    onSubmit(formCurrentValues);
  };

  // Expone el método al padre
  useImperativeHandle(ref, () => ({
    handleSubmitDriverVehicleForm
  }));

  function filterDrivers(indexField: number) {
    const selectedDriverIds = selectedDrivers
      .map((driver) => driver.driverId)
      .filter((id) => id !== null);
    return drivers?.filter(
      (driver) =>
        !selectedDriverIds.includes(driver.id) ||
        driver.id === selectedDrivers[indexField]?.driverId
    );
  }

  const [selectedFiles, setSelectedFiles] = useState<DocumentCompleteType[]>([]);
  useEffect(() => {
    const docsWithLink =
      documentsTypes
        .filter((docs) => !docs.optional)
        .map((dt, index) => ({
          ...dt,
          key: index,
          file: undefined,
          link: undefined,
          expirationDate: dayjs()
        })) || [];
    setSelectedFiles(docsWithLink);
  }, [documentsTypes]);

  return (
    <div className={styles.wrapper}>
      <p className={styles.sectionTitle}>Vehiculo</p>
      <div className={styles.container} style={{ gap: "6px" }}>
        <p className={styles.subtitle}>Seleccione el vehículo</p>
        <Controller
          {...register(`vehicleForm`)}
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
                  <VehicleRenderLabel vehicles={vehicles} selectedValue={selectedValue} />
                )}
                optionFilterProp="label"
                filterOption={(input: string, option: any) => {
                  if (option) {
                    return option.label?.toLowerCase().includes(input.toLowerCase());
                  }
                  return false;
                }}
              >
                {vehicles?.map((vehicle, index) => (
                  <Option
                    key={`option-vehicle-${vehicle.id}-${index}`}
                    value={vehicle.id}
                    label={`${vehicle.vehicle_type} ${vehicle.brand} ${vehicle.line} ${vehicle.color} ${vehicle.plate_number}`}
                  >
                    <VehicleRenderOption
                      data={vehicle}
                      index={index}
                      selectedVehicle={selectedVehicle}
                    />
                  </Option>
                ))}
              </Select>
            );
          }}
        />
        <div className={styles.documentsTop}>
          <p className={styles.subtitle}>Documentos del vehículo</p>
          <EditDocsButton
            onClick={() => setIsOpenModalDocuments(true)}
            text="Editar documentos"
            disabled={formMode === "view"}
          />
        </div>
        <div className={styles.uploadContainer}>
          {selectedFiles
            .filter((sf) => MANDATORY_VEHICLE_DOCS.includes(sf.id))
            .map((file) => (
              <UploadDocumentButton
                key={file.id}
                title={file.description}
                isMandatory={!file.optional}
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
        </div>
      </div>
      {fields.map((field, indexField: number) => (
        <div key={`field-${field.id}-${indexField}`}>
          <hr style={{ borderTop: "1px solid #dddddd" }}></hr>
          <Flex style={{ width: "100%" }} justify="space-between">
            <p className={styles.sectionTitle} style={{ marginTop: "2rem" }}>
              Conductor {indexField !== 0 && indexField + 1}
            </p>
            {fields.length > 1 && (
              <AddRemoveButton
                type="remove"
                onClick={() => remove(indexField)}
                disabled={formMode === "view"}
              />
            )}
          </Flex>
          <div className={styles.container}>
            <p className={styles.subtitle}>Seleccione el conductor</p>
            <div className={styles.selector}>
              <Controller
                {...register(`driverForm.${indexField}.driverId`)}
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
                        <DriverRenderLabel selectedValue={selectedValue} drivers={drivers} />
                      )}
                      optionFilterProp="label"
                      filterOption={(input: string, option: any) => {
                        if (option) {
                          return option.label?.toLowerCase().includes(input.toLowerCase());
                        }
                        return false;
                      }}
                    >
                      {filterDrivers(indexField)?.map((driver, index) => (
                        <Option
                          key={`option-driver-${driver.id}-${index}`}
                          value={driver.id}
                          label={`${driver.name} ${driver.last_name} ${driver.phone}`}
                        >
                          <DriverRenderOption
                            selectedDrivers={selectedDrivers}
                            data={driver}
                            index={index}
                            selectIndex={indexField}
                          />
                        </Option>
                      ))}
                    </Select>
                  );
                }}
              />
              {indexField === fields.length - 1 && (
                <AddRemoveButton
                  type="add"
                  onClick={() => append({ driverId: null })}
                  disabled={fields.length === DRIVERS_MAX_QUANTITY || formMode === "view"}
                  text="Agregar otro conductor"
                />
              )}
            </div>
            <div className={styles.documentsTop}>
              <p className={styles.subtitle}>Documentos del conductor</p>
              <EditDocsButton
                onClick={() => setIsOpenModalDocuments(true)}
                text="Editar documentos"
                disabled={formMode === "view"}
              />
            </div>
            <div className={styles.uploadContainer}>
              {selectedFiles
                .filter((sf) => MANDATORY_DRIVERS_DOCS.includes(sf.id))
                .map((file) => (
                  <UploadDocumentButton
                    key={file.id}
                    title={file.description}
                    isMandatory={!file.optional}
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
            </div>
          </div>
        </div>
      ))}
      <ModalDocuments
        isOpen={isOpenModalDocuments}
        mockFiles={selectedFiles}
        setFiles={() => {}}
        documentsType={documentsTypes}
        isLoadingDocuments={false}
        onClose={() => setIsOpenModalDocuments(false)}
        handleChange={() => {}}
        handleChangeExpirationDate={() => {}}
        setSelectedFiles={() => {}}
      />
    </div>
  );
});

VehicleAndDriverAsignation.displayName = "VehicleAndDriverAsignation";

export default VehicleAndDriverAsignation;
