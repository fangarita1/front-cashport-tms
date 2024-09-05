import { Flex, message, Skeleton } from "antd";
import FooterButtons from "../FooterButtons/FooterButtons";
import { ViewEnum } from "../ModalBillingAction";
import { Dispatch, SetStateAction, useState } from "react";
import styles from "./ConfirmClose.module.scss";
import { getAceptBilling } from "@/services/billings/billings";
import { MessageInstance } from "antd/es/message/interface";
import { formatNumber } from "@/utils/utils";
interface ConfirmClose {
  setSelectedView: (value: SetStateAction<ViewEnum>) => void;
  onClose: () => void;
  idTR: number;
  idBilling: number;
  totalValue: number;
  messageApi: MessageInstance;
}

const ConfirmClose = ({
  setSelectedView,
  onClose,
  totalValue,
  idTR,
  messageApi,
  idBilling
}: ConfirmClose) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const aceptBilling = async () => {
    try {
      setIsLoading(true);
      const response = await getAceptBilling(idBilling);
      if (response) {
        messageApi?.open({
          type: "success",
          content: "Se aceptó el cierre correctamente",
          duration: 3
        });
      }
    } catch (error) {
      messageApi?.open({
        type: "error",
        content: "Hubo un problema, vuelve a intentarlo",
        duration: 3
      });
    } finally {
      onClose();
      setIsLoading(false);
    }
  };
  const handleConfirm = () => {
    aceptBilling();
  };

  return (
    <Skeleton active loading={isLoading}>
      <Flex vertical gap={24}>
        <p className={styles.subtitle}>
          Estas confirmando la finalización de la <b>{`TR #${idTR}`}</b> por valor de{" "}
          <b>{`$${formatNumber(totalValue, 2)}`}</b>
        </p>
        <FooterButtons titleConfirm="Confirmar" onClose={onClose} handleOk={handleConfirm} />
      </Flex>
    </Skeleton>
  );
};
export default ConfirmClose;
