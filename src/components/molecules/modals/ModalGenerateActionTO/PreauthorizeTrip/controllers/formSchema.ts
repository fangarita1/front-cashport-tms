import * as Yup from "yup";

const fileObjectSchema = Yup.object().shape({
  docReference: Yup.string().notRequired(),
  file: Yup.mixed().notRequired(),
  aditionalData: Yup.mixed().notRequired()
});

const preAutorizationSchema = Yup.object().shape({
  idPA: Yup.string().required("El ID es obligatorio"),
  date: Yup.date().required("La fecha es obligatoria"),
  value: Yup.number().required("El valor es obligatiorio").nullable(),
  evidence: fileObjectSchema.notRequired()
});

export const preautorizationsFormSchema = Yup.object().shape({
  preauthorizations: Yup.array()
    .of(preAutorizationSchema)
    .min(1, "Debe incluir al menos una preautorización")
    .required("El campo preauthorizations es obligatorio")
});
