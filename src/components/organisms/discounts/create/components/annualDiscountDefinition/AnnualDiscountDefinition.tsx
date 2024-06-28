import { Controller, UseFormReturn, useFieldArray } from "react-hook-form";
import style from "./AnnualDiscountDefinition.module.scss";
import { DatePicker, Flex, Select, Typography } from "antd";
import { InputForm } from "@/components/atoms/inputs/InputForm/InputForm";
import { UploadDocumentButton } from "@/components/atoms/UploadDocumentButton/UploadDocumentButton";
import AnnualFeatures from "./annualFeatures/AnnualFeatures";
import { getOptionsByType } from "../../../constants/discountTypes";
import { useEffect, useState } from "react";
import { DiscountSchema } from "../../resolvers/generalResolver";
import { getAllByProject } from "@/services/clients/clients";
import { useAppStore } from "@/lib/store/store";

const { Title, Text } = Typography;

type Props = {
  selectedType: number;
  form: UseFormReturn<DiscountSchema, any, undefined>;
};

export default function AnnualDiscountDefinition({ selectedType, form }: Props) {
  const { ID: projectId } = useAppStore((project) => project.selectProject);
  const [loading, setLoading] = useState(false);
  const fetchClients = async () => {
    setLoading(true);
    try {
      const res = await getAllByProject({ idProject: projectId.toString() });
      console.log(res);
      setOptions(res?.map((client) => ({ label: client.client_name, value: client.nit })));
    } catch (error) {
      console.warn("error fetching clients: ", error);
    } finally {
      setLoading(false);
    }
  };

  const [options, setOptions] = useState<
    {
      label: string;
      value: number;
    }[]
  >([]);

  useEffect(() => {
    console.log(options);
  }, [options]);
  useEffect(() => {
    fetchClients();
  }, []);

  useEffect(() => {
    const options = getOptionsByType(selectedType);
    setValue("discount_type", options[0].value);
  }, [selectedType]);

  const {
    setValue,
    control,
    formState: { errors }
  } = form;

  const { fields, append } = useFieldArray({
    control,
    name: "annual_ranges"
  });

  return (
    <Flex className={style.HeaderContainer} vertical gap={20}>
      <Title level={4}>Selecciona cliente</Title>
      <Flex vertical>
        <Controller
          name="client"
          control={control}
          render={({ field }) => {
            return (
              <>
                <Select
                  placeholder="Selecciona cliente"
                  placement="bottomLeft"
                  labelRender={(e) => e.label}
                  className={`${style.selectInput} translate`}
                  loading={loading}
                  variant="borderless"
                  optionLabelProp="label"
                  options={options}
                  {...field}
                ></Select>
                <Text type="danger" hidden={!errors.client}>
                  {errors?.client?.message}
                </Text>
              </>
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
          error={errors.name}
          nameInput="name"
          titleInput="Nombre"
          className={style.input}
        ></InputForm>
        <InputForm
          control={control}
          error={errors.description}
          nameInput="description"
          titleInput="Descripción"
          className={style.inputDesc}
        ></InputForm>
      </Flex>
      <Title level={4}>Fechas</Title>
      <Flex gap={20}>
        <Flex vertical>
          <Controller
            name="start_date"
            control={control}
            render={({ field }) => {
              return (
                <>
                  <Text type="secondary">Inicio</Text>
                  <DatePicker
                    className={style.inputDatePicker}
                    placeholder="Inicio"
                    type="secondary"
                    {...field}
                  ></DatePicker>
                  <Text type="danger" style={{ textWrap: "wrap" }} hidden={!errors.start_date}>
                    {errors?.start_date?.message}
                  </Text>
                </>
              );
            }}
          />
        </Flex>
        <Flex vertical>
          <Controller
            name="end_date"
            control={control}
            render={({ field }) => {
              return (
                <>
                  <Text type="secondary">Fin</Text>
                  <DatePicker
                    className={style.inputDatePicker}
                    placeholder="Fin"
                    type="secondary"
                    {...field}
                  ></DatePicker>
                  <Text type="danger" style={{ textWrap: "wrap" }} hidden={!errors.end_date}>
                    {errors?.end_date?.message}
                  </Text>
                </>
              );
            }}
          />
        </Flex>
      </Flex>
      <hr></hr>
      <Title level={4}>Características del descuento</Title>
      <Title level={5}>Productos a aplicar</Title>
      <AnnualFeatures form={form} fields={fields} append={append}></AnnualFeatures>
    </Flex>
  );
}
