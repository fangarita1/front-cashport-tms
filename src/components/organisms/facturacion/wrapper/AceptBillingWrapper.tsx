"use client";
import Wrapper from "../../wrapper/Wrapper";
import { Flex } from "antd";
import styles from "./AceptBillingWrapper.module.scss";

export default function AceptBillingWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Wrapper>
      <Flex vertical gap={"1.5rem"} className={styles.wrapper}>
        <Flex gap={"2rem"} justify="space-between" wrap="wrap">
          <p className={styles.title}>Facturación</p>
        </Flex>
        {children}
      </Flex>
    </Wrapper>
  );
}
