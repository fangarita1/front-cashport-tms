import { Flex, Checkbox, Button, Typography } from "antd";
import { FileArrowUp } from "phosphor-react";
import "./documentCard.scss";

const { Text } = Typography;

export const DocumentCard = () => {
  const template = true;
  return (
    <Flex className="documentCard" vertical>
      <Text className="documentCard__title">nombre documento</Text>
      <Checkbox className="documentCard__check" checked={true}>
        Obligatorio
      </Checkbox>
      {template && (
        <Button
          type="text"
          icon={<FileArrowUp className="documentCard__documentTemplate__icon" size={"16px"} />}
          className="documentCard__documentTemplate"
          // href={document.format_document}
          target="_blank"
        >
          Plantilla_Csssss
        </Button>
      )}
    </Flex>
  );
};
