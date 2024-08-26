import dayjs from "dayjs";
import { Invoice, PA, PreAutorizationInfo, UploadInvoiceForm } from "./uploadinvoice.types";

// Valor por defecto para un objeto de tipo `Invoice`
const defaultInvoice: Invoice = {
  id: 0,
  date: dayjs(), // Fecha actual como valor por defecto
  value: 0,
  pdfFile: undefined,
  xmlFile: undefined
};

// Valor por defecto para un objeto de tipo `PreAutorizationInfo`
const defaultPreAutorizationInfo: PreAutorizationInfo = {
  id: 0,
  idAuthorization: "",
  date: dayjs(), // Fecha actual como valor por defecto
  value: 0,
  link: ""
};

// Valor por defecto para un objeto de tipo `PA`
const defaultPA: PA = {
  info: defaultPreAutorizationInfo,
  invoice: defaultInvoice
};

// Valor por defecto para un objeto de tipo `UploadInvoiceForm`
const defaultUploadInvoiceForm: UploadInvoiceForm = {
  pas: [defaultPA] // Array con un elemento PA por defecto
};

export { defaultInvoice, defaultPreAutorizationInfo, defaultPA, defaultUploadInvoiceForm };
