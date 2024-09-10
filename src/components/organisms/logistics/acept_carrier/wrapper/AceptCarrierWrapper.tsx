"use client";
import Wrapper from "../../../wrapper/Wrapper";
import { Flex } from "antd";
import styles from "./AceptCarrierWrapper.module.scss";
import { SectionTitle } from "@/components/atoms/SectionTitle/SectionTitle";

export default function AceptCarrierWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Wrapper>
      <Flex vertical gap={"1rem"} className={styles.wrapper}>
        <SectionTitle title="Aceptación proveedor" />
        {children}
      </Flex>
    </Wrapper>
  );
}
