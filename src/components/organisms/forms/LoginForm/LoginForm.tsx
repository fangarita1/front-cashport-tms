import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { Flex, Input, Tooltip, Typography, notification } from "antd";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";

import { Eye, EyeClosed } from "phosphor-react";

import { NotificationPlacement } from "antd/es/notification/interface";

import { getAuth } from "../../../../../firebase-utils";

import "./loginform.scss";
import { InputForm } from "@/components/atoms/inputs/InputForm/InputForm";
import PrincipalButton from "@/components/atoms/buttons/principalButton/PrincipalButton";

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
  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid }
  } = useForm<IAuthLogin>({
    resolver: yupResolver(schema)
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
    <form className="loginForm" onSubmit={handleSubmit(onSubmitHandler)}>
      {contextHolder}
      <h4 className="loginForm__title">Inicia sesión</h4>

      <Flex vertical gap={"1.5rem"} className="loginForm__content">
        <div>
          <p className="loginForm__inputTitle">Usuario</p>
          <InputForm
            customStyle={{ with: "100%" }}
            placeholder="Ingresar usuario"
            hiddenTitle
            control={control}
            nameInput="email"
            typeInput="email"
            validationRules={{ required: "Email es obligatorio" }}
          />
        </div>
        <div>
          <p className="loginForm__inputTitle">Contraseña</p>
          <Controller
            name="password"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Input
                size="large"
                type={showPassword ? "text" : "password"}
                className="inputPassword"
                placeholder="Contrasena"
                variant="borderless"
                required
                suffix={
                  <Tooltip title={showPassword ? "Hidden Password" : "Show Password"}>
                    {!showPassword ? (
                      <Eye onClick={() => setShowPassword(true)} className={"iconEyePassword"} />
                    ) : (
                      <EyeClosed
                        onClick={() => setShowPassword(false)}
                        className={"iconEyePassword"}
                      />
                    )}
                  </Tooltip>
                }
                {...field}
              />
            )}
          />
        </div>
        <p className="forgotPassword">Olvidé mi contraseña</p>
      </Flex>

      <PrincipalButton disabled={!isValid} loading={isLoading} htmlType="submit">
        {isLoading ? "Cargando..." : "Iniciar sesión"}
      </PrincipalButton>
    </form>
  );
};
