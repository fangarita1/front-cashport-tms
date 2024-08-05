"use client";
import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import { useForm, Controller } from "react-hook-form";
import { Dropdown, Menu, Typography, Flex, Button } from "antd";
import { UploadDocumentButton } from "@/components/atoms/UploadDocumentButton/UploadDocumentButton";
import { IDriverByCarrierRequest, ITransferRequestVehicle } from "@/types/logistics/schema";
import { CaretDown, Check, Circle, Plus, PlusCircle } from "@phosphor-icons/react";
import styles from "./vehicleAndDriverAsignation.module.scss";

const { Text } = Typography;

interface VehicleAndDriverAsignationProps {
  setIsNextStepActive: Dispatch<SetStateAction<boolean>>;
  setVehicle: (vehicle: number) => void;
  setDriver: (drivers: number[]) => void;
  drivers: IDriverByCarrierRequest[] | null | undefined;
  vehicles: ITransferRequestVehicle[] | null | undefined;
}

interface FormValues {
  vehicle: string;
  drivers: string[];
}

export default function VehicleAndDriverAsignation({
  setIsNextStepActive,
  setVehicle,
  setDriver,
  drivers,
  vehicles,
}: VehicleAndDriverAsignationProps) {
  const { control, watch } = useForm<FormValues>({
    defaultValues: {
      vehicle: "",
      drivers: []
    }
  });

  const [driverSections, setDriverSections] = useState<number[]>([0]);

  useEffect(() => {
    setIsNextStepActive(false)
  }, []);

  const addDriverSections = () => {
    setDriverSections([...driverSections, driverSections.length]);
  };

  const vehiclesSelectionMenu = (
    items: ITransferRequestVehicle[] | null | undefined,
    field: any
  ) => (
    <Menu
      onClick={({ key }) => field.onChange(key)}
      style={{
        height: "100%",
        padding: "2px 2px",
        backgroundColor: "#ffffff",
        border: "1px solid #DDDFE8",
        borderRadius: "4px"
      }}
    >
      {items?.map((item) => (
        <Menu.Item key={item.id} className={styles.dropdownSelect}>
          <Flex align="center" justify="space-between" style={{ padding: "8px 4px" }}>
            <Flex align="center" gap={8}>
              <Circle size={26} />
              <>
                <Text>{item.vehicle_type.description}</Text>
                <p color="black">•</p>
                <Text>{item.vehicle_type.aditional_info}</Text>
              </>
            </Flex>
            <Flex
              style={{
                backgroundColor: "#CBE71E",
                width: "24px",
                height: "24px",
                borderRadius: "2px"
              }}
              align="center"
              justify="center"
            >
              <Check size={20} color="white" />
            </Flex>
          </Flex>
        </Menu.Item>
      ))}
    </Menu>
  );

  const driversSelectionMenu = (
    items: IDriverByCarrierRequest[] | null | undefined,
    field: any
  ) => (
    <Menu
      onClick={({ key }) => {
        const newDrivers = [...field.value];
        if (!newDrivers.includes(key)) {
          newDrivers.push(key);
          field.onChange(newDrivers);
        }
      }}
      style={{
        height: "100%",
        padding: "2px 2px",
        backgroundColor: "#ffffff",
        border: "1px solid #DDDFE8",
        borderRadius: "4px"
      }}
    >
      {items?.map((item) => (
        <Menu.Item key={item.id_driver} className={styles.dropdownSelect}>
          <Flex align="center" justify="space-between" style={{ padding: "8px 4px" }}>
            <Flex align="center" gap={8}>
              <Circle size={26} />
              <>
                <Text>{item.driver.name}</Text>
                <p color="black">•</p>
                <Text>{item.driver.phone}</Text>
              </>
            </Flex>
            <Flex
              style={{
                backgroundColor: "#CBE71E",
                width: "24px",
                height: "24px",
                borderRadius: "2px"
              }}
              align="center"
              justify="center"
            >
              <Check size={20} color="white" />
            </Flex>
          </Flex>
        </Menu.Item>
      ))}
    </Menu>
  );

  const onSubmit = (data: FormValues) => {
    setVehicle(parseInt(data.vehicle));
    setDriver(data.drivers.map((driverId) => parseInt(driverId)));
    // You can add any additional logic here if needed
  };

  const selectedVehicle = watch("vehicle");
  const selectedDrivers = watch("drivers");
  console.log(selectedVehicle, selectedDrivers)

  useEffect(() => {
    // Call onSubmit if both vehicle and drivers are selected
    if (selectedVehicle && selectedDrivers.length > 0) {
      onSubmit({ vehicle: selectedVehicle, drivers: selectedDrivers });
      setIsNextStepActive(true);
    }
  }, [selectedVehicle, selectedDrivers]);

  const getSelectedVehicle = (
    id: number,
    items: ITransferRequestVehicle[] | null | undefined,
    description: boolean,
    plate: boolean
  ) => {
    const selectedItem = items?.find(item => item.id === id);
    
    const descriptionText = selectedItem && description ? `${selectedItem.vehicle_type?.description} • ${selectedItem.vehicle_type?.aditional_info}` : `Seleccione el vehículo`;
    const plateText = selectedItem && `${!description && selectedItem.vehicle_type?.plate_number !== undefined ? selectedItem.vehicle_type?.plate_number : ""}`
  
    return description ? descriptionText : plate && plateText
  };

  const getSelectedDriver = (
    id: number,
    items: IDriverByCarrierRequest[] | null | undefined,
    name: boolean,
    phone: boolean
  ) => {
    const selectedItem = items?.find(item => item.id_driver === id);

    const nameText = selectedItem ? `${name ? selectedItem.driver?.name : selectedItem.driver?.phone}` : `Seleccione el conductor`;
    const phoneText = selectedItem && `${!name && selectedItem.driver?.phone}`;
  
    return name ? nameText : phone && phoneText
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <p>
          <b>Vehiculo</b>
        </p>
      </div>
      <div className={styles.container} style={{ gap: "6px" }}>
        <div className={styles.subtitle}>
          <p>
            <b>Seleccione el vehículo</b>
          </p>
        </div>
        <Controller
          name="vehicle"
          control={control}
          render={({ field }) => (
            <Dropdown
              overlay={vehiclesSelectionMenu(vehicles, field)}
              trigger={["click"]}
              className={styles.dropdown}
            >
              <a className={styles.dropdownSelect} onClick={(e) => e.preventDefault()}>
                <Flex justify="space-between" align="center">
                  <Flex gap={12}>
                    <Flex align="center" gap={4}>
                      <Text>
                        {getSelectedVehicle(
                          Number(selectedVehicle),
                          vehicles,
                          true,
                          false
                        )}
                      </Text>
                    </Flex>
                  </Flex>
                  <Flex gap={24}>
                    <Text>{getSelectedVehicle(
                          Number(selectedVehicle),
                          vehicles,
                          false,
                          true
                        )}</Text>
                    <CaretDown size={20} color="black" />
                  </Flex>
                </Flex>
              </a>
            </Dropdown>
          )}
        />
        <div className={styles.documentsTop}>
          <p>
            <b>Documentos</b>
          </p>
          <button disabled className={styles.button}>
            <Plus size={16} /> Editar documentos
          </button>
        </div>
        <Flex style={{ padding: "15px" }} gap={20}>
          <UploadDocumentButton
            key={1}
            title={"Documento 1"}
            isMandatory
            aditionalData={1}
            setFiles={() => {}}
            disabled
            column
          />
          <UploadDocumentButton
            key={2}
            title={"Documento 2"}
            isMandatory
            aditionalData={2}
            setFiles={() => {}}
            disabled
            column
          />
          <UploadDocumentButton
            key={3}
            title={"Documento 3"}
            isMandatory
            aditionalData={3}
            setFiles={() => {}}
            disabled
            column
          />
          <UploadDocumentButton
            key={4}
            title={"Aprobación ingreso a pazo"}
            isMandatory={false}
            aditionalData={4}
            setFiles={() => {}}
            disabled
            column
          />
        </Flex>
      </div>
      {driverSections.map((section, index) => (
        <div key={index}>
          <hr style={{ borderTop: "1px solid #dddddd" }}></hr>
          <div className={styles.title}>
            <p>
              <b>Conductor {index !== 0 && index + 1}</b>
            </p>
          </div>
          <div className={styles.container}>
            <div className={styles.subtitle}>
              <p>
                <b>Seleccione el conductor</b>
              </p>
            </div>
            <div className={styles.selector}>
              <Controller
                name="drivers"
                control={control}
                render={({ field }) => (
                  <Dropdown
                    overlay={driversSelectionMenu(drivers, field)}
                    trigger={["click"]}
                    className={styles.dropdown}
                  >
                    <a className={styles.dropdownSelect} onClick={(e) => e.preventDefault()}>
                      <Flex justify="space-between" align="center">
                        <Flex gap={12}>
                          <Flex align="center" gap={4}>
                            <Text>
                              {getSelectedDriver(Number(selectedDrivers), drivers, true, false)}
                            </Text>
                          </Flex>
                        </Flex>
                        <Flex gap={24}>
                          <Text>{getSelectedDriver(Number(selectedDrivers), drivers, false, true)}</Text>
                          <CaretDown size={20} color="black" />
                        </Flex>
                      </Flex>
                    </a>
                  </Dropdown>
                )}
              />
              <Button disabled className={styles.driverButton} onClick={addDriverSections}>
                <PlusCircle size={16} />
                <p>
                  <b>Agregar otro conductor</b>
                </p>
              </Button>
            </div>
            <div className={styles.documentsTop}>
              <p>
                <b>Documentos</b>
              </p>
              <Button disabled className={styles.button}>
                <Plus size={16} /> Editar documentos
              </Button>
            </div>
            <Flex style={{ padding: "15px" }} gap={20}>
              <UploadDocumentButton
                key={index}
                title={"Documento 1"}
                isMandatory
                aditionalData={index}
                setFiles={() => {}}
                disabled
                column
              />
              <UploadDocumentButton
                key={2}
                title={"Documento 2"}
                isMandatory
                aditionalData={2}
                setFiles={() => {}}
                disabled
                column
              />
              <UploadDocumentButton
                key={3}
                title={"Documento 3"}
                isMandatory
                aditionalData={3}
                setFiles={() => {}}
                disabled
                column
              />
              <UploadDocumentButton
                key={4}
                title={"Documento 4"}
                isMandatory={false}
                aditionalData={4}
                setFiles={() => {}}
                disabled
                column
              />
            </Flex>
          </div>
        </div>
      ))}
    </div>
  );
}
