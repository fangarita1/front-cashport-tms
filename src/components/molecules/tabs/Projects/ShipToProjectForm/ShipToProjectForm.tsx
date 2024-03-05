import { Flex } from "antd";
// import { InputForm } from '@/components/atoms/InputForm/InputForm';
import "./shiptoprojectform.scss";
// import { useForm } from 'react-hook-form';
// import { useState } from 'react';

export type ShipToType = {
  infoShipTo: {
    typeOfDocument: "NIT" | "Cedula" | "Pasaporte";
    idDocument: string;
    socialReason: string;
    companyName: string;
    typeOfClient: "NIT" | "Cedula" | "Pasaporte";
    holding: "NIT" | "Cedula" | "Pasaporte";
    phone: string;
    email: string;
    city: string[];
    risk: string;
    periodBilling: string;
    typeRadication: string;
    conditionPay: string;
    address: string;
  };
};

export const ShipToProjectForm = () => {
  // const [isEditAvailable, setIsEditAvailable] = useState(isViewDetailsUser?.active);

  // const {
  //     control,
  //     handleSubmit,
  //     formState: { errors }
  // } = useForm<ShipToType>({
  //     defaultValues: {},
  //     disabled: isEditAvailable,
  // });

  return (
    <Flex className="shiptoprojectform">
      s
      {/* <InputForm
                titleInput="Tipo de Documento"
                control={control}
                nameInput="infoClient.typeOfDocument"
                error={errors.infoClient?.typeOfDocument}
            />
            <InputForm
                titleInput="No. de documento"
                control={control}
                nameInput="infoClient.idDocument"
                error={errors.infoClient?.idDocument}
            /> */}
    </Flex>
  );
};
