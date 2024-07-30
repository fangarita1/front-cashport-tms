"use client";
import React from "react";
import { Flex } from "antd";
import styles from "./buttons.module.scss";

interface ButtonsProps {
  isRightButtonActive?: boolean;
  isLeftButtonActive?: boolean;
}

export default function Buttons({ isRightButtonActive, isLeftButtonActive }: ButtonsProps) {
  return (
    <Flex className={styles.wrapper}>
      <div className={styles.left}>
        <button
          className={styles.backButton}
          disabled={isLeftButtonActive}
          style={{ cursor: `${isLeftButtonActive ? "pointer" : "not-allowed"}` }}
        >
          <b>Atras</b>
        </button>
      </div>
      <Flex className={styles.right}>
        <button className={styles.deleteButton}>Rechazar</button>
        <button
          className={styles.nextButton}
          disabled={isRightButtonActive}
          style={{
            backgroundColor: `${isRightButtonActive ? "#CBE71E" : "#DDDDDD"}`,
            color: `${isRightButtonActive ? "black" : "white"}`,
            cursor: `${isRightButtonActive ? "pointer" : "not-allowed"}`
          }}
        >
          Siguiente
        </button>
      </Flex>
    </Flex>
  );
}
