// import { Dispatch, SetStateAction, useState } from "react";
import { ClientsProjectTable } from "../ClientsProjectTable/ClientsProjectTable";
import { Button, Flex } from "antd";
import { ArrowsClockwise, CaretLeft, Pencil } from "phosphor-react";

import "./groupTable.scss";

interface PropsGroupTable {
  onClickBack: () => void;
  onClickEdit: () => void;
  onClickChangeState: () => void;
}
export const GroupTable = ({ onClickBack, onClickEdit, onClickChangeState }: PropsGroupTable) => {
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
            onClick={onClickChangeState}
            icon={<ArrowsClockwise size={"1.45rem"} />}
          >
            Cambiar Estado
          </Button>
          <Button
            size="large"
            onClick={onClickEdit}
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
