import PrincipalButton from "@/components/atoms/buttons/principalButton/PrincipalButton";
import SecondaryButton from "@/components/atoms/buttons/secondaryButton/SecondaryButton";
import { Col, Row } from "antd";

const FooterButtons = ({
  titleConfirm,
  isConfirmDisabled = false,
  onClose,
  handleOk
}: {
  titleConfirm?: string;
  isConfirmDisabled?: boolean;
  onClose: () => void;
  handleOk: () => void;
}) => {
  return (
    <Row style={{ width: "100%" }}>
      <Col span={12} style={{ paddingRight: 8, minHeight: 48 }}>
        <SecondaryButton fullWidth onClick={onClose}>
          Cancelar
        </SecondaryButton>
      </Col>
      <Col span={12} style={{ paddingLeft: 8, minHeight: 48 }}>
        <PrincipalButton fullWidth onClick={handleOk} disabled={isConfirmDisabled}>
          {titleConfirm ?? "Confirmar"}
        </PrincipalButton>
      </Col>
    </Row>
  );
};

export default FooterButtons;
