import { Button, Flex, Image } from "antd";

import { LoginForm } from "../../forms/LoginForm/LoginForm";
import { Envelope } from "phosphor-react";
import { InfoCardLogin } from "@/components/molecules/login/InfoCardLogin/InfoCardLogin";

import styles from "./login.module.scss";
import { useState } from "react";
import { RestartPassword } from "@/components/molecules/login/RestarPassword/RestartPassword";

export const LoginView = () => {
  const [resetPassword, setResetPassword] = useState(false);

  return (
    <main className={styles.container}>
      <InfoCardLogin />
      <Flex className={styles.loginSection} align="center" justify="center" vertical>
        <Flex className={styles.login} vertical align="center" justify="space-between">
          <div className={styles.login__title}>
            <Image
              className={styles.imageLogo}
              src="/images/login/CashPort.png"
              alt="Logo Company"
              preview={false}
            />
            <h3>CashPort</h3>
          </div>
          {!resetPassword ? (
            <LoginForm setResetPassword={setResetPassword} />
          ) : (
            <RestartPassword setResetPassword={setResetPassword} />
          )}
        </Flex>
        <Button className={styles.contactButton}>
          Contáctanos <Envelope size={16} />
        </Button>
      </Flex>
    </main>
  );
};
