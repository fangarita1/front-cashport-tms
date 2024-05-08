import { Flex, Checkbox, Button, Typography, Spin } from "antd";
import { FileArrowUp, X } from "phosphor-react";
import { useDocumentByClient } from "@/hooks/useDocumentByClient";
import "./documentCards.scss";

const { Text } = Typography;

interface Props {
  clientTypeId: number;
  isDisabledEdit: boolean;
}

export const DocumentCards = ({ clientTypeId, isDisabledEdit }: Props) => {
  const { data, isLoading } = useDocumentByClient(clientTypeId);
  const documents = data?.data;
  return (
    <>
      {isLoading ? (
        <Spin />
      ) : (
        <div className="documentCards">
          {documents?.map((doc) => (
            <Flex className="documentCard" key={doc.id} vertical>
              <Flex justify="space-between">
                <Text className="documentCard__title">{doc.format_document.split("/").pop()}</Text>
                {!isDisabledEdit && <Button icon={<X size={"16px"} />} className="removebutton" />}
              </Flex>
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
