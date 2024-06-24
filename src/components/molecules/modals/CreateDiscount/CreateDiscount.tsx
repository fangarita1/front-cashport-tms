import { Flex, Select, Typography } from "antd";
import "./createDiscount.scss";
import { Controller, useForm } from "react-hook-form";
import { InputForm } from "@/components/atoms/inputs/InputForm/InputForm";

import { InputDateForm } from "@/components/atoms/inputs/InputDate/InputDateForm";

const { Text, Title } = Typography;

interface IformDiscount {
  motive: string;
  percentage: number;
  amount: number;
  validity_range: {
    start: string;
    end: string;
  };
}
interface Props {
  onClose: () => void;
}

export const CreateDiscount = ({ onClose }: Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty }
  } = useForm<IformDiscount>();
  return (
    <div className="createDicountCustom">
      <p className="subTitleModalAction">Ingresa la información para crear el nuevo descuento</p>
      <form
        className="modalContent"
        onSubmit={handleSubmit((data) => {
          console.log(data);
        })}
      >
        <div className="containterForm">
          <Flex vertical className="containerInput">
            <Title className="input-form-title" level={5}>
              Motivo
            </Title>
            <Controller
              name="motive"
              control={control}
              rules={{ required: true }}
              render={({ field }) => {
                return (
                  <Select
                    placeholder="Seleccionar motivo"
                    className={errors.motive ? "selectInputError" : "selectInput"}
                    loading={false}
                    variant="borderless"
                    optionLabelProp="label"
                    {...field}
                  >
                    <Select.Option value="1">Opción 1</Select.Option>
                    <Select.Option value="2">Opción 2</Select.Option>
                    <Select.Option value="3">Opción 3</Select.Option>
                  </Select>
                );
              }}
            />
            <Text className="textError">{errors.motive && "Campo obligatorio *"}</Text>
          </Flex>
          <div />
          <InputForm
            titleInput="Cupo total"
            nameInput="amount"
            control={control}
            error={errors.amount}
            placeholder="Ingresar valor"
            typeInput="number"
            customStyle={{ width: "100%" }}
          />
          <InputForm
            titleInput="Porcentaje a aplicar"
            nameInput="percentage"
            control={control}
            error={errors.amount}
            placeholder="Ingresar valor"
            typeInput="number"
            customStyle={{ width: "100%" }}
          />
          <InputDateForm
            titleInput="Fecha de emisión"
            nameInput="validity_range.start"
            placeholder="Seleccionar fecha de emisión"
            control={control}
            error={errors.amount}
          />

          <InputDateForm
            titleInput="Rango de vigencia *opcional"
            nameInput="validity_range.end"
            control={control}
            placeholder="Seleccionar fecha de vigencia"
            error={errors.amount}
          />
        </div>
        <Flex gap="8px">
          <button
            type="button"
            className="button__action__text button__action__text__white"
            onClick={() => onClose()}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className={`button__action__text ${isDirty ? "button__action__text__green" : ""}`}
            onClick={() => onClose()}
          >
            Crear descuento
          </button>
        </Flex>
      </form>
    </div>
  );
};
