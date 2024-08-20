"use client";
import React from "react";
import { Flex } from "antd";
import styles from "./buttons.module.scss";

interface ButtonsProps {
  isRightSectionVisible?: boolean;
  isRightButtonActive?: boolean;
  isLeftButtonActive?: boolean;
  isLastStep?: boolean;
  handleNext: () => void;
  handleBack: () => void;
  handleReject: () => void;
}

export default function Buttons({
  isRightSectionVisible = true,
  isRightButtonActive,
  isLeftButtonActive,
  isLastStep,
  handleNext,
  handleBack,
  handleReject
}: Readonly<ButtonsProps>) {
  return (
    <Flex className={styles.wrapper}>
      <div className={styles.left}>
        <button
          className={styles.backButton}
          disabled={!isLeftButtonActive}
          style={{ cursor: isLeftButtonActive ? "pointer" : "not-allowed" }}
          onClick={handleBack}
        >
          <b>Atras</b>
        </button>
      </div>
      {isRightSectionVisible && 
      <Flex className={styles.right}>
        <button className={styles.deleteButton} onClick={() => handleReject()}>Rechazar</button>
        <button
          className={styles.nextButton}
          disabled={!isRightButtonActive}
          style={{
            backgroundColor: isRightButtonActive ? "#CBE71E" : "#DDDDDD",
            color: isRightButtonActive ? "black" : "white",
            cursor: isRightButtonActive ? "pointer" : "not-allowed"
          }}
          onClick={handleNext}
        >
          {isLastStep ? "Finalizar" : "Siguiente"}
        </button>
      </Flex>}
    </Flex>
  );
}
