import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { Button, Flex, Input, Tooltip, Typography, notification } from "antd";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";

import { Eye, EyeClosed } from "phosphor-react";

import { NotificationPlacement } from "antd/es/notification/interface";

import { getAuth } from "../../../../../firebase-utils";

import "./loginform.scss";

interface IAuthLogin {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(5).max(32).required()
});
export const LoginForm = () => {
  const router = useRouter();
  const { Text, Title } = Typography;
  const [isLoading, setIsLoading] = useState(false);
  const { control, handleSubmit, reset } = useForm<IAuthLogin>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: ""
    }
  });
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (placement: NotificationPlacement) => {
    api.error({
      message: (
        <Title level={5} type="secondary">
          Error
        </Title>
      ),
      description: <Text type="secondary">Error: Email o contrraseñas incorrectas </Text>,
      placement
    });
    setIsLoading(false);
  };

  const [showPassword, setShowPassword] = useState(false);

  const onSubmitHandler = async ({ email, password }: IAuthLogin) => {
    setIsLoading(true);

    await getAuth(email.trim(), password, router, false, () => openNotification("topRight"));
    reset();
  };

  return (
    <form className={"form"} onSubmit={handleSubmit(onSubmitHandler)}>
      {contextHolder}
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <Input
            className={"input"}
            placeholder="Email"
            type="email"
            variant="borderless"
            size="large"
            required
            {...field}
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <Input
            size="large"
            type={showPassword ? "text" : "password"}
            className={"input"}
            placeholder="Contrasena"
            variant="borderless"
            required
            suffix={
              <Tooltip title={showPassword ? "Hidden Password" : "Show Password"}>
                {!showPassword ? (
                  <Eye onClick={() => setShowPassword(true)} className={"iconEyePassword"} />
                ) : (
                  <EyeClosed onClick={() => setShowPassword(false)} className={"iconEyePassword"} />
                )}
              </Tooltip>
            }
            {...field}
          />
        )}
      />
      <Flex className={"buttonContainer"}>
        <Button disabled={isLoading} loading={isLoading} className="button" htmlType="submit">
          {isLoading ? "Cargando..." : "Ingresar"}
        </Button>
        <Text underline style={{ marginLeft: 20 }} className={"textForgotPassword"}>
          Olvide mi contraseña
        </Text>
      </Flex>
    </form>
  );
};
