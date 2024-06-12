import { AddressContainer } from "@/components/atoms/AddressContainer/AddressContainer";
import { Button, Typography } from "antd";
import { Dispatch, SetStateAction, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { InputAddress } from "@/components/atoms/inputs/InputAddress/InputAddress";
import { CaretLeft } from "phosphor-react";
import { SelectLocations } from "../../selects/clients/SelectLocations/SelectLocations";
import { ISelectType } from "@/types/clients/IClients";

import "./modaladdress.scss";
const { Title } = Typography;
interface Props {
  setCurrentView: Dispatch<SetStateAction<"address" | "main" | "businessRules">>;
}
export type AddressType = {
  location: {
    city: ISelectType;
    address: {
      street_type: string;
      number: string;
      complement: string;
      building_number: number;
    };
    complement: string;
  };
};
export const ModalAddress = ({ setCurrentView }: Props) => {
  const [isEditAvailable] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<AddressType>({
    defaultValues: {},
    disabled: isEditAvailable
  });

  const onSubmitLocation = (data: AddressType) => {
    console.log("data ADDRESS: ", data);
    setCurrentView("main");
  };

  return (
    <form className="modalAddress" onSubmit={handleSubmit(onSubmitLocation)}>
      <Button
        className="modalTitle"
        icon={<CaretLeft size={"1.45rem"} />}
        onClick={() => setCurrentView("main")}
      >
        Ingresar ubicación
      </Button>

      <div className="modalAddress__city">
        <Controller
          name="location.city"
          control={control}
          rules={{ required: true, minLength: 1 }}
          render={({ field }) => <SelectLocations errors={errors.location?.city} field={field} />}
        />
      </div>
      <Title level={5} className="titleSection">
        Ubicaciones disponibles ya creadas
      </Title>
      <div className="existingLocations">
        <AddressContainer />
        <AddressContainer />
        <AddressContainer />
        <AddressContainer />
        <AddressContainer />
      </div>
      <Title level={5} className="titleSection">
        Crear ubicación del Ship To
      </Title>
      <InputAddress control={control} errors={errors} />

      <div className="footer">
        <Button disabled={!isValid} htmlType="submit" className="acceptButton -address">
          Guardar ubicación
        </Button>
      </div>
    </form>
  );
};
