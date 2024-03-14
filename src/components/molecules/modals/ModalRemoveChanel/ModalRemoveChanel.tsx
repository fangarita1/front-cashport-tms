import { Modal, Typography } from "antd";
import "./modalremovechanel.scss";

const { Text } = Typography;

interface Props {
  isOpen: boolean;
  name?: string;
  onClose: () => void;
  onRemove?: () => void;
}
export const ModalRemoveChanel = ({ isOpen, onClose, onRemove }: Props) => {
  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      okButtonProps={{ className: "acceptButton" }}
      okText="Eliminar Canal"
      cancelButtonProps={{
        className: "buttonCancel"
      }}
      className="modalChangeStatusChanel"
      title={`¿Estás seguro que deseas eliminar este canal?`}
      onOk={onRemove}
    >
      <Text className="title">Este canal contiene:</Text>
      <br />
      <br />

      <Text className="title">Linea: Medicamentos </Text>
      <br />

      <Text>Sublineas: Analgesicos, Sumplementos, Antibioticos</Text>
      <br />
      <br />

      <Text className="title">Linea: Belleza </Text>
      <br />

      <Text>Sublineas: Bloqueadores</Text>
      <br />
      <br />

      <Text className="title">Esta acción es definitiva </Text>
    </Modal>
  );
};
