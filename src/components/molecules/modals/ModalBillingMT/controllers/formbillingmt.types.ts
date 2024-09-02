import { FileObject } from "@/components/atoms/UploadDocumentButton/UploadDocumentButton";

export interface FileWithLink extends FileObject {
  link?: string;
}

export interface EvidenceByVehicleForm {
  plate: string;
  idVehicle: number;
  documents: FileWithLink[];
}
// Empty structure based on the provided interfaces
export const emptyForm: EvidenceByVehicleForm = {
  plate: "",
  idVehicle: 0,
  documents: [
    {
      docReference: "",
      file: undefined, // No file uploaded yet
      aditionalData: undefined // Empty object for additional data
    }
  ]
};

// Mock data based on the provided interfaces
export const mockData: EvidenceByVehicleForm = {
  plate: "ABC1234",
  idVehicle: 177,
  documents: [
    {
      docReference: "doc-123",
      aditionalData: undefined,
      file: undefined,
      link: "https://cashport-tms.s3.us-east-2.amazonaws.com/develop/billing/c546c9bc2cd720e3-PDF-prueba-2.pdf"
    },
    {
      docReference: "doc-124",
      aditionalData: undefined,
      file: undefined,
      link: "https://cashport-tms.s3.us-east-2.amazonaws.com/develop/billing/c546c9bc2cd720e3-PDF-prueba-2.pdf"
    }
  ]
};
