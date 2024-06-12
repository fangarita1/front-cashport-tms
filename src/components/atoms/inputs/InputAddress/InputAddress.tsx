import { Flex, Typography } from "antd";
import { InputForm } from "../InputForm/InputForm";
import { Control, FieldErrors } from "react-hook-form";
import { AddressType } from "@/components/molecules/modals/ModalAddress/ModalAddress";

interface Props {
  control: Control<AddressType, any>;
  errors: FieldErrors<AddressType>;
}

export const InputAddress = ({ control, errors }: Props) => {
  return (
    <Flex vertical>
      <Flex align="flex-end">
        <InputForm
          titleInput="Ingresar dirección"
          control={control}
          nameInput="location.address.street_type"
          error={errors.location?.address?.street_type}
          customStyle={{ width: "75%", paddingRight: "1rem" }}
          placeholder="Carrera"
        />
        <Flex align="center" gap={"0.5rem"}>
          <InputForm
            titleInput=""
            control={control}
            nameInput="location.address.number"
            error={errors.location?.address?.number}
            customStyle={{ width: "30%" }}
            placeholder="148A"
            hiddenTitle
          />
          <Typography.Text>#</Typography.Text>
          <InputForm
            titleInput=""
            control={control}
            nameInput="location.address.complement"
            error={errors.location?.address?.complement}
            placeholder="45Bis"
            customStyle={{ width: "30%" }}
            hiddenTitle
          />
          <Typography.Text>-</Typography.Text>
          <InputForm
            titleInput=""
            placeholder="39"
            control={control}
            nameInput="location.address.building_number"
            error={errors.location?.address?.building_number}
            customStyle={{ width: "30%" }}
            hiddenTitle
            typeInput="number"
          />
        </Flex>
      </Flex>
      <InputForm
        titleInput="Complemento"
        placeholder="Local 1A"
        control={control}
        nameInput="location.complement"
        error={errors.location?.complement}
        customStyle={{ marginTop: "1rem" }}
      />
    </Flex>
  );
};
