import { Button, Flex } from "antd";
import { useForm } from "react-hook-form";

import { InputForm } from "../InputForm/InputForm";

import "./inputcreatezone.scss";

export type ZoneType = {
  zone: string;
};
interface Props {
  isEditAvailable: boolean;
}
export const InputCreateZone = ({ isEditAvailable = false }: Props) => {
  const {
    control,
    // handleSubmit,
    formState: { errors }
  } = useForm<ZoneType>({
    defaultValues: { zone: "" },
    disabled: !isEditAvailable
    // values: isViewDetailsUser?.active ? dataToDataForm(dataUser.data) : ({} as ShipToType)
  });
  return (
    <Flex className="inputcreatezone" vertical>
      <InputForm
        titleInput=""
        control={control}
        nameInput="zone"
        error={errors.zone}
        customStyle={{
          width: "96%",
          backgroundColor: "transparent !important",
          border: "1px solid white",
          borderRadius: ".8rem"
        }}
        placeholder="Ingresar nombre de zona"
      />
      <Button className="createButtonZone">Crear </Button>
    </Flex>
  );
};
