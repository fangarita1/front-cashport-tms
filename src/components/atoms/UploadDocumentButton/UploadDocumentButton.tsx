import { Flex, Typography } from "antd";
import { DocumentButton } from "../DocumentButton/DocumentButton";
const { Text } = Typography;
import "./uploaddocumentbutton.scss";

interface DocumentProps {
  title: string;
  isMandatory: boolean;
}

export const UploadDocumentButton = ({ title, isMandatory }: DocumentProps) => {
  return (
    <Flex className="uploaddocumentbutton">
      <Flex vertical>
        <Text className="titleDocument">{title}</Text>
        <Text className="descriptionDocument">*{isMandatory ? "Obligatorio" : "Opcional"}</Text>
      </Flex>
      <DocumentButton customStyle={{ width: "70%" }} />
    </Flex>
  );
};
