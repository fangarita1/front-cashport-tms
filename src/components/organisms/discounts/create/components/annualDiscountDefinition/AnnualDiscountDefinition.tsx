import { Controller, useForm } from "react-hook-form";
import style from "./AnnualDiscountDefinition.module.scss";
import { DatePicker, Flex, Select, Typography } from "antd";
import { InputForm } from "@/components/atoms/inputs/InputForm/InputForm";
import { UploadDocumentButton } from "@/components/atoms/UploadDocumentButton/UploadDocumentButton";
import AnnualFeatures from "./annualFeatures/AnnualFeatures";
import { getOptionsByType } from "../../../constants/discountTypes";
import { useMemo } from "react";

const { Title, Text } = Typography;

type Props = {
  selectedType: number;
};

export default function AnnualDiscountDefinition({selectedType}: Props) {
  const _ = useMemo(() => getOptionsByType(selectedType), [selectedType]);

  const options = [
    { label: "cliente 1", value: 1 },
    { label: "cliente 2", value: 2 },
    { label: "cliente 3", value: 3 },
    { label: "cliente 4", value: 4 },
    { label: "cliente 5", value: 5 },
    { label: "cliente 6", value: 6 },
    { label: "cliente 7", value: 7 }
  ];

  const {
    watch,
    setValue,
    getValues,
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty }
  } = useForm();

  return (
    <Flex className={style.HeaderContainer} vertical gap={20}>
      <Title level={4}>Selecciona cliente</Title>
      <Flex vertical>
        <Controller
          name="general.client"
          control={control}
          render={({ field }) => {
            return (
              <Select
                placeholder="Selecciona cliente"
                placement="bottomLeft"
                labelRender={(e) => e.label}
                className={`${style.selectInput} translate`}
                loading={false}
                variant="borderless"
                optionLabelProp="label"
                options={options}
                {...field}
              ></Select>
            );
          }}
        />
      </Flex>
        <Title level={4}>Adjuntar contrato</Title>
      <Flex gap={20}>
        <UploadDocumentButton title="Contrato" isMandatory={true} setFiles={() => {}} />
      </Flex>
      <Title level={4}>Descripción</Title>
      <Flex gap={20}>
        <InputForm
          control={control}
          error={undefined}
          nameInput="general.name"
          titleInput="Nombre"
          className={style.input}
        ></InputForm>
        <InputForm
          control={control}
          error={undefined}
          nameInput="general.description"
          titleInput="Descripción"
          className={style.inputDesc}
        ></InputForm>
      </Flex>
      <Title level={4}>Fechas</Title>
      <Flex gap={20}>
        <Flex vertical>
          <Text type="secondary">Inicio</Text>
          <DatePicker
            className={style.inputDatePicker}
            placeholder="Inicio"
            type="secondary"
          ></DatePicker>
        </Flex>
        <Flex vertical>
          <Text type="secondary">Fin</Text>
          <DatePicker
            className={style.inputDatePicker}
            placeholder="Fin"
            type="secondary"
          ></DatePicker>
        </Flex>
      </Flex>
      <hr></hr>
      <Title level={4}>Características del descuento</Title>
      <Title level={5}>Productos a aplicar</Title>
      <AnnualFeatures></AnnualFeatures>
    </Flex>
  );
}
