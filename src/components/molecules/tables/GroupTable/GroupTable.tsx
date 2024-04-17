// import { Dispatch, SetStateAction, useState } from "react";
import { ClientsProjectTable } from "../ClientsProjectTable/ClientsProjectTable";
import { Button, Flex } from "antd";
import { ArrowsClockwise, CaretLeft, Pencil } from "phosphor-react";

import "./groupTable.scss";

interface PropsGroupTable {
  onClickBack: () => void;
}
export const GroupTable = ({ onClickBack }: PropsGroupTable) => {
  return (
    <>
      <Flex component={"header"} className="headerGroupTable">
        <Button
          type="text"
          size="large"
          onClick={onClickBack}
          className="buttonGoBack"
          icon={<CaretLeft size={"1.45rem"} />}
        >
          {"Nombre_grupo"}
        </Button>

        <Flex gap="1.5rem">
          <Button
            size="large"
            htmlType="button"
            className="buttonOutlined"
            onClick={() => {
              console.log("Click en cambiar estado de grupo");
            }}
            icon={<ArrowsClockwise size={"1.45rem"} />}
          >
            Cambiar Estado
          </Button>
          <Button
            size="large"
            onClick={() => {
              console.log("Abrir Modal de crear grupo");
            }}
            className="buttonOutlined"
            icon={<Pencil size={"1.45rem"} />}
          >
            Editar Grupo
          </Button>
        </Flex>
      </Flex>

      <ClientsProjectTable placedIn="groupTable" />
    </>
  );
};
