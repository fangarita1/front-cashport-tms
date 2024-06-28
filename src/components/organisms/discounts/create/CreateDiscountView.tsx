"use client";
import styles from "./CreateDiscountView.module.scss";
import { Flex, message } from "antd";
import HeaderDiscountType from "./components/headerDiscountType/HeaderDiscountType";
import DefinitionDiscounts from "./components/definitionsDiscount/DefinitionDiscounts";
import PrincipalButton from "@/components/atoms/buttons/principalButton/PrincipalButton";
import { useEffect, useState } from "react";
import AnnualDiscountDefinition from "./components/annualDiscountDefinition/AnnualDiscountDefinition";
import discountCategories from "../constants/discountTypes";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { DiscountSchema, generalResolver } from "./resolvers/generalResolver";
import { createDiscount } from "@/services/discount/discount.service";
import { useAppStore } from "@/lib/store/store";
import { FileObject } from "@/components/atoms/UploadDocumentButton/UploadDocumentButton";

const commonDiscount = [discountCategories.byOrder.id, discountCategories.byClient.id];
const annualDiscount = [discountCategories.annual.id];

export function CreateDiscountView() {
  const [messageApi, contextHolder] = message.useMessage();
  const [selectedType, setSelectedType] = useState<number>(1);
  const { ID } = useAppStore((project) => project.selectProject);
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<FileObject[]>([]);
  const handleClick = (type: number) => {
    setSelectedType(type);
  };
  const form = useForm({
    resolver: yupResolver(generalResolver)
  });
  const { errors } = form.formState;
  useEffect(() => {
    console.log(errors);
  }, [errors]);

  const handlePostDiscount = async (e: DiscountSchema) => {
    setLoading(true);
    try {
      console.log(e);

      const res = await createDiscount({ ...e, project_id: ID }, files);
      console.log(res);
      messageApi.success("Discount created successfully");
    } catch (e: any) {
      messageApi.error(e.message);
      console.error(e);
    }
    setLoading(false);
  };

  const handleExecCallback = form.handleSubmit(handlePostDiscount);

  return (
    <>
      {contextHolder}
      <Flex className={styles.mainCreateDiscount}>
        <HeaderDiscountType selectedType={selectedType} handleClick={handleClick} />
        {commonDiscount.includes(selectedType) && (
          <DefinitionDiscounts form={form} selectedType={selectedType} />
        )}
        {annualDiscount.includes(selectedType) && (
          <AnnualDiscountDefinition form={form} selectedType={selectedType} setFiles={setFiles} />
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
