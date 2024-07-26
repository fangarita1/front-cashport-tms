"use client"
import Wrapper from "../../wrapper/Wrapper";
import { Flex, Typography } from "antd";
import styles from "./ProvidersWrapper.module.scss";
import { ReactNode } from "react";

const { Title } = Typography;

export default function ProvidersWrapper({children}: {children: React.ReactNode}) {
  return (
    <Wrapper>
      <Flex vertical gap={"1.5rem"} className={styles.wrapper}>
        <Flex gap={"2rem"} justify="space-between" wrap="wrap">
          <Title level={2} className={styles.title}>
            Ordenes de transferencia
          </Title>
        </Flex>
        {children}
      </Flex>
    </Wrapper>
  )
}
