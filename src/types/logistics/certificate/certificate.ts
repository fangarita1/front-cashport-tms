import { Key } from "react";

export interface CertificateType {
  key?: Key | null;
  id: number;
  entity_type: number;
  description: string;
  optional: boolean;
  id_location: any;
  id_material_type: any;
  expiry: any;
  template: any;
  active: Active | boolean;
  created_at: string;
  created_by: string;
  modified_at: any;
  modified_by?: any;
}

export interface Active {
  type: string;
  data: number[];
}

export type DocumentCompleteType = CertificateType & { file: File | undefined } & {
  expirationDate: any;
} & { link?: string } & { entity_type_desc?: string };
