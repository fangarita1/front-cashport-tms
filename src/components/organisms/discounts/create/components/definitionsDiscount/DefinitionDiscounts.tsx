import { Controller, UseFormReturn } from "react-hook-form";
import style from "./DefinitionDiscounts.module.scss";
import { DatePicker, Flex, Select, Switch, Typography } from "antd";
import { InputForm } from "@/components/atoms/inputs/InputForm/InputForm";
import FeatByOrder from "./feats/featByOrder/FeatByOrder";
import FeatByCient from "./feats/featByClient/FeatByClient";
import { getOptionsByType } from "../../../constants/discountTypes";
import { useEffect, useMemo, useState } from "react";
import { DiscountSchema } from "../../resolvers/generalResolver";

const { Title, Text } = Typography;

const byOrderTypes = [1, 2, 3, 4];
const byClientTypes = [5, 6];

type Props = {
  selectedType: number;
  form: UseFormReturn<DiscountSchema, any, undefined>;
};

export default function DefinitionDiscounts({ selectedType, form }: Props) {
  const {
    watch,
    setValue,
    getValues,
    trigger,
    control,
    resetField,
    formState: { errors }
  } = form;

  const options = useMemo(() => getOptionsByType(selectedType), [selectedType]);

  useEffect(() => {
    resetField("discount_type");
  }, [selectedType]);

  useEffect(() => {
    console.log(getValues("ranges"));
  }, [watch("ranges")]);

  const [oldValue, setOldValue] = useState<Date | undefined>(undefined);
  useEffect(() => {
    if (watch("is_active")) {
      setOldValue(getValues("end_date"));
      setValue("end_date", undefined, { shouldValidate: true });
    } else {
      setValue("end_date", oldValue, { shouldValidate: true });
    }
  }, [watch("start_date"), watch("is_active")]);

  return (
    <Flex className={style.HeaderContainer} vertical gap={20}>
      <Title level={4}>Definiciones</Title>
      <Flex vertical>
        <Text type="secondary">Tipo de descuento</Text>
        <Controller
          name="discount_type"
          rules={{ required: true }}
          control={control}
          render={({ field }) => {
            return (
              <>
                <Select
                  placeholder="Tipo de descuento"
                  placement="bottomLeft"
                  labelRender={(e) => e.label}
                  className={`${style.selectInput} translate `}
                  loading={false}
                  variant={"borderless"}
                  optionLabelProp="label"
                  options={options}
                  {...field}
                ></Select>
                <Text type="danger" hidden={!errors.discount_type}>
                  {errors?.discount_type?.message}
                </Text>
              </>
            );
          }}
        />
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
      <Controller
        name="is_active"
        control={control}
        render={({ field }) => {
          return (
            <Flex gap={40} align="center">
              <Switch
                style={{ width: "fit-content", transform: "scale(2) translateX(25%)" }}
                size="small"
                {...field}
              />
              <Text type="secondary">No tiene fin</Text>
            </Flex>
          );
        }}
      />
      <Flex gap={20}>
        <Flex vertical>
          <Controller
            name="start_date"
            control={control}
            render={({ field: { value, ...field } }) => {
              console.log(value);
              return (
                <>
                  <Text type="secondary">Inicio</Text>
                  <DatePicker
                    className={style.inputDatePicker}
                    placeholder="Inicio"
                    type="secondary"
                    format="YYYY-MM-DD"
                    value={value}
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
            render={({ field: { onChange, ...field } }) => {
              return (
                <>
                  <Text type="secondary">Fin</Text>
                  <DatePicker
                    disabled={watch("is_active")}
                    className={style.inputDatePicker}
                    placeholder="Fin"
                    type="secondary"
                    onChange={(e) => {
                      onChange(e);
                      trigger("end_date");
                    }}
                    {...field}
                  ></DatePicker>
                  <Text type="danger" hidden={!errors.end_date}>
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
      {byOrderTypes.includes(watch("discount_type") || 0) && (
        <FeatByOrder discountType={watch("discount_type") || 0} form={form}></FeatByOrder>
      )}
      {byClientTypes.includes(watch("discount_type") || 0) && (
        <FeatByCient discountType={watch("discount_type") || 0} form={form}></FeatByCient>
      )}
    </Flex>
  );
}
