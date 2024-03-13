import { Button, Flex, Tag, Typography } from "antd";
import { CaretDoubleRight, X } from "phosphor-react";
import "./channelbr.scss";
import { Dispatch, SetStateAction } from "react";

const { Text } = Typography;

interface Props {
  setModalRemove: Dispatch<SetStateAction<boolean>>;
}
export const ChannelBR = ({ setModalRemove }: Props) => {
  return (
    <Flex className="channelbr" vertical>
      <Flex justify="space-between">
        <Text className="titleLineBR">Institucional</Text>
        <Button
          icon={<X size={"16px"} />}
          className="removebutton"
          onClick={() => setModalRemove(true)}
        />
      </Flex>
      <Flex className="lineBR" vertical>
        <Flex justify="space-between">
          <Text className="subtitleLineBR">Medicamentos</Text>
          <Button icon={<X size={"16px"} />} className="removebutton" />
        </Flex>
        <Flex className="mainSublinesBR">
          <Tag
            closeIcon={<Button icon={<X size={"15px"} />} className="removebutton" />}
            className="tagSubLineBR"
          >
            Analgesicos
          </Tag>
          <Tag
            closeIcon={<Button icon={<X size={"15px"} />} className="removebutton" />}
            className="tagSubLineBR"
          >
            Sumplementos
          </Tag>
          <Tag
            closeIcon={<Button icon={<X size={"15px"} />} className="removebutton" />}
            className="tagSubLineBR"
          >
            Antiobioticos
          </Tag>
          <Tag
            closeIcon={<Button icon={<X size={"15px"} />} className="removebutton" />}
            className="tagSubLineBR"
          >
            asd
          </Tag>
        </Flex>
        <Button icon={<CaretDoubleRight size={"16px"} />} className="addButtonLineSub" type="text">
          Agregar sublinea
        </Button>
      </Flex>
      <Button icon={<CaretDoubleRight size={"16px"} />} className="addButtonLineSub" type="text">
        Agregar linea
      </Button>
    </Flex>
  );
};
