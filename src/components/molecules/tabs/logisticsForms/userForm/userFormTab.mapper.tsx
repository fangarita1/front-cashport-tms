import { FileObject } from "@/components/atoms/UploadDocumentButton/UploadDocumentButton";
import { DocumentCompleteType } from "@/types/logistics/certificate/certificate";
import { IFormUser, IUser } from "@/types/logistics/schema";
import Title from "antd/es/typography/Title";
import dayjs from "dayjs";
import { SetStateAction } from "react";
import { UseFormSetValue } from "react-hook-form";

export type StatusForm = "review" | "create" | "edit";
export interface UserFormTabProps {
  idProjectForm?: string;
  data?: UserData;
  disabled?: boolean;
  onEditProject?: () => void;
  onSubmitForm?: (data: any) => void;
  onActiveProject?: () => void;
  onDesactivateProject?: () => void;
  statusForm: "create" | "edit" | "review";
  params: {
    id: string;
    userId: string;
  };
  handleFormState?: (newFormState: StatusForm) => void;
}

export type UserData = IUser;

export type ApiVehicleType = { id_vehicle_type: number };

export const dataToProjectFormData = (
  data: any
): IFormUser => {

  return {
    logo: [],
    general: {
      id: data.id,
      email: data.email,
      user_name: data.user_name,
      phone: data.phone,
      rol_id: data.rol_id,
      carrier_id: data.carrier_id,
      psl_id: data.psl_id,
      cost_center_id: data.cost_center_id,
      active: data.active,
      photo: data.photo,
      firebaseguid: data.firebaseguid,
      carrier: data.carrier,
      position: data.position
    }
  };
};

export const _onSubmit = (
  data: any,
  imageFile: FileObject[] | undefined,
  setImageError: (value: SetStateAction<boolean>) => void,
  setloading: (value: SetStateAction<boolean>) => void,
  onSubmitForm: (data: any) => void
) => {
  setloading(true);
  try {
    const hasImage = imageFile || data.general.photo;
    if (!hasImage) return setImageError(true);
    onSubmitForm({ ...data, logo: imageFile });
  } catch (error) {
    console.warn({ error });
  } finally {
    setloading(false);
  }
};


export const validationButtonText = (statusForm: "create" | "edit" | "review") => {
  switch (statusForm) {
    case "create":
      return "Crear nuevo usuario";
    case "edit":
      return "Guardar Cambios";
    case "review":
      return "Editar conductor";
  }
};

export const TitleFormTab = (title: string, level: 1 | 2 | 5 | 3 | 4 | undefined) => {
  return (
    <Title className="title" level={level}>
      {title}
    </Title>
  );
};
