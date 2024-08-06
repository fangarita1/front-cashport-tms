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
    setDataContacts: (value: React.SetStateAction<ITransferOrderContacts[]>) => void
};

export default function ModalAddContact(props: PropsModal) {
  const {
    isOpen,
    onClose,
    setDataContacts
  } = props;

  const [type, setType] = useState<number|null>(null);
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  useEffect(() => {
    if (!isOpen) {
      setType(null);
      setName("");
      setPhone("");
    }
  }, [isOpen]);

  const handleOnOk =()=>{
    if (!type) return message.error('Debe elegir un punto de contacto');
    if (name.length <= 0) return message.error('Debe digitar un nombre de contacto');
    setDataContacts(prevContacts =>{
      const lastitem = prevContacts.filter(f => f.contact_type == type).at(-1);    
      const newcontact : ITransferOrderContacts ={
        key: (lastitem != undefined ? lastitem.key +1 : 1),
        contact_type: type,
        id: 0,
        id_transfer_order: 0,
        id_contact: 0,
        name: name,
        contact_number: phone,
        active: "",
        created_at: new Date(),
        created_by: ""
      }
      return [...prevContacts, newcontact]
    })
    onClose()
  }


  return (
    <Modal
      title="Agrega un contacto"
      styles={{ body: { maxHeight: "30rem", overflowY: "auto", paddingRight: "0.5rem" } }}
      centered
      open={isOpen}
      onClose={() => onClose()}
      closeIcon={<X onClick={onClose} />}
      footer={
        <Flex justify="space-between">
          <SecondaryButton onClick={onClose}>Cancelar</SecondaryButton>
          <PrincipalButton onClick={handleOnOk}>Crear contacto</PrincipalButton>
        </Flex>
      }
    >
        <Flex style={{width:'100%', height: "100%"}} vertical> 
          <Row style={{marginBottom: "1.5rem"}}>
            <Text>Agrega los datos del contacto para el punto de origen o destino.</Text>
          </Row>      
          <Row style={{width:'100%' }} >
            <Col span={24} style={{marginBottom: "1rem"}}>
              <label className="locationLabels" style={{ display: 'flex' }}>
                <Text>Punto del contacto</Text>
              </label>
              <Select
                placeholder = 'Seleccione origen o destino'
                style={{ width: '100%' }}
                options={[{ value: 1, label: 'Origen' },{ value: 2, label: 'Destino' }]}
                value={type}
                onChange={(e)=>{ 
                  setType(e)
                }}
              />
              </Col>
                
              <Col span={24} style={{marginBottom: "1rem"}}>
                <label className="locationLabels" style={{ display: 'flex' }}>
                  <Text>Nombre</Text>
                </label>
                <Input placeholder="Escribir nombre" value={name} onChange={(e)=>{ 
                  setName(e.target.value)
                }} />
              </Col>
              <Col span={24} style={{marginBottom: "1rem"}}>
                <label className="locationLabels" style={{ display: 'flex' }}>
                  <Text>Teléfono</Text>
                </label>
                <Input placeholder="Escribir teléfono" value={phone} onChange={(e)=>{ 
                  setPhone(e.target.value)
                }}
                count={{
                  show: true,
                  max: 10,
                  strategy: (txt) => runes(txt).length,
                  exceedFormatter: (txt, { max }) => runes(txt).slice(0, max).join(''),              
                }}/>
              </Col>  
          </Row>
        </Flex>
    </Modal>
  );
}
