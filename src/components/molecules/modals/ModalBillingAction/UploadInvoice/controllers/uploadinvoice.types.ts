import { FileObject } from "@/components/atoms/UploadDocumentButton/UploadDocumentButton";
import { Dayjs } from "dayjs";

export interface Invoice {
  id?: string;
  date?: Dayjs | null;
  value: number;
  pdfFile?: FileObject;
  xmlFile?: FileObject;
}
export interface PreAutorizationInfo {
  idAuthorization: string;
  id: number;
  date: Dayjs;
  value: number;
  link: string;
}
export interface PA {
  info: PreAutorizationInfo;
  invoice: Invoice;
}
export interface UploadInvoiceForm {
  pas: PA[];
}
