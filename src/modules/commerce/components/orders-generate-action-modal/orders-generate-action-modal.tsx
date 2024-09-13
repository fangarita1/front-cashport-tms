"use client";
import { Flex, Modal, Typography } from "antd";
import { NewspaperClipping } from "@phosphor-icons/react";

import { ButtonGenerateAction } from "@/components/atoms/ButtonGenerateAction/ButtonGenerateAction";

import "./orders-generate-action-modal.scss";
const { Title } = Typography;

interface Props {
  isOpen: boolean;
  onClose: () => void;
  ordersId: number[];
}

export const OrdersGenerateActionModal = ({ isOpen, onClose, ordersId }: Props) => {
  return (
    <Modal
      className="ordersGenerateActionModal"
      width={"45%"}
      open={isOpen}
      centered
      title={
        <Title className="ordersGenerateActionModal__title" level={4}>
          Generar acción
        </Title>
      }
      footer={null}
      onCancel={onClose}
    >
      <p className="ordersGenerateActionModal__description">
        Selecciona la acción que vas a realizar
      </p>
      <Flex vertical gap="0.75rem">
        <ButtonGenerateAction
          onClick={() => {
            console.info("pedidos a facturados con id", ordersId);
          }}
          icon={<NewspaperClipping size={16} />}
          title="Enviar pedido a facturado"
        />
      </Flex>
    </Modal>
  );
};
