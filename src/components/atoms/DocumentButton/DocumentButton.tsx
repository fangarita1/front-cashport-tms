import { Flex, Typography } from "antd";
import { FileArrowUp } from "phosphor-react";
import type { UploadProps } from "antd";
import { Upload } from "antd";
const { Dragger } = Upload;

import "./documentbutton.scss";

const { Text } = Typography;

interface Props {
  title?: string;
  fileName?: string;
  fileSize?: any;
  customStyle?: any;
  handleOnChange?: () => void;
  handleOnDrop?: () => void;
  disabled?: boolean;
}

export const DocumentButton = ({
  title = "file",
  fileName = "Seleccionar archivo",
  fileSize = "PDF, Word, PNG (Tamaño max 30mb)",
  handleOnChange,
  handleOnDrop,
  disabled
}: Props) => {
  const props: UploadProps = {
    name: title,
    onChange: handleOnChange,
    onDrop: handleOnDrop,
    accept: ".pdf, .png, .doc, .docx",
    showUploadList: false,
    customRequest: () => {
      return;
    },
    disabled
  };

  if (typeof fileSize !== "string") {
    fileSize = `${(fileSize / (1024 * 1024)).toFixed(2)} MB`;
  }

  return (
    <Dragger className="test" {...props}>
      <Flex align="left">
        <Flex>
          <FileArrowUp size={"25px"} />
          <Text className="nameFile">{fileName}</Text>
        </Flex>
      </Flex>
      <Text className="sizeFile">{fileSize}</Text>
    </Dragger>
  );
};
