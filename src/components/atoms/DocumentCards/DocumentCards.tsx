import { Flex, Checkbox, Button, Typography, Spin } from "antd";
import { FileArrowUp } from "phosphor-react";
import { useDocumentByClient } from "@/hooks/useDocumentByClient";
import "./documentCards.scss";

const { Text } = Typography;

interface Props {
  clientTypeId: number;
}

export const DocumentCards = ({ clientTypeId }: Props) => {
  const { data, isLoading } = useDocumentByClient(clientTypeId);
  console.log("data en DOCCARD: ", data?.data);
  const documents = data?.data;
  return (
    <>
      {isLoading ? (
        <Spin />
      ) : (
        <div className="documentCards">
          {documents?.map((doc) => (
            <Flex className="documentCard" key={doc.id} vertical>
              <Text className="documentCard__title">nombre documento</Text>
              <Checkbox className="documentCard__check" checked={Boolean(doc.required)}>
                Obligatorio
              </Checkbox>
              {doc.format_document && (
                <Button
                  type="text"
                  icon={
                    <FileArrowUp className="documentCard__documentTemplate__icon" size={"16px"} />
                  }
                  className="documentCard__documentTemplate"
                  href={doc.format_document}
                  target="_blank"
                >
                  {doc.format_document.split("/").pop()}.
                </Button>
              )}
            </Flex>
          ))}
        </div>
      )}
    </>
  );
};
