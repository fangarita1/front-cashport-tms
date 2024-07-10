import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button, Flex, Spin } from "antd";
import { ArrowsClockwise, CaretLeft, Pencil } from "phosphor-react";
import { ModalChangeStatus } from "@/components/molecules/modals/ModalChangeStatus/ModalChangeStatus";
import { ModalRemove } from "@/components/molecules/modals/ModalRemove/ModalRemove";
import { useClientsGroups } from "@/hooks/useClientsGroups";

import "./selectedGroupView.scss";
import { GroupTable } from "@/components/molecules/tables/GroupTable/GroupTable";
import { ISingleClientGroup } from "@/types/clientsGroups/IClientsGroups";
import { groupInfo } from "../ClientsGroupsProjectView/ClientsGroupsProjectView";

interface PropsSelectedGroupView {
  onClickBack: () => void;
  onClickEdit: () => void;
  showGroupDetails: {
    groupId: number | undefined;
    showDetails: boolean;
  };
  setGroupInfoForEdit: Dispatch<SetStateAction<groupInfo>>;
}
export const SelectedGroupView = ({
  onClickBack,
  onClickEdit,
  showGroupDetails,
  setGroupInfoForEdit
}: PropsSelectedGroupView) => {
  const [isOpenModalStatus, setIsOpenModalStatus] = useState({ status: false, remove: false });
  const [group, setGroup] = useState<ISingleClientGroup>({} as ISingleClientGroup);
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
          setGroup({} as ISingleClientGroup);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchGroup();
  }, [showGroupDetails.groupId]);

  const handleEditGroup = () => {
    setGroupInfoForEdit({
      groupId: group.id,
      groupName: group.group_name,
      clientsIds: group.clients.map((client) => client.id)
    });
    onClickEdit();
  };

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
            onClick={handleEditGroup}
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
