import { Modal, Typography } from "antd";

const { Text } = Typography;

interface Props {
  isOpen: boolean;
  name?: string;
  isMassiveAction?: boolean;
  onClose: () => void;
  onRemove?: () => void;
}
export const ModalRemove = ({ isOpen, name, onClose, onRemove, isMassiveAction }: Props) => {
  const titleFix = isMassiveAction ? "estos" : "este";
  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      okButtonProps={{ className: "acceptButton" }}
      okText="Aceptar"
      cancelButtonProps={{
        className: "buttonCancel"
      }}
      className="modalChangeStatus"
      title={`¿Estás seguro que deseas eliminar ${titleFix} ${name}?`}
      onOk={onRemove}
    >
      <Text className="textModal">Esta acción es definitiva</Text>
    </Modal>
  );
};
