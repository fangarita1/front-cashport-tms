import { useState } from "react";
import { Button, Flex } from "antd";
import { ArrowsClockwise, CaretLeft, Pencil } from "phosphor-react";
import { ClientsProjectTable } from "../ClientsProjectTable/ClientsProjectTable";
import { ModalChangeStatus } from "@/components/molecules/modals/ModalChangeStatus/ModalChangeStatus";
import { ModalRemove } from "@/components/molecules/modals/ModalRemove/ModalRemove";

import "./groupTable.scss";

interface PropsGroupTable {
  onClickBack: () => void;
  onClickEdit: () => void;
}
export const GroupTable = ({ onClickBack, onClickEdit }: PropsGroupTable) => {
  const [isOpenModalStatus, setIsOpenModalStatus] = useState({ status: false, remove: false });

  const onRemoveGroup = async () => {
    setIsOpenModalStatus({ status: false, remove: false });
  };

  const onActiveGroup = async () => {
    setIsOpenModalStatus({ status: false, remove: false });
  };

  const onInactiveGroup = async () => {
    setIsOpenModalStatus({ status: false, remove: false });
  };
  const onClickChangeState = () => {
    setIsOpenModalStatus({ status: true, remove: false });
  };

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

      <ModalChangeStatus
        isActiveStatus={true}
        isOpen={isOpenModalStatus.status}
        onActive={onActiveGroup}
        onDesactivate={onInactiveGroup}
        onRemove={() => setIsOpenModalStatus({ remove: true, status: false })}
        onClose={() => setIsOpenModalStatus({ status: false, remove: false })}
      />
      <ModalRemove
        name="usuario"
        isOpen={isOpenModalStatus.remove}
        onClose={() => setIsOpenModalStatus({ status: false, remove: false })}
        onRemove={onRemoveGroup}
      />
    </>
  );
};
