import React, { useEffect } from "react";
import { Flex, Typography } from "antd";
import { FileArrowUp } from "phosphor-react";
import "./documentButtonAction.scss";

const { Text } = Typography;

interface Props {
  title?: string;
  fileName?: string;
  fileSize?: any;
  className?: any;
  disabled?: boolean;
  documentUrl?: string; // Agregado para la URL del documento
}

export const DocumentButtonAction = ({
  className,
  documentUrl // Agregado para la URL del documento
}: Props) => {
  const handleDocumentClick = () => {
    const fileExtension = documentUrl?.split(".").pop()?.toLowerCase() ?? "";

    if (fileExtension === "pdf") {
      window.open(documentUrl, "_blank");
    } else if (["png", "jpg", "jpeg"].includes(fileExtension)) {
      console.log("imagen");
    } else {
      alert("Formato de archivo no soportado");
    }
  };

  return (
    <div
      className={className ? `documentDragger ${className}` : "documentDragger"}
      onClick={handleDocumentClick}
    >
      <Flex justify="space-between" align="center">
        <Flex align="left" vertical>
          <Flex>
            <FileArrowUp size={"25px"} />
            <Text className="nameFile">
              {documentUrl ? documentUrl.split("/").pop() : "Seleccionar archivo"}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </div>
  );
};
