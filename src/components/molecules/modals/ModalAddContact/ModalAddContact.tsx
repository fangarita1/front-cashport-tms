import PrincipalButton from "@/components/atoms/buttons/principalButton/PrincipalButton";
import SecondaryButton from "@/components/atoms/buttons/secondaryButton/SecondaryButton";
import { ITransferOrderContacts } from "@/types/logistics/schema";
import { Col, Flex, Input, message, Modal, Row, Select, Typography } from "antd";
import { X } from "phosphor-react";
import { useEffect, useState } from "react";
import runes from "runes2";

const { Text } = Typography;

type PropsModal = {
  isOpen: boolean;
  onClose: () => void;
  setDataContacts: (value: React.SetStateAction<ITransferOrderContacts[]>) => void;
};

export default function ModalAddContact(props: Readonly<PropsModal>) {
  const { isOpen, onClose, setDataContacts } = props;

  const [type, setType] = useState<number | null>(null);
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  useEffect(() => {
    if (!isOpen) {
      setType(null);
      setName("");
      setPhone("");
    }
  }, [isOpen]);

  const handleOnOk = () => {
    if (!type) return message.error("Debe elegir un punto de contacto");
    if (name.length <= 0) return message.error("Debe digitar un nombre de contacto");
    setDataContacts((prevContacts) => {
      const newcontact: ITransferOrderContacts = {
        key: prevContacts.length + 1,
        contact_type: type,
        id: 0,
        id_transfer_order: 0,
        id_contact: 0,
        name: name,
        contact_number: phone,
        active: "",
        created_at: new Date(),
        created_by: ""
      };
      return [...prevContacts, newcontact];
    });
    onClose();
  };
  const isformvalid = type && name?.length > 0 && phone?.length === 10;
  return (
    <Modal
      title="Agrega un contacto"
      styles={{ body: { maxHeight: "30rem", overflowY: "auto", paddingRight: "0.5rem" } }}
      centered
      open={isOpen}
      onClose={() => onClose()}
      closeIcon={<X onClick={onClose} />}
      footer={
        <Row style={{ width: "100%" }}>
          <Col span={12} style={{ paddingRight: 8 }}>
            <SecondaryButton fullWidth onClick={onClose}>
              Cancelar
            </SecondaryButton>
          </Col>
          <Col span={12} style={{ paddingLeft: 8 }}>
            <PrincipalButton fullWidth onClick={handleOnOk} disabled={!isformvalid}>
              Crear contacto
            </PrincipalButton>
          </Col>
        </Row>
      }
    >
      <Flex style={{ width: "100%", height: "100%" }} vertical>
        <Row style={{ marginBottom: "1.5rem" }}>
          <Text>Agrega los datos del contacto para el punto de origen o destino.</Text>
        </Row>
        <Row style={{ width: "100%" }}>
          <Col span={24} style={{ marginBottom: "1rem" }}>
            <label className="locationLabels" style={{ display: "flex" }}>
              <Text>Punto del contacto</Text>
            </label>
            <Select
              placeholder="Seleccione origen o destino"
              style={{ width: "100%" }}
              options={[
                { value: 1, label: "Origen" },
                { value: 2, label: "Destino" }
              ]}
              value={type}
              onChange={(e) => {
                setType(e);
              }}
            />
          </Col>
          <Col span={24} style={{ marginBottom: "1rem" }}>
            <label className="locationLabels" style={{ display: "flex" }}>
              <Text>Nombre</Text>
            </label>
            <Input
              placeholder="Escribir nombre"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </Col>
          <Col span={24} style={{ marginBottom: "1rem" }}>
            <label className="locationLabels" style={{ display: "flex" }}>
              <Text>Teléfono</Text>
            </label>
            <div>
              <Input
                placeholder="Escribir teléfono"
                value={phone}
                onChange={(e) => {
                  const { value: inputValue } = e.target;
                  const reg = /^-?\d*(\.\d*)?$/;
                  if (reg.test(inputValue) || inputValue === "" || inputValue === "-") {
                    setPhone(inputValue);
                  }
                }}
                count={{
                  show: true,
                  max: 10,
                  strategy: (txt) => runes(txt).length,
                  exceedFormatter: (txt, { max }) => runes(txt).slice(0, max).join("")
                }}
              />

              {phone.length < 10 && phone.length > 0 && (
                <div style={{ color: "red", marginTop: "5px" }}>
                  {"El número debe contener 10 dígitos"}
                </div>
              )}
            </div>
          </Col>
        </Row>
      </Flex>
    </Modal>
  );
}
