import { FileObject } from "@/components/atoms/UploadDocumentButton/UploadDocumentButton";
import { DocumentCompleteType } from "@/types/logistics/certificate/certificate";
import { ICertificates, IMaterial} from "@/types/logistics/schema";
import { IFormProject } from "@/types/projects/IFormProject";
import Title from "antd/es/typography/Title";
import dayjs from "dayjs";
import { SetStateAction } from "react";
import { UseFormSetValue } from "react-hook-form";

export type StatusForm = "review" | "create" | "edit"
export interface MaterialFormTabProps {
  idProjectForm?: string;
  data?: MaterialData;
  disabled?: boolean;
  onEditProject?: () => void;
  onSubmitForm?: (data: any) => void;
  onActiveProject?: () => void;
  onDesactivateProject?: () => void;
  statusForm: "create" | "edit" | "review";
  params: {
    id: string;
    materialId: string;
  };
  handleFormState?: (newFormState: StatusForm) => void
}

export interface MaterialImage {
  id: number,
  entity_type: number,
  url_archive?: string,
  file?: FileObject
}
export type MaterialData = IMaterial & { documents?: ICertificates[] }  & {images?: MaterialImage};


export const dataToProjectFormData = (data: any): any => {

  if (!data) return {};

  const documents = data.documents.map((doc: any) => ({
    file: {
      name: doc.url_archive.split("/").pop(),
      url: doc.url_archive
    }
  }));

  const images = data.images.map((image: any) => {
    const fileData = image.data;
    const fileName = image.url_archive.split("/").pop();
    const file = new File([fileData], fileName);
    (file as any).url_archive = image.url_archive;
    return file;
  });

  return {    
    general: {
      id: data.id,
      description: data.phone,
      id_type_material: data.email,
      kg_weight: data.document_type,
      mt_height: data.document,
      mt_width: data?.licence || data.license,
      mt_length: data.licence_category || "",
      m3_volume: dayjs(data.license_expiration) as any,
      rotation: data.name,
      can_stack: data.last_name,
      image: data.emergency_number,
      aditional_info: data.emergency_contact,
      active: data.active,
      created_at: data.created_at,
      created_by: data.created_by,
      modified_at: data.created_at,
      modified_by: data.created_by,
      icon: data.company,
      restriction: data.rh,
    },
    images: images,
    files: documents,
    IS_ACTIVE: data.active
  };
};

export const _onSubmit = (
  data: any,
  files: DocumentCompleteType[],
  imageFile: FileObject[] | undefined,
  setImageError: (value: SetStateAction<boolean>) => void,
  setloading: (value: SetStateAction<boolean>) => void,
  onSubmitForm: (data: any) => void,
) => {
  setloading(true);
  try {
    const hasImage = imageFile || data.general.photo;
    if (!hasImage) return setImageError(true);
    onSubmitForm({ ...data, logo: imageFile, files });
  } catch (error) {
    console.warn({ error });
  } finally{
    setloading(false);
  }
};

export const effectFunction = (
  setValue: UseFormSetValue<IFormProject>
) => {

};

export const validationButtonText = (statusForm: "create" | "edit" | "review") => {
  switch (statusForm) {
    case "create":
      return "Crear nuevo material";
    case "edit":
      return "Guardar Cambios";
    case "review":
      return "Editar material";
  }
};

export const TitleFormTab = (title: string, level: 1 | 2 | 5 | 3 | 4 | undefined) => {
  return (
    <Title className="title" level={level}>
      {title}
    </Title>
  );
};
