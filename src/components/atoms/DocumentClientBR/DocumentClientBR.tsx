import { Button, Checkbox, Flex, Typography } from "antd";
import { CaretDoubleRight, FileArrowUp, X } from "phosphor-react";
import "./documentclientbr.scss";
const { Text } = Typography;
export const DocumentClientBR = () => {
  return (
    <div className="contianerdocumentclientbr">
      <Typography.Text className="title">Documentos por cliente</Typography.Text>
      <Flex className="documentclientbr" vertical>
        <Flex justify="space-between">
          <Text className="titleLineBR">Institucional</Text>
          <Button icon={<X size={"16px"} />} className="removebutton" />
        </Flex>
        <Flex className="lineBR" vertical>
          <Flex justify="space-between">
            <Text className="subtitleLineBR">Creacion deCliente</Text>
            <Button icon={<X size={"16px"} />} className="removebutton" />
          </Flex>
          <Flex className="mainSublinesBR">
            <Flex vertical>
              <Checkbox checked>Obligatorio</Checkbox>
              <Button
                type="text"
                icon={<FileArrowUp size={"16px"} />}
                className="buttonTextDocument"
              >
                Plantilla_Creacion_de_Cliente
              </Button>
            </Flex>
          </Flex>
          <Button
            icon={<CaretDoubleRight size={"16px"} />}
            className="addButtonLineSub"
            type="text"
          >
            Agregar documento
          </Button>
        </Flex>
        <Button icon={<CaretDoubleRight size={"16px"} />} className="addButtonLineSub" type="text">
          Agregar cliente
        </Button>
      </Flex>
    </div>
  );
};
