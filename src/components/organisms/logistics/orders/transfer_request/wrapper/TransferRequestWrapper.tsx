"use client";

import Wrapper from "@/components/organisms/wrapper/Wrapper";
import { Flex } from "antd";
import styles from "./TransferRequestWrapper.module.scss";
import { SectionTitle } from "@/components/atoms/SectionTitle/SectionTitle";

export default function TransferRequestWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Wrapper>
      <Flex vertical gap={"1rem"} className={styles.wrapper}>
        <Flex justify="space-between" wrap="wrap">
          <SectionTitle title="Ordenes de tranferencia" />
        </Flex>
        {children}
      </Flex>
    </Wrapper>
  );
}
