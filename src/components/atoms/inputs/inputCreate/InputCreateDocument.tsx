import { useState } from "react";
import { Button, message } from "antd";
import { useForm } from "react-hook-form";

import { InputForm } from "../InputForm/InputForm";
import { useStructureBR } from "@/hooks/useBusinessRules";

import "./inputcreatedocument.scss";
import { FileArrowUp } from "phosphor-react";

export type ChannelType = {
  channel: string;
};
interface Props {
  isEditAvailable: boolean;
}
export const InputCreateDocument = ({ isEditAvailable = false }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const { addChannel } = useStructureBR();
  const [messageApi, contextHolder] = message.useMessage();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ChannelType>({
    defaultValues: { channel: "" },
    disabled: !isEditAvailable
  });
  const onSubmit = async (data: ChannelType) => {
    setIsLoading(true);
    await addChannel(data.channel, messageApi);
    reset();
    setIsLoading(false);
  };
  return (
    <>
      {contextHolder}
      <form className="inputcreatezone" onSubmit={handleSubmit(onSubmit)}>
        <InputForm
          titleInput=""
          control={control}
          nameInput="channel"
          error={errors.channel}
          placeholder="Ingresar nombre del documento"
        />
        <Button htmlType="submit" loading={isLoading} className="createButtonZone">
          <FileArrowUp size={16} />
          Cargar plantilla
        </Button>
      </form>
    </>
  );
};
