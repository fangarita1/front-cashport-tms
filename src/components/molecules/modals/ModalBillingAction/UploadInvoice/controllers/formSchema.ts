import * as Yup from "yup";

const fileObjectSchema = Yup.object().shape({
  docReference: Yup.string().notRequired(),
  file: Yup.mixed().notRequired(),
  aditionalData: Yup.mixed().notRequired()
});

const invoiceSchema = Yup.object().shape({
  id: Yup.string().required("El ID es obligatorio").nullable(),
  date: Yup.date().required("La fecha es obligatoria"),
  value: Yup.number().nullable(),
  pdfFile: fileObjectSchema.notRequired(), // No es obligatorio
  xmlFile: fileObjectSchema.notRequired() // No es obligatorio
});

const preAutorizationInfoSchema = Yup.object().shape({
  idAuthorization: Yup.string().nullable(),
  id: Yup.number().nullable(),
  date: Yup.mixed().nullable(),
  value: Yup.number().nullable(),
  link: Yup.string().nullable()
});

const paSchema = Yup.object().shape({
  info: preAutorizationInfoSchema.nullable(),
  invoice: invoiceSchema.required()
});

export const uploadInvoiceFormSchema = Yup.object().shape({
  pas: Yup.array()
    .of(paSchema)
    .min(1, "Debe incluir al menos un PA")
    .required("El campo PAS es obligatorio")
});
