import {
  DocumentButton,
  DocumentButtonProps
} from "@/components/atoms/DocumentButton/DocumentButton";
import { Flex, Typography } from "antd";
const { Text } = Typography;
import styles from "./UploadFileButton.module.scss";

interface UploadFileButton extends DocumentButtonProps {
  title: string;
  isMandatory: boolean;
  column?: boolean;
}
const UploadFileButton = ({ isMandatory, title, column = false, ...props }: UploadFileButton) => {
  const displayFlex = column ? "flex" : "";
  const columnDirection = column ? "column" : "column-reverse";
  return (
    <div
      className={styles.uploaddocumentbutton}
      style={{ display: displayFlex, flexDirection: columnDirection }}
    >
      <Flex vertical justify="center">
        <Text className={styles.titleDocument}>{title}</Text>
        <Text className={styles.descriptionDocument}>
          *{isMandatory ? "Obligatorio" : "Opcional"}
        </Text>
      </Flex>
      <DocumentButton {...props} />
    </div>
  );
};

export default UploadFileButton;
