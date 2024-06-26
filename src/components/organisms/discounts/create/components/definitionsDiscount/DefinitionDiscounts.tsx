import { Controller, useForm } from "react-hook-form";
import style from "./DefinitionDiscounts.module.scss";
import { DatePicker, Flex, Select, Switch, Typography } from "antd";
import { InputForm } from "@/components/atoms/inputs/InputForm/InputForm";
import FeatByOrder from "./feats/featByOrder/FeatByOrder";
import FeatByCient from "./feats/featByClient/FeatByClient";

const { Title, Text } = Typography;

const byOrderTypes = [1, 2, 3, 4];
const byClientTypes = [5, 6];

export default function DefinitionDiscounts() {
  const options = [
    { label: "Cantidad", value: 1 },
    { label: "Monto", value: 2 },
    { label: "Cross-Selling", value: 3 },
    { label: "Cross-Filler", value: 4 },
    { label: "Primera compra", value: 5 },
    { label: "Todas las compras", value: 6 },
    { label: "Plan Anual", value: 7 }
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
        <Title level={4}>Definiciones</Title>
        <Flex vertical>
          <Text type="secondary">Tipo de descuento</Text>
          <Controller
            name="general.discount_type"
            rules={{ required: true }}
            control={control}
            render={({ field }) => {
              return (
                <Select
                  placeholder="Tipo de descuento"
                  placement="bottomLeft"
                  labelRender={(e) => e.label}
                  className={`${style.selectInput} translate `}
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
        <Flex gap={40} align="center">
          <Switch
            style={{ width: "fit-content", transform: "scale(2) translateX(25%)" }}
            size="small"
          />
          <Text type="secondary">No tiene fin</Text>
        </Flex>
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
        {byOrderTypes.includes(watch("general.discount_type")) && (
          <FeatByOrder discountType={watch("general.discount_type")}></FeatByOrder>
        )}
        {byClientTypes.includes(watch("general.discount_type")) && (
          <FeatByCient></FeatByCient>
        )}
      </Flex>
  );
}
