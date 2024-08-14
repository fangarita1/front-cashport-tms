import { Button, Flex, Image } from "antd";

import { Envelope } from "phosphor-react";
import { InfoCardLogin } from "@/components/molecules/login/InfoCardLogin/InfoCardLogin";

import styles from "./changePass.module.scss";
import { ChangePassForm } from "@/components/molecules/login/ChangePassForm/ChangePassForm";

export const ChangePass = () => {
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

          <ChangePassForm />
        </Flex>
        <Button className={styles.contactButton}>
          Contáctanos <Envelope size={16} />
        </Button>
      </Flex>
    </main>
  );
};
