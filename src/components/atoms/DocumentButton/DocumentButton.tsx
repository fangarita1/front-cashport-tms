import { Flex, Typography } from "antd";
import { FileArrowUp } from "phosphor-react";

import "./documentbutton.scss";

const { Text } = Typography;

interface Props {
  fileName: string;
  fileSize: string;
}

export const DocumentButton = ({ fileName = "archivo.pdf", fileSize = "200KB" }: Props) => {
  return (
    <Flex className="documentButton" vertical justify="center">
      <Flex>
        <FileArrowUp size={"25px"} />
        <Text className="nameFile">{fileName}</Text>
      </Flex>
      <Text className="sizeFile">{fileSize}</Text>
    </Flex>
  );
};
