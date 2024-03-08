import { Button, Flex, Typography } from "antd";
import { FileArrowUp, X } from "phosphor-react";

import "./documentbutton.scss";

const { Text } = Typography;

interface Props {
  fileName?: string;
  fileSize?: string;
  customStyle?: any;
}

export const DocumentButton = ({
  fileName = "archivo.pdf",
  fileSize = "200KB",
  customStyle = {}
}: Props) => {
  return (
    <Flex style={customStyle} className="documentButton" vertical justify="center">
      <Flex justify="space-between" align="center">
        <Flex>
          <FileArrowUp size={"25px"} />
          <Text className="nameFile">{fileName}</Text>
        </Flex>
        <Button type="text" icon={<X size={"20px"} />} />
      </Flex>
      <Text className="sizeFile">{fileSize}</Text>
    </Flex>
  );
};
