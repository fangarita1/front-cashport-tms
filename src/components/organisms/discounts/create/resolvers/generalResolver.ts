import { UseFormReturn } from "react-hook-form";
import * as yup from "yup";

const yesterday = (date: string) => new Date(new Date(date).setDate(new Date(date).getDate() - 1));
const tomorrow = (date: string) => {
  return new Date(new Date(date).setDate(new Date(date).getDate() + 1));
};

export const generalResolver = yup.object({
  name: yup
    .string()
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .required("El nombre es requerido"),
  description: yup
    .string()
    .min(3, "La descripción debe tener al menos 3 caracteres")
    .required("La descripción es requerida"),
  discount_type: yup.number().optional().required("El tipo de descuento es requerido"),
  start_date: yup
    .date()
    .required("La fecha de inicio es requerida")
    .min(yesterday(new Date() as any), "La fecha de inicio debe ser menor a hoy"),
  end_date: yup.date().when("is_active", {
    is: (checkbox: boolean) => {console.log(checkbox); return checkbox === false || checkbox === undefined},
    then: () =>
      yup
        .date()
        .test({
          name: "min",
          message: "La fecha de fin debe ser mayor a la fecha de inicio",
          test: (end_date, context) =>{
            console.log("end",new Date(end_date || ""));
            console.log("start",context.parent.start_date);
            console.log( "tomorr",tomorrow(context.parent.start_date));
            console.log(new Date(end_date || "") >= tomorrow(context.parent.start_date));
           return new Date(end_date || "") >= tomorrow(context.parent.start_date)}
        })
        .required("La fecha de fin es requerida"),
    otherwise: (a) => {
      console.log("no");
      return a.nullable().default(null);
    }
  }),
  discount_value: yup.number().required("El valor del descuento es requerido"),
  is_active: yup.boolean().optional()
});

export interface DiscountSchema {
  name: string;
  description: string;
  discount_type: number | null;
  start_date: Date;
  end_date?: Date | undefined;
  is_active?: boolean | undefined;
}

export type DiscountResolverShape = UseFormReturn<DiscountSchema, any, undefined>;
