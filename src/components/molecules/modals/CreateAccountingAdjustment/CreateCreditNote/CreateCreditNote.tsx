import React from "react";
import { notification } from "antd";
import "./createCreditNote.scss";
import { useForm } from "react-hook-form";
import { InputForm } from "@/components/atoms/inputs/InputForm/InputForm";
import * as yup from "yup";
import { InputDateForm } from "@/components/atoms/inputs/InputDate/InputDateForm";
import { useFinancialDiscountMotives } from "@/hooks/useMotives";
import { yupResolver } from "@hookform/resolvers/yup";
import { createAccountingAdjustment } from "@/services/accountingAdjustment/accountingAdjustment";
import { InputSelect } from "@/components/atoms/inputs/InputSelect/InputSelect";
import { useAppStore } from "@/lib/store/store";
import { formatDateBars } from "@/utils/utils";
interface IformDiscount {
  motive: string;
  amount: number;
  validity_range: {
    start: Date;
    end: Date;
  };
}
interface Props {
  onClose: () => void;
}

const schema = yup.object().shape({
  motive: yup.string().required("Campo obligatorio"),
  amount: yup.number().min(0, "El valor no puede ser negativo").required("Campo obligatorio"),
  validity_range: yup.object().shape({
    start: yup.date().required("Campo obligatorio"),
    end: yup
      .date()
      .required("Campo obligatorio")
      .min(yup.ref("start"), "La fecha de vigencia debe ser mayor o igual a la fecha de emisión")
  })
});

export const CreateCreditNote = ({ onClose }: Props) => {
  const { ID } = useAppStore((state) => state.selectProject);
  const {
    control,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<IformDiscount>({
    resolver: yupResolver(schema)
  });
  const { data: motives, isLoading, isError } = useFinancialDiscountMotives();

  const [api, contextHolder] = notification.useNotification();

  const handleSubmitForm = async (data: IformDiscount) => {
    try {
      await createAccountingAdjustment({
        type: 2,
        motive: motives?.find((motive) => motive.name === data.motive)?.id || 1,
        ammount: data.amount,
        percentage: 0,
        date_of_issue: formatDateBars(data.validity_range.start.toISOString()),
        expiration_date: formatDateBars(data.validity_range.end.toISOString()),
        validity_range: {
          start: formatDateBars(data.validity_range.start.toISOString()),
          end: formatDateBars(data.validity_range.end.toISOString())
        },
        users_aproved: [142, 146], // TODO: users_aproved esta mal escrito ya que el back lo pide asi
        project_id: ID || 19,
        client_id: 98765232 // TODO: agregar cliente
      });

      api.success({
        message: "Descuento creado con éxito",
        description: `La nota de credito para el motivo ${data.motive} ha sido creado correctamente.`
      });
    } catch (error) {
      api.error({
        message: "Error al crear la nota de credito",
        description: "Hubo un problema al crear la nota de credito. Por favor, intente nuevamente."
      });
    }
  };

  return (
    <div className="createCreditCustom">
      {contextHolder}
      <p className="subTitleModalAction">Ingresa la información para crear el nuevo descuento</p>
      <form className="modalContent" onSubmit={handleSubmit(handleSubmitForm)}>
        <div className="containterForm">
          <InputSelect
            titleInput="Motivo"
            nameInput="motive"
            control={control}
            error={errors.motive}
            options={motives?.map((motive) => ({ value: motive.name, label: motive.name })) || []}
            loading={isLoading}
            isError={isError}
            placeholder="Seleccionar motivo"
          />
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
          <InputDateForm
            titleInput="Fecha de emisión"
            nameInput="validity_range.start"
            placeholder="Seleccionar fecha de emisión"
            control={control}
            error={errors.validity_range?.start}
          />
          <InputDateForm
            titleInput="Rango de vigencia *opcional"
            nameInput="validity_range.end"
            control={control}
            placeholder="Seleccionar fecha de vigencia"
            error={errors.validity_range?.end}
          />
          <button
            type="button"
            className="button__action__text button__action__text__white"
            onClick={() => onClose()}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className={`button__action__text ${isValid ? "button__action__text__green" : ""}`}
          >
            Crear descuento
          </button>
        </div>
      </form>
    </div>
  );
};
