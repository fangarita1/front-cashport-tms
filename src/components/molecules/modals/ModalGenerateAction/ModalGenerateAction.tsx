import { Collapse, Flex, Modal, Typography } from "antd";
import {
  ArrowsClockwise,
  Calculator,
  Handshake,
  NewspaperClipping,
  Warning,
  HandPointing,
  LinkBreak,
  CaretRight
} from "phosphor-react";

import "./modalgenerateaction.scss";

const { Title, Text } = Typography;

interface Props {
  isOpen: boolean;
  onClose: () => void;
}
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
      <Text className="modalGenerateAction__description">
        Selecciona la acción que vas a realizar
      </Text>

      <Collapse
        className="collapseByAction"
        expandIconPosition="end"
        ghost
        accordion
        items={actionsOptions}
      />
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
  },
  {
    key: 2,
    label: (
      <div className="collapseByAction__label">
        <Handshake size={16} />
        <Title className="collapseByAction__label__text" level={4}>
          Acuerdo de pago
        </Title>
      </div>
    ),
    children: (
      <>
        <Text>Hacer acuerdo de pago</Text>
      </>
    )
  },
  {
    key: 3,
    label: (
      <div className="collapseByAction__label">
        <Warning size={16} />
        <Title className="collapseByAction__label__text" level={4}>
          Registrar novedad
        </Title>
      </div>
    ),
    children: (
      <>
        <Text>...</Text>
      </>
    )
  },
  {
    key: 4,
    label: (
      <div className="collapseByAction__label">
        <ArrowsClockwise size={16} />
        <Title className="collapseByAction__label__text" level={4}>
          Cambio de estado
        </Title>
      </div>
    ),
    children: (
      <>
        <Text>...</Text>
      </>
    )
  },
  {
    key: 5,
    label: (
      <div className="collapseByAction__label">
        <NewspaperClipping size={16} />
        <Title className="collapseByAction__label__text" level={4}>
          Radicar factura
        </Title>
      </div>
    ),
    children: (
      <>
        <Text>...</Text>
      </>
    )
  },
  {
    key: 6,
    label: (
      <div className="collapseByAction__label">
        <HandPointing size={16} />
        <Title className="collapseByAction__label__text" level={4}>
          Aplicar pagos
        </Title>
      </div>
    ),
    children: (
      <>
        <Text>...</Text>
      </>
    )
  },
  {
    key: 7,
    label: (
      <div className="collapseByAction__label">
        <LinkBreak size={16} />
        <Title className="collapseByAction__label__text" level={4}>
          Vincular orden de compra
        </Title>
      </div>
    ),
    children: (
      <>
        <Text>...</Text>
      </>
    )
  }
];
