import PrincipalButton from "@/components/atoms/buttons/principalButton/PrincipalButton";
import { Flex } from "antd";
import styles from "./Footer.module.scss";
interface IFooter {
  view: string;
  handleCancel: () => void;
  handleSubmit: () => void;
  isSubmitting: boolean;
  disabledContinue: boolean;
}
export const Footer = ({
  view,
  handleCancel,
  handleSubmit,
  isSubmitting,
  disabledContinue
}: IFooter) => (
  <Flex gap={24} justify="center" className={styles.Footer}>
    <PrincipalButton type="default" fullWidth onClick={handleCancel} disabled={isSubmitting}>
      Cancelar
    </PrincipalButton>
    <PrincipalButton
      fullWidth
      disabled={disabledContinue || isSubmitting}
      loading={isSubmitting}
      onClick={handleSubmit}
    >
      {view === "carrier" ? "Enviar solicitudes" : "Siguiente"}
    </PrincipalButton>
  </Flex>
);
