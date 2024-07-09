import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Flex, Modal, Radio, Space, Typography } from "antd";
import { useClientStatus } from "@/hooks/useClientStatus";

import "./modalstatusclient.scss";
import { changeClientStatus } from "@/services/clients/clients";
import { useMessageApi } from "@/context/MessageContext";

const { Text } = Typography;

interface Props {
  isOpen: boolean;
  setIsStatusClient: Dispatch<SetStateAction<{ status: boolean; remove: boolean }>>;
  clientId: string;
  initialStatus: string;

}

export const ModalStatusClient = ({
  isOpen,
  setIsStatusClient,
  clientId,
  initialStatus
}: Props) => {
  const { showMessage } = useMessageApi();

  const { data: statusClient, loading } = useClientStatus();
  const [selectedStatus, setSelectedStatus] = useState<number | null>(null);
  const [loadingChange, setLoadingChange] = useState<boolean>(false);

  useEffect(() => {
    if (statusClient) {
      const initialStatusObj = statusClient.find(
        (status) => status.status_name.toLowerCase() === initialStatus?.toLowerCase()
      );
      if (initialStatusObj) {
        setSelectedStatus(initialStatusObj.id);
      }
    }
  }, [statusClient, initialStatus]);

  const handleOk = async () => {
    if (selectedStatus !== null) {
      setLoadingChange(true);
      await changeClientStatus(clientId, selectedStatus, showMessage);
      setLoadingChange(false);
      setIsStatusClient({ status: false, remove: false });
    } else {
      showMessage("warning", "Por favor selecciona un estado antes de continuar.");
    }
  };

  return (
    <Modal
      open={isOpen}
      onCancel={() => setIsStatusClient({ status: false, remove: false })}
      title="Cambio de estado"
      okButtonProps={{
        className: "buttonOk",
        loading: loadingChange,
        onClick: handleOk
      }}
      cancelButtonProps={{
        className: "buttonCancel"
      }}
      okText="Guardar cambios"
      cancelText="Cancelar"
      className="modalstatusclient"
    >
      <Flex vertical>
        <Text>Selecciona el nuevo estado del cliente</Text>
        <Radio.Group
          style={{ padding: "1rem 0", width: "100%" }}
          onChange={(e) => setSelectedStatus(e.target.value)}
          value={selectedStatus}
        >
          <Space direction="vertical" style={{ width: "100%" }}>
            {loading ? (
              <Text>Cargando estados...</Text>
            ) : (
              statusClient?.map((status) => (
                <Flex className="radioStatus" key={status.id}>
                  <Radio value={status.id} style={{ width: "100%" }}>
                    {status.status_name.charAt(0).toUpperCase() + status.status_name.slice(1)}
                  </Radio>
                </Flex>
              ))
            )}
          </Space>
        </Radio.Group>
        <Text
          className="deleteText"
          onClick={() => setIsStatusClient({ status: true, remove: true })}
        >
          Eliminar Cliente
        </Text>
      </Flex>
    </Modal>
  );
};
