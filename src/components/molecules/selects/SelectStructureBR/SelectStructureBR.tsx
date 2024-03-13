import { useState } from "react";
import { Button, Flex, Popover, Typography } from "antd";
import { Plus } from "phosphor-react";

import { ChannelBR } from "@/components/atoms/ChannelBR/ChannelBR";

import { InputCreateZone } from "@/components/atoms/InputCreateZone/InputCreateZone";
import { ModalRemoveChanel } from "../../modals/ModalRemoveChanel/ModalRemoveChanel";

import "./selectzonebr.scss";

export const SelectStructureBR = () => {
  const [modalRemove, setModalRemove] = useState(false);
  return (
    <>
      <div className="selectzonebr">
        <Typography.Text className="title">Estructura</Typography.Text>
        <Flex vertical className="zones">
          <ChannelBR setModalRemove={setModalRemove} />
          <Popover content={<InputCreateZone isEditAvailable />} trigger="click" placement="bottom">
            <Button icon={<Plus size={"16px"} />} className="addButton" type="text">
              Agregar Canal
            </Button>
          </Popover>
        </Flex>
      </div>
      <ModalRemoveChanel
        isOpen={modalRemove}
        onClose={() => setModalRemove(false)}
        onRemove={() => setModalRemove(false)}
      />
    </>
  );
};
