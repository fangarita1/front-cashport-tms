import { Modal, Typography } from "antd";

const { Text } = Typography;

interface Props {
  isOpen: boolean;
  name?: string;
  onClose: () => void;
  onRemove?: () => void;
}
export const ModalRemove = ({ isOpen, name, onClose, onRemove }: Props) => {
  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      cancelButtonProps={{ style: { display: "none" } }}
      okText="Aceptar"
      okButtonProps={{ className: "acceptButton" }}
      className="modalChangeStatus"
      title={`¿Estás seguro que deseas eliminar este ${name}?`}
      onOk={onRemove}
    >
      <Text className="textModal">Esta acción es definitiva</Text>
    </Modal>
  );
};
