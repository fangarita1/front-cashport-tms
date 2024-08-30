import { FileObject } from "@/components/atoms/UploadDocumentButton/UploadDocumentButton";

export interface FileWithLink extends FileObject {
  link?: string;
}
export interface IVehicle {
  plate: string;
  documents: FileWithLink[];
}
export interface ICarrier {
  carrier: string;
  idCarrier: number;
  vehicles: IVehicle[];
  adittionalComment: string;
}
export interface FinalizeTripForm {
  carriers: ICarrier[];
}

// Empty structure based on the provided interfaces
export const emptyForm: FinalizeTripForm = {
  carriers: [
    {
      carrier: "",
      idCarrier: 0, // Assuming 0 is used as a placeholder for no ID
      vehicles: [
        {
          plate: "",
          documents: [
            {
              docReference: "",
              file: undefined, // No file uploaded yet
              aditionalData: undefined // Empty object for additional data
            }
          ]
        }
      ],
      adittionalComment: ""
    }
  ]
};

// Mock data based on the provided interfaces
export const mockData: FinalizeTripForm = {
  carriers: [
    {
      carrier: "Fast Transport LLC",
      idCarrier: 1,
      vehicles: [
        {
          plate: "ABC1234",
          documents: [
            {
              docReference: "doc-123",
              aditionalData: undefined,
              file: undefined
            }
          ]
        },
        {
          plate: "XYZ5678",
          documents: [
            {
              docReference: "doc-125",
              aditionalData: undefined,
              file: undefined,
              link: "https://cashport-tms.s3.us-east-2.amazonaws.com/develop/billing/c546c9bc2cd720e3-PDF-prueba-2.pdf"
            }
          ]
        }
      ],
      adittionalComment: "Comentario para Fast Transport LLC"
    },
    {
      carrier: "Speedy Delivery Inc.",
      idCarrier: 2,
      vehicles: [
        {
          plate: "LMN8910",
          documents: [
            {
              docReference: "doc-126",
              aditionalData: undefined,
              file: undefined,
              link: "https://cashport-tms.s3.us-east-2.amazonaws.com/develop/billing/c546c9bc2cd720e3-PDF-prueba-2.pdf"
            },
            {
              docReference: "doc-127",
              aditionalData: undefined,
              file: undefined,
              link: "https://cashport-tms.s3.us-east-2.amazonaws.com/develop/billing/c546c9bc2cd720e3-PDF-prueba-2.pdf"
            }
          ]
        }
      ],
      adittionalComment: "Comentario para Speedy Delivery Inc."
    },
    {
      carrier: "Global Freight Services",
      idCarrier: 3,
      vehicles: [
        {
          plate: "PQR3456",
          documents: [
            {
              docReference: "doc-128",
              aditionalData: undefined,
              file: undefined,
              link: "https://cashport-tms.s3.us-east-2.amazonaws.com/develop/billing/c546c9bc2cd720e3-PDF-prueba-2.pdf"
            },
            {
              docReference: "doc-129",
              aditionalData: undefined,
              file: undefined,
              link: "https://cashport-tms.s3.us-east-2.amazonaws.com/develop/billing/c546c9bc2cd720e3-PDF-prueba-2.pdf"
            },
            {
              docReference: "doc-130",
              aditionalData: undefined,
              file: undefined,
              link: "https://cashport-tms.s3.us-east-2.amazonaws.com/develop/billing/c546c9bc2cd720e3-PDF-prueba-2.pdf"
            }
          ]
        }
      ],
      adittionalComment: "Comentario para Global Freight Services"
    }
  ]
};
