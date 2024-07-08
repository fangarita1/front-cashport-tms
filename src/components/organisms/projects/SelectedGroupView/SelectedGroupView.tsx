import { useEffect, useState } from "react";
import { Button, Flex, Spin } from "antd";
import { ArrowsClockwise, CaretLeft, Pencil } from "phosphor-react";
import { ModalChangeStatus } from "@/components/molecules/modals/ModalChangeStatus/ModalChangeStatus";
import { ModalRemove } from "@/components/molecules/modals/ModalRemove/ModalRemove";
import { useClientsGroups } from "@/hooks/useClientsGroups";

import "./selectedGroupView.scss";
import { GroupTable } from "@/components/molecules/tables/GroupTable/GroupTable";
import { ISingleClientGroup } from "@/types/clientsGroups/IClientsGroups";

interface PropsSelectedGroupView {
  onClickBack: () => void;
  onClickEdit: () => void;
  showGroupDetails: {
    groupId: number | undefined;
    showDetails: boolean;
  };
}
export const SelectedGroupView = ({
  onClickBack,
  onClickEdit,
  showGroupDetails
}: PropsSelectedGroupView) => {
  const [isOpenModalStatus, setIsOpenModalStatus] = useState({ status: false, remove: false });
  const [group, setGroup] = useState<ISingleClientGroup | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const { getGroup } = useClientsGroups({});

  useEffect(() => {
    const fetchGroup = async () => {
      if (showGroupDetails.groupId) {
        setLoading(true);
        try {
          const fetchedGroup = await getGroup(showGroupDetails.groupId);
          setGroup(fetchedGroup.data);
        } catch (error) {
          console.warn("Failed to fetch group:", error);
          setGroup(undefined);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchGroup();
  }, [showGroupDetails.groupId]);

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
      <Flex component={"header"} className="headerSelectedGroupView">
        <Button
          type="text"
          size="large"
          onClick={onClickBack}
          className="buttonGoBack"
          icon={<CaretLeft size={"1.45rem"} />}
        >
          {group?.group_name}
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

      {loading ? (
        <Spin style={{ margin: "50px auto" }} />
      ) : (
        group && <GroupTable dataClients={group?.clients} />
      )}

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
