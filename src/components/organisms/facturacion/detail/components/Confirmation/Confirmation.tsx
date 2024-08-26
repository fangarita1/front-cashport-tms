import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Flex, Switch } from "antd";
import { ICarrierRequestDrivers, ICarrierRequestVehicles } from "@/types/logistics/schema";
import styles from "./confirmation.module.scss";
import TextArea from "antd/es/input/TextArea";
import CheckboxButton from "@/components/atoms/CheckboxButton/CheckboxButton";

interface ConfirmationProps {
  driverSelected: ICarrierRequestDrivers;
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
      <Flex className={styles.topInfo}>
        <Flex className={styles.left}>
          <div className={styles.vehicle}>
            <b>
              {vehicleSelected?.brand} {vehicleSelected?.color}
            </b>
          </div>
          <div>
            <b>{vehicleSelected?.plate_number}</b>
          </div>
        </Flex>
        <hr style={{ borderTop: "1px solid #DDDDDD" }} />
        <Flex className={styles.right}>
          <div className={styles.driver}>
            <b>
              {driverSelected?.name} - {driverSelected?.phone}
            </b>
          </div>
        </Flex>
      </Flex>
      <Flex className={styles.bottomInfo}>
        <div className={styles.section}>
          <b>Comentarios</b>
        </div>
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
