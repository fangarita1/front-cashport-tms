"use client";
import styles from "./CreateDiscountView.module.scss";
import { Flex, message } from "antd";
import HeaderDiscountType from "./components/headerDiscountType/HeaderDiscountType";
import DefinitionDiscounts from "./components/definitionsDiscount/DefinitionDiscounts";
import PrincipalButton from "@/components/atoms/buttons/principalButton/PrincipalButton";
import { useEffect, useState } from "react";
import AnnualDiscountDefinition from "./components/annualDiscountDefinition/AnnualDiscountDefinition";
import discountCategories from "../constants/discountTypes";
import { set, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { DiscountSchema, generalResolver } from "./resolvers/generalResolver";
import { createDiscount, getDiscount } from "@/services/discount/discount.service";
import { useAppStore } from "@/lib/store/store";
import { FileObject } from "@/components/atoms/UploadDocumentButton/UploadDocumentButton";
import dayjs from "dayjs";

const commonDiscount = [discountCategories.byOrder.id, discountCategories.byClient.id];
const annualDiscount = [discountCategories.annual.id];

type Props = {
  params?: { id: string };
};

export function CreateDiscountView({ params }: Props) {
  const [messageApi, contextHolder] = message.useMessage();
  const [selectedType, setSelectedType] = useState<number>(1);
  const { ID } = useAppStore((project) => project.selectProject);
  const [loading, setLoading] = useState(true);
  const [files, setFiles] = useState<FileObject[]>([]);
  const [defaultDiscount, setDefaultDiscount] = useState<DiscountSchema>({
    name: "",
    description: "",
    discount_type: undefined,
    start_date: new Date(),
    is_active: true,
    products_category: [],
    min_order: 0,
    computation_type: 1,
    client_groups: [],
    discount: 0,
    ranges: [],
    annual_ranges: [],
    end_date: new Date(),
    client: undefined
  });

  const fetchDiscount = async () => {
    setLoading(true);
    try {
      const { data } = await getDiscount(Number(params?.id));
      setLoading(false);
      return {
        description: data.description,
        discount_type: data.discount_type_id,
        start_date: dayjs(data.start_date) as any,
        is_active: !!data.status,
        name: data.discount_name,
        products_category: data.productsCategory?.map((e) => e.id_product) || [],
        min_order: data.min_units_by_order,
        computation_type: data.discount_computation,
        client_groups: data.clientGroups?.map((e) => e.id_clientgroup) || [],
        discount: data.discount_computation,
        ranges:
          data.ranges?.map((e) => ({
            id: e.id,
            unitsMin: e.units_from || e.min_units_by_order_by_sku || e.min_channel,
            unitsMax: e.units_to || e.min_units_by_channel,
            discount: e.discount
          })) || [],
        annual_ranges:
          data.contracts?.map((e) => ({
            idLine: e.id_line,
            units: e.units,
            idContract: e.id_discount_contracts_ranges
          })) || []
      };
    } catch (e) {
      console.error(e);
    }
    return defaultDiscount;
  };

  useEffect(() => {
    if (params?.id) {
      fetchDiscount();
    }
  }, [params?.id]);

  const handleClick = (type: number) => {
    setSelectedType(type);
  };
  const form = useForm({
    resolver: yupResolver(generalResolver),
    defaultValues: Number(params?.id) ? fetchDiscount : undefined
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
