import { FileObject } from "@/components/atoms/UploadDocumentButton/UploadDocumentButton";
import { IVehicle, IFormVehicle } from "@/types/logistics/schema";
import { formatDateBars } from "@/utils/utils";
import Title from "antd/es/typography/Title";
import dayjs from "dayjs";
import { SetStateAction } from "react";
import { UseFormReset, UseFormSetValue } from "react-hook-form";

export interface VehicleFormTabProps {
  idVehicleForm?: string;
  data?: IVehicle[];
  disabled?: boolean;
  onEditVehicle?: () => void;
  onSubmitForm?: (data: any) => void;
  onActiveVehicle?: () => void;
  onDesactivateVehicle?: () => void;
  statusForm: "create" | "edit" | "review";
}

export const dataToVehicleFormData = (data: IVehicle): IFormVehicle => {
  console.log(data.id);
  return {
    general: {
      id: data.id,
      id_carrier: data.id_carrier,
      id_vehicle_type: data.id_vehicle_type,
      vehicle_type: data.vehicle_type,
      plate_number: data.plate_number,
      brand: data.brand,
      line: data.line,
      model: data.model,
      year: data.year,
      color: data.color,
      country: data.country,
      aditional_info: data.aditional_info,
      gps_link: data.gps_link,
      gps_user: data.gps_user,
      gps_password: data.gps_password,
      active: data.active,
      status: data.status,
      created_at: data.created_at,
      created_by: data.created_by,
      company: data.company,
      modified_at: data.modified_at,
      modified_by: data.modified_by,
      IS_ACTIVE: data.IS_ACTIVE
    },
    IS_ACTIVE: ({} = data.IS_ACTIVE)
  };
};


export const validationButtonText = (statusForm: "create" | "edit" | "review") => {
  switch (statusForm) {
    case "create":
      return "Crear nuevo vehiculo";
    case "edit":
      return "Guardar Cambios";
    case "review":
      return "Editar vehiculo";
  }
};

export const TitleFormTab = (title: string, level: 1 | 2 | 5 | 3 | 4 | undefined) => {
  return (
    <Title className="title" level={level}>
      {title}
    </Title>
  );
};
