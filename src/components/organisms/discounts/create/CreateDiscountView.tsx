"use client";
import styles from "./CreateDiscountView.module.scss";
import { Flex, message } from "antd";
import HeaderDiscountType from "./components/headerDiscountType/HeaderDiscountType";
import DefinitionDiscounts from "./components/definitionsDiscount/DefinitionDiscounts";

export function CreateDiscountView() {
  const [messageApi, contextHolder] = message.useMessage();

  return (
    <>
      {contextHolder}
      <Flex className={styles.mainCreateDiscount}>
          <HeaderDiscountType />
          <DefinitionDiscounts />
      </Flex>
    </>
  );
}
