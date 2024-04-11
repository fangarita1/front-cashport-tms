import { Button, Flex, Popover, Typography } from "antd";
import { Plus } from "phosphor-react";

import { InputCreateZone } from "@/components/atoms/inputs/InputCreateZone/InputCreateZone";

import "./selectzonebr.scss";

export const SelectDocumentsByClientBR = () => {
  return (
    <div className="selectzonebr">
      <Typography.Text className="title">Documentos por cliente</Typography.Text>
      <Flex vertical className="zones">
        <Popover content={<InputCreateZone isEditAvailable />} trigger="click" placement="bottom">
          <Button icon={<Plus size={"16px"} />} className="addButton" type="text">
            Agregar cliente
          </Button>
        </Popover>
      </Flex>
    </div>
  );
};
