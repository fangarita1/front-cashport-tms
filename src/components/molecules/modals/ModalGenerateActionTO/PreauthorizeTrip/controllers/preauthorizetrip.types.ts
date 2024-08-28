import { FileObject } from "@/components/atoms/UploadDocumentButton/UploadDocumentButton";
import { Dayjs } from "dayjs";

export interface Preauthorization {
  idPA: string;
  date: Dayjs | null;
  value: number | null;
  evidence?: FileObject;
}

export interface PreauthorizeTripForm {
  preauthorizations: Preauthorization[];
}
