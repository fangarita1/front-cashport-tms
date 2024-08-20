"use client";
import React, {
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  useRef,
  forwardRef,
  useImperativeHandle
} from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { Typography, Flex, Button, Col, Select } from "antd";
import { UploadDocumentButton } from "@/components/atoms/UploadDocumentButton/UploadDocumentButton";
import { ICarrierRequestDrivers, ICarrierRequestVehicles } from "@/types/logistics/schema";
import { Check, Circle, Plus, PlusCircle } from "@phosphor-icons/react";
import styles from "./vehicleAndDriverAsignation.module.scss";
import RadioButtonIcon from "@/components/atoms/RadioButton/RadioButton";
import { Trash } from "phosphor-react";
import { DefaultOptionType } from "antd/es/select";
import DriverRenderOption from "./components/DriverRenderOption/DriverRenderOption";
import DriverRenderLabel from "./components/DriverRenderLabel/DriverRenderLabel";
import VehicleRenderOption from "./components/VehicleRenderOption/VehicleRenderOption";
import VehicleRenderLabel from "./components/VehicleRenderLabel/VehicleRenderLabel";
const { Option } = Select;
const { Text, Title } = Typography;

interface VehicleAndDriverAsignationProps {
  setIsNextStepActive: Dispatch<SetStateAction<boolean>>;
  setVehicle: (vehicle: number) => void;
  setDrivers: (drivers: number[]) => void;
  drivers: ICarrierRequestDrivers[] | null | undefined;
  vehicles: ICarrierRequestVehicles[] | null | undefined;
  currentDrivers: number[];
  currentVehicle: number;
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
    currentVehicle
  }: VehicleAndDriverAsignationProps,
  ref
) {
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
  //const [isOpenModalDocuments, setIsOpenModalDocuments] = useState<boolean>(false);

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
      .map((d) => d.driverId)
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
          <button className={`${styles.buttonTransparent} ${styles.editDocs}`}>
            <Plus size={20} />
            <p>Editar documentos</p>
          </button>
        </div>
        <div className={styles.uploadContainer}>
          <UploadDocumentButton
            title={"Documento 1"}
            key={`vehicle-document-{1}`}
            isMandatory
            aditionalData={1}
            setFiles={() => {}}
            disabled
            column
          />
          <UploadDocumentButton
            title={"Documento 2"}
            key={`vehicle-document-{2}`}
            isMandatory
            aditionalData={2}
            setFiles={() => {}}
            disabled
            column
          />
          <UploadDocumentButton
            title={"Documento 3"}
            key={`vehicle-document-{3}`}
            isMandatory
            aditionalData={3}
            setFiles={() => {}}
            disabled
            column
          />
          <UploadDocumentButton
            title={"Aprobación ingreso a pozo"}
            key={`vehicle-document-{4}`}
            isMandatory={false}
            aditionalData={4}
            setFiles={() => {}}
            disabled
            column
          />
        </div>
      </div>
      {fields.map((field, indexField: number) => (
        <div key={`field-${field.id}-${indexField}`}>
          <hr style={{ borderTop: "1px solid #dddddd" }}></hr>
          <p className={styles.sectionTitle} style={{ marginTop: "2rem" }}>
            Conductor {indexField !== 0 && indexField + 1}
          </p>
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
              {indexField === fields.length - 1 ? (
                <Flex>
                  {fields.length > 1 ? (
                    <button
                      className={`${styles.buttonTransparent} ${styles.addOrRemove}`}
                      onClick={() => remove(indexField)}
                    >
                      <Trash size={24} />
                      <p>Eliminar conductor</p>
                    </button>
                  ) : (
                    <></>
                  )}
                  <button
                    className={`${styles.buttonTransparent} ${styles.addOrRemove}`}
                    onClick={() => append({ driverId: null })}
                    disabled={fields.length === DRIVERS_MAX_QUANTITY}
                  >
                    <PlusCircle size={24} />
                    <p>Agregar otro conductor</p>
                  </button>
                </Flex>
              ) : (
                <button
                  className={`${styles.buttonTransparent} ${styles.addOrRemove}`}
                  onClick={() => remove(indexField)}
                >
                  <Trash size={24} />
                  <p>Eliminar conductor</p>
                </button>
              )}
            </div>
            <div className={styles.documentsTop}>
              <p className={styles.subtitle}>Documentos del conductor</p>
              <button className={`${styles.buttonTransparent} ${styles.editDocs}`}>
                <Plus size={20} />
                <p>Editar documentos</p>
              </button>
            </div>
            <div className={styles.uploadContainer}>
              <UploadDocumentButton
                title={"Documento 1"}
                key={`document1-driver-${indexField}`}
                isMandatory
                aditionalData={indexField}
                setFiles={() => {}}
                disabled
                column
              />
              <UploadDocumentButton
                title={"Documento 2"}
                key={`document2-driver-${indexField}`}
                isMandatory
                aditionalData={2}
                setFiles={() => {}}
                disabled
                column
              />
              <UploadDocumentButton
                title={"Documento 3"}
                key={`document3-driver-${indexField}`}
                isMandatory
                aditionalData={3}
                setFiles={() => {}}
                disabled
                column
              />
              <UploadDocumentButton
                title={"Aprobación ingreso a pozo"}
                key={`document4-driver-${indexField}`}
                isMandatory={false}
                aditionalData={4}
                setFiles={() => {}}
                disabled
                column
              />
            </div>
          </div>
        </div>
      ))}
      {/* <ModalDocuments
        isOpen={isOpenModalDocuments}
        mockFiles={selectedFiles}
        setFiles={setFiles}
        documentsType={documentsType}
        isLoadingDocuments={isLoadingDocuments}
        onClose={() => setIsOpenModalDocuments(false)}
        handleChange={handleChange}
        handleChangeExpirationDate={handleChangeExpirationDate}
        setSelectedFiles={setSelectedFiles}
      /> */}
    </div>
  );
});

VehicleAndDriverAsignation.displayName = "VehicleAndDriverAsignation";

export default VehicleAndDriverAsignation;
