import { Flex, Image } from "antd";

import { InfoCardLogin } from "@/components/molecules/login/InfoCardLogin/InfoCardLogin";
import { ChangePassForm } from "@/components/molecules/login/ChangePassForm/ChangePassForm";
import { ContactUsButton } from "@/components/atoms/buttons/contactUsButton/ContactUsButton";

import styles from "./changePass.module.scss";

export const ChangePass = () => {
  return (
    <main className={styles.container}>
      <InfoCardLogin />
      <Flex className={styles.changeSection} align="center" justify="center" vertical>
        <Flex className={styles.changePass} vertical align="center" justify="space-between">
          <div className={styles.changePass__title}>
            <Image
              className={styles.imageLogo}
              src="/images/login/CashPort.png"
              alt="Logo Company"
              preview={false}
            />
            <h3>CashPort</h3>
          </div>

          <ChangePassForm />
          <ContactUsButton />
        </Flex>
      </Flex>
    </main>
  );
};
