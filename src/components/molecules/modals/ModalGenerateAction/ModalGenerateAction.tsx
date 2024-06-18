import { Collapse, Flex, Modal, Typography } from "antd";

import {
  ArrowsClockwise,
  Calculator,
  Handshake,
  NewspaperClipping,
  LinkBreak,
  CaretRight,
  WarningDiamond,
  HandTap
} from "@phosphor-icons/react";

import "./modalgenerateaction.scss";
import { ButtonGenerateAction } from "@/components/atoms/ButtonGenerateAction/ButtonGenerateAction";

const { Title, Text } = Typography;

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const handlePaymentAgreement = () => {
  // handle payment agreement
  console.log("Payment agreement open");
};

export const ModalGenerateAction = ({ isOpen, onClose }: Props) => {
  return (
    <Modal
      className="modalGenerateAction"
      width={"40%"}
      open={isOpen}
      title={
        <Title className="modalGenerateAction__title" level={4}>
          Generar acción
        </Title>
      }
      footer={null}
      onCancel={onClose}
    >
      <p className="modalGenerateAction__description">Selecciona la acción que vas a realizar</p>

      <Collapse
        className="collapseByAction"
        expandIconPosition="end"
        ghost
        accordion
        items={actionsOptions}
      />
      <ButtonGenerateAction
        onClick={handlePaymentAgreement}
        icon={<Handshake size={16} />}
        title="Acuerdo de pago"
      />
      <ButtonGenerateAction icon={<WarningDiamond size={16} />} title="Registrar novedad" />
      <ButtonGenerateAction icon={<ArrowsClockwise size={16} />} title="Cambio de estado" />
      <ButtonGenerateAction icon={<NewspaperClipping size={16} />} title="Radicar factura" />
      <ButtonGenerateAction icon={<HandTap size={16} />} title="Aplicar pagos" />
      <ButtonGenerateAction icon={<LinkBreak size={16} />} title="Vincular orden de compra" />
    </Modal>
  );
};

const actionsOptions = [
  {
    key: 1,
    label: (
      <div className="collapseByAction__label">
        <Calculator size={16} />
        <Title className="collapseByAction__label__text" level={4}>
          Ajustes Contables
        </Title>
      </div>
    ),
    children: (
      <div className="collapseByAction__children">
        <Flex className="collapseByAction__children__item" justify="space-between">
          <Text>Generar nota crédito</Text>
          <CaretRight size={16} />
        </Flex>
        <hr />
        <Flex className="collapseByAction__children__item" justify="space-between">
          <Text>Generar descuento</Text>
          <CaretRight size={16} />
        </Flex>
        <hr />
        <Flex className="collapseByAction__children__item" justify="space-between">
          <Text>Generar nota débito</Text>
          <CaretRight size={16} />
        </Flex>
      </div>
    )
  }
];
