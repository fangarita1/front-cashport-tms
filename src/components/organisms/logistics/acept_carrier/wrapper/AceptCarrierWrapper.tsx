"use client"
import Wrapper from "../../../wrapper/Wrapper";
import { Flex } from "antd";
import styles from "./AceptCarrierWrapper.module.scss";

export default function AceptCarrierWrapper({children}: {children: React.ReactNode}) {
  return (
    <Wrapper>
      <Flex vertical gap={"1.5rem"} className={styles.wrapper}>
        <Flex gap={"2rem"} justify="space-between" wrap="wrap">
          <p className={styles.heading}>
              Aceptación proveedor
          </p>
        </Flex>
        {children}
      </Flex>
    </Wrapper>
  )
}
