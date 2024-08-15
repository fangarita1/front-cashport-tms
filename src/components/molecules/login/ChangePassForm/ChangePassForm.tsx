import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { Flex, Input, Tooltip } from "antd";
import { yupResolver } from "@hookform/resolvers/yup";
import PrincipalButton from "@/components/atoms/buttons/principalButton/PrincipalButton";

import { Eye, EyeClosed } from "phosphor-react";

import "./changePassForm.scss";

interface IChangePassForm {
  password: string;
  confirmPassword: string;
}

const schema = yup.object().shape({
  password: yup.string().min(5).max(32).required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Las contraseñas no coinciden")
    .required()
});

export const ChangePassForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<IChangePassForm>({
    resolver: yupResolver(schema),
    mode: "onTouched"
  });

  const [showPassword, setShowPassword] = useState<{
    password: boolean;
    confirmPassword: boolean;
  }>({
    password: false,
    confirmPassword: false
  });

  const onSubmitHandler = async ({ password, confirmPassword }: IChangePassForm) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      console.log(password, confirmPassword);
    }, 1000);
  };

  return (
    <form className="changePassForm" onSubmit={handleSubmit(onSubmitHandler)}>
      <Flex vertical gap={"0.5rem"}>
        <h4 className="changePassForm__title">Restablece tu contraseña</h4>
        <p>Ingresa tu nueva contraseña</p>
      </Flex>

      <Flex vertical gap={"1.5rem"} className="changePassForm__content">
        <div>
          <p className="changePassForm__inputTitle">Nueva Contraseña</p>
          <Controller
            name="password"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Input
                size="large"
                type={showPassword.password ? "text" : "password"}
                className="inputPassword"
                placeholder="Contrasena"
                variant="borderless"
                required
                autoComplete="current-password"
                suffix={
                  <Tooltip title={showPassword.password ? "Hidden Password" : "Show Password"}>
                    {!showPassword.password ? (
                      <Eye
                        onClick={() => {
                          console.log("click");
                          setShowPassword((prevState) => ({
                            ...prevState,
                            password: true
                          }));
                        }}
                        className="iconEyePassword"
                      />
                    ) : (
                      <EyeClosed
                        onClick={() => {
                          console.log("click2");
                          setShowPassword((prevState) => ({
                            ...prevState,
                            password: false
                          }));
                        }}
                        className="iconEyePassword"
                      />
                    )}
                  </Tooltip>
                }
                {...field}
              />
            )}
          />
        </div>
        <div>
          <p className="changePassForm__inputTitle">Confirmar contraseña</p>
          <Controller
            name="confirmPassword"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <>
                <Input
                  size="large"
                  type={showPassword.confirmPassword ? "text" : "password"}
                  className="inputPassword"
                  placeholder="Contrasena"
                  variant="borderless"
                  required
                  autoComplete="current-password"
                  suffix={
                    <Tooltip
                      title={showPassword.confirmPassword ? "Hidden Password" : "Show Password"}
                    >
                      {!showPassword.confirmPassword ? (
                        <Eye
                          onClick={() =>
                            setShowPassword((prevState) => ({
                              ...prevState,
                              confirmPassword: true
                            }))
                          }
                          className="iconEyePassword"
                        />
                      ) : (
                        <EyeClosed
                          onClick={() =>
                            setShowPassword((prevState) => ({
                              ...prevState,
                              confirmPassword: false
                            }))
                          }
                          className="iconEyePassword"
                        />
                      )}
                    </Tooltip>
                  }
                  {...field}
                />
                {errors.confirmPassword && (
                  <div className="errorMessage">{errors.confirmPassword.message}</div>
                )}
              </>
            )}
          />
        </div>
      </Flex>

      <PrincipalButton disabled={!isValid} loading={isLoading} htmlType="submit">
        Restablecer contraseña
      </PrincipalButton>
    </form>
  );
};
