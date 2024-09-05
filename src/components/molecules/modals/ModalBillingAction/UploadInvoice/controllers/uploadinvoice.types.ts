import { FileObject } from "@/components/atoms/UploadDocumentButton/UploadDocumentButton";
import { Dayjs } from "dayjs";

export interface FileObjectWithLink extends FileObject {
  link?: string;
}

export interface Invoice {
  id?: string;
  date?: Dayjs | null;
  value: number;
  pdfFile?: FileObjectWithLink;
  xmlFile?: FileObjectWithLink;
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

export interface IBillingInfoAPI {
  id: number;
  idTransferRequest: number;
  idCarrier: number;
  carrier: string;
  startLocation: string;
  endLocation: string;
  startDate: string;
  endDate: string;
  serviceTypes: string;
  fare: number;
  statusDesc: string;
  idStatus: string;
  statusColor: string;
}
