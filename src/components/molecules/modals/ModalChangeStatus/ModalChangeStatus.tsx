import { useEffect, useState } from "react";
import { Checkbox, Flex, Modal, Typography } from "antd";

import "./modalchangestatus.scss";

const { Text } = Typography;
interface Props {
  isOpen: boolean;
  name?: string;
  isActiveStatus?: boolean;
  onClose: () => void;
  onActive?: () => void;
  onDesactivate?: () => void;
  onRemove?: () => void;
  // eslint-disable-next-line no-unused-vars
  customOnOk?: (selectedActiveState: boolean) => void;
}

export const ModalChangeStatus = ({
  isOpen,
  isActiveStatus,
  onClose,
  onActive,
  onDesactivate,
  name = "",
  onRemove,
  customOnOk
}: Props) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
      setIsActive(Boolean(isActiveStatus));
  }, [isActiveStatus]);

  const onOk = async () => {
    if (onActive && onDesactivate) {
      if (isActive) return await onActive();
      return await onDesactivate();
    }
    if (customOnOk) return customOnOk(isActive);
  };
  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      cancelButtonProps={{
        className: "buttonCancel"
      }}
      okText="Cambiar de estado"
      okButtonProps={{ className: "acceptButton" }}
      className="modalChangeStatus"
      title="Cambio de Estado"
      onOk={onOk}
      cancelText="Cancelar"
    >
      <Text className="textModal">Selecciona el nuevo estado</Text>
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
