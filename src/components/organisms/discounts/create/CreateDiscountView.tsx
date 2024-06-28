"use client";
import styles from "./CreateDiscountView.module.scss";
import { Flex, message } from "antd";
import HeaderDiscountType from "./components/headerDiscountType/HeaderDiscountType";
import DefinitionDiscounts from "./components/definitionsDiscount/DefinitionDiscounts";
import PrincipalButton from "@/components/atoms/buttons/principalButton/PrincipalButton";
import { useEffect, useState } from "react";
import AnnualDiscountDefinition from "./components/annualDiscountDefinition/AnnualDiscountDefinition";
import discountCategories from "../constants/discountTypes";
import { UseFormReturn, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { DiscountSchema, generalResolver } from "./resolvers/generalResolver";

const commonDiscount = [discountCategories.byOrder.id, discountCategories.byClient.id];
const annualDiscount = [discountCategories.annual.id];

export function CreateDiscountView() {
  const [messageApi, contextHolder] = message.useMessage();
  const [selectedType, setSelectedType] = useState<number>(1);
  const handleClick = (type: number) => {
    setSelectedType(type);
  };
  const form = useForm({
    resolver: yupResolver(generalResolver)
  });

  const handleExecCallback = () => form.handleSubmit((e) => console.log(e))();

  return (
    <>
      {contextHolder}
      <Flex className={styles.mainCreateDiscount}>
        <HeaderDiscountType selectedType={selectedType} handleClick={handleClick} />
        {commonDiscount.includes(selectedType) && (
          <DefinitionDiscounts form={form} selectedType={selectedType} />
        )}
        {annualDiscount.includes(selectedType) && (
          <AnnualDiscountDefinition form={form} selectedType={selectedType} />
        )}
        <Flex gap={20} justify="end">
          <PrincipalButton className={styles.button} onClick={handleExecCallback}>
            Crear
          </PrincipalButton>
        </Flex>
      </Flex>
    </>
  );
}
