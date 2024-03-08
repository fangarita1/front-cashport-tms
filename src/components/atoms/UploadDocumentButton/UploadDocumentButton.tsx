import { Flex, Typography } from "antd";
import { DocumentButton } from "../DocumentButton/DocumentButton";
const { Text } = Typography;
import "./uploaddocumentbutton.scss";
export const UploadDocumentButton = () => {
  return (
    <Flex className="uploaddocumentbutton">
      <Flex vertical>
        <Text className="titleDocument">RUT</Text>
        <Text className="descriptionDocument">*Obligatorio</Text>
      </Flex>
      <DocumentButton customStyle={{ width: "80%" }} />
    </Flex>
  );
};
