"use client";
import Wrapper from "../../../wrapper/Wrapper";
import { Flex } from "antd";
import styles from "./AceptCarrierWrapper.module.scss";
import { SectionTitle } from "@/components/atoms/SectionTitle/SectionTitle";
import ViewWrapper from "@/components/organisms/ViewWrapper/ViewWrapper";

export default function AceptCarrierWrapper({ children }: { children: React.ReactNode }) {
  return <ViewWrapper headerTitle="Aceptación proveedor">{children}</ViewWrapper>;
}
