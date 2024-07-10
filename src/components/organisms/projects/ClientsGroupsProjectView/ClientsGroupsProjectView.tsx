import { useState } from "react";
import { SelectedGroupView } from "@/components/organisms/projects/SelectedGroupView/SelectedGroupView";
import { ClientsGroupsTable } from "@/components/molecules/tables/ClientsGroupsTable/ClientsGroupsTable";
import { ModalClientsGroup } from "@/components/molecules/modals/ModalClientsGroup/ModalClientsGroup";

export type groupInfo = {
  groupId: number;
  groupName: string;
  clientsIds: number[];
};

export const ClientsGroupsProjectView = () => {
  const [showGroupDetails, setShowGroupDetails] = useState<{
    groupId: number | undefined;
    showDetails: boolean;
  }>({
    groupId: undefined,
    showDetails: false
  });
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [groupInfoForEdit, setGroupInfoForEdit] = useState<groupInfo>({} as groupInfo);

  const goBackToClientsGroups = () => {
    setShowGroupDetails({ groupId: undefined, showDetails: false });
  };

  const openEditModal = () => {
    setIsOpenModal(true);
  };

  return (
    <>
      {showGroupDetails.showDetails ? (
        <SelectedGroupView
          onClickBack={goBackToClientsGroups}
          onClickEdit={openEditModal}
          setGroupInfoForEdit={setGroupInfoForEdit}
          showGroupDetails={showGroupDetails}
        />
      ) : (
        <ClientsGroupsTable setShowGroupDetails={setShowGroupDetails} />
      )}
      <ModalClientsGroup
        isOpen={isOpenModal}
        isEditGroup={true}
        setIsOpenModal={setIsOpenModal}
        selectedGroupInfo={groupInfoForEdit}
      />
    </>
  );
};
