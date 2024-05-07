import { Button, Flex, Popover, Spin, Typography } from "antd";
import { CaretRight, X, Plus } from "phosphor-react";

import { useClientTypes } from "@/hooks/useClientTypes";
import { InputCreateClientType } from "@/components/atoms/inputs/InputCreateClientType/InputCreateClientType";
import { DocumentCards } from "@/components/atoms/DocumentCards/DocumentCards";
import { InputCreateDocument } from "@/components/atoms/inputs/inputCreate/InputCreateDocument";

import "./documentclientbr.scss";

const { Text } = Typography;

interface Props {
  isDisabledEdit: boolean;
}

export const DocumentClientBR = ({ isDisabledEdit }: Props) => {
  const { data, loading } = useClientTypes();

  return (
    <div className="contianerdocumentclientbr">
      <Typography.Text className="title">Documentos por cliente</Typography.Text>
      <Flex vertical className="clientTypes">
        {loading ? (
          <Spin />
        ) : (
          <Flex className="documentclientbr" vertical gap={"0.5rem"}>
            {data?.map((document) => (
              <Flex className="clientTypeCard" vertical key={document.id}>
                <Flex justify="space-between">
                  <Text className="clientTypeCard__title">{document.clientType}</Text>
                  {!isDisabledEdit && (
                    <Button icon={<X size={"16px"} />} className="removebutton" />
                  )}
                </Flex>
                <DocumentCards clientTypeId={document.id} isDisabledEdit={isDisabledEdit} />

                {!isDisabledEdit && (
                  <Popover
                    content={<InputCreateDocument clientTypeId={document.id} />}
                    trigger="click"
                    placement="bottom"
                  >
                    <Button
                      icon={<CaretRight size={"16px"} />}
                      className="addButtonLineSub"
                      type="text"
                    >
                      Agregar documento
                    </Button>
                  </Popover>
                )}
              </Flex>
            ))}
            {!isDisabledEdit && (
              <Popover
                content={<InputCreateClientType isEditAvailable={!isDisabledEdit} />}
                trigger="click"
                placement="bottom"
              >
                <Button icon={<Plus size={"16px"} />} className="addButtonLineSub" type="text">
                  Agregar cliente
                </Button>
              </Popover>
            )}
          </Flex>
        )}
      </Flex>
    </div>
  );
};
