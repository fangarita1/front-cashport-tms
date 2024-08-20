import React, { Dispatch, SetStateAction, useEffect } from "react";
import { Col, Divider, Flex } from "antd";
import { ICarrierRequestDrivers, ICarrierRequestVehicles } from "@/types/logistics/schema";
import styles from "./confirmation.module.scss";
import TextArea from "antd/es/input/TextArea";
import CheckboxButton from "@/components/atoms/CheckboxButton/CheckboxButton";

interface ConfirmationProps {
  driverSelected: ICarrierRequestDrivers[];
  vehicleSelected: ICarrierRequestVehicles;
  setIsNextStepActive: Dispatch<SetStateAction<boolean>>;
  setObservation: Dispatch<SetStateAction<any>>;
  isNextStepActive: boolean;
}

export function Confirmation({ driverSelected, vehicleSelected, setIsNextStepActive, setObservation, isNextStepActive }: ConfirmationProps) {
  console.log("isNextStep:", isNextStepActive);

  useEffect(() => {
    setIsNextStepActive(false)
  }, []);
  
  const onConfirmation = (isNextStepActive: boolean) => {
    setIsNextStepActive(!isNextStepActive)
  };

  return (
    <Flex className={styles.wrapper}>
      <Flex className={styles.sectionWraper} vertical>
        {driverSelected?.map((driver, index) => 
          <Flex key={`vehicle-driver-${index}`}>
            <Col span={11} >
              <p className={styles.subtitle}>{vehicleSelected?.brand} {vehicleSelected?.color}</p>
              <p className={styles.subtitle}>{vehicleSelected?.plate_number}</p>
            </Col>
            <Col span={2}>
            <Divider type="vertical" className={styles.divider} />
            </Col>
            <Col span={11} style={{display: "flex", justifyContent: "flex-end"}}>
              <p className={styles.subtitle}>{driver?.name} {driver?.last_name} - {driver?.phone}</p>
            </Col> 
          </Flex>
        )}
      </Flex>
      <Flex vertical className={styles.sectionWraper} >
        <p className={styles.subtitle}>Comentarios</p>
        <div className={styles.textArea}>
          <TextArea
            rows={4}
            onChange={(event) => {
              setObservation(event.target.value);
            }}
          />
        </div>
      </Flex>
      <Flex className={styles.confirmation} gap={16}>
        <CheckboxButton onChange={() => onConfirmation(isNextStepActive)} />
        <div className={styles.text}>Conozco y confirmo que el conductor asignado debe cumplir con el requerimiento #1234567</div>
      </Flex>
    </Flex>
  );
}
