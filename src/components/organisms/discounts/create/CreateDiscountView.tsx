"use client";
import styles from "./CreateDiscountView.module.scss";
import { Flex, message } from "antd";
import HeaderDiscountType from "./components/headerDiscountType/HeaderDiscountType";
import DefinitionDiscounts from "./components/definitionsDiscount/DefinitionDiscounts";
import PrincipalButton from "@/components/atoms/buttons/principalButton/PrincipalButton";
import { useState } from "react";
import AnnualDiscountDefinition from "./components/annualDiscountDefinition/AnnualDiscountDefinition";

const commonDiscount = [1, 2];
const annualDiscount = [3];

export function CreateDiscountView() {
  const [messageApi, contextHolder] = message.useMessage();
  const [selectedType, setSelectedType] = useState<number>(1);
  const handleClick = (type: number) => {
    setSelectedType(type);
  };

  return (
    <>
      {contextHolder}
      <Flex className={styles.mainCreateDiscount}>
        <HeaderDiscountType selectedType={selectedType} handleClick={handleClick} />
        {commonDiscount.includes(selectedType) && <DefinitionDiscounts />}
        {annualDiscount.includes(selectedType) && <AnnualDiscountDefinition />}
        <Flex gap={20} justify="end">
          <PrincipalButton className={styles.button}>Crear</PrincipalButton>
        </Flex>
      </Flex>
    </>
  );
}
