import { AddressContainer } from "@/components/atoms/AddressContainer/AddressContainer";
import { InputForm } from "@/components/atoms/inputs/InputForm/InputForm";
import { Button, Flex, Typography } from "antd";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import "./modaladdress.scss";
import { InputAddress } from "@/components/atoms/inputs/InputAddress/InputAddress";
import { CaretLeft } from "phosphor-react";

const { Title } = Typography;
interface Props {
  setCurrentView: Dispatch<SetStateAction<"address" | "main" | "businessRules">>;
}
export type AddressType = {
  info: {
    name: string;
    cargo: string;
    email: string;
    phone: string;
    rol: string;
  };
};
export const ModalAddress = ({ setCurrentView }: Props) => {
  const [isEditAvailable] = useState(false);

  const {
    control,
    // handleSubmit,
    formState: { errors }
  } = useForm<AddressType>({
    defaultValues: {},
    disabled: isEditAvailable
    // values: isViewDetailsUser?.active ? dataToDataForm(dataUser.data) : ({} as ShipToType)
  });

  return (
    <div className="modalAddress">
      <Button
        className="modalTitle"
        icon={<CaretLeft size={"1.45rem"} />}
        onClick={() => setCurrentView("main")}
      >
        Ingresar ubicación
      </Button>

      <Flex wrap="wrap" justify="flex-start">
        <InputForm
          titleInput="Ciudad"
          control={control}
          nameInput="info.name"
          error={errors.info?.name}
          customStyle={{ width: "45.5%" }}
        />
      </Flex>
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
    </div>
  );
};
