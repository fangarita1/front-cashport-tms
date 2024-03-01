import { useState } from "react";
import { Checkbox, Flex, Modal, Typography } from "antd";

import "./modalchangestatus.scss";

const { Text } = Typography;
interface Props {
  isOpen: boolean;
  name?: string;
  isActiveStatus: boolean;
  onClose: () => void;
  onActive: () => void;
  onDesactivate: () => void;
  onRemove?: () => void;
}

export const ModalChangeStatus = ({
  isOpen,
  isActiveStatus = false,
  onClose,
  onActive,
  onDesactivate,
  name = "",
  onRemove
}: Props) => {
  const [isActive, setIsActive] = useState(isActiveStatus);

  const onOk = async () => {
    if (isActive) return await onActive();
    await onDesactivate();
  };
  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      cancelButtonProps={{ style: { display: "none" } }}
      okText="Aceptar"
      okButtonProps={{ className: "acceptButton" }}
      className="modalChangeStatus"
      title="Cambiar de Estado"
      onOk={onOk}
    >
      <Text className="textModal">
        Las siguientes entradas son inválidas o tienen campos requeridos vacíos:
      </Text>
      <Flex vertical className="options">
        <Checkbox className="option" checked={isActive} onClick={() => setIsActive(true)}>
          Activo
        </Checkbox>
        <Checkbox checked={!isActive} className="option" onClick={() => setIsActive(false)}>
          Inactivo
        </Checkbox>
        {onRemove && (
          <Text onClick={onRemove} className="textRemove">
            Eliminar {name}
          </Text>
        )}
      </Flex>
    </Modal>
  );
};
