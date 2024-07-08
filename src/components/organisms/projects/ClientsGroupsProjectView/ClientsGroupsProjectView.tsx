import { useState } from "react";
import { SelectedGroupView } from "@/components/organisms/projects/SelectedGroupView/SelectedGroupView";
import { ClientsGroupsTable } from "@/components/molecules/tables/ClientsGroupsTable/ClientsGroupsTable";
import { ModalClientsGroup } from "@/components/molecules/modals/ModalClientsGroup/ModalClientsGroup";

export const ClientsGroupsProjectView = () => {
  const [showGroupDetails, setShowGroupDetails] = useState<{
    groupId: number | undefined;
    showDetails: boolean;
  }>({
    groupId: undefined,
    showDetails: false
  });
  const [isOpenModal, setIsOpenModal] = useState(false);

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
          showGroupDetails={showGroupDetails}
        />
      ) : (
        <ClientsGroupsTable setShowGroupDetails={setShowGroupDetails} />
      )}
      <ModalClientsGroup isOpen={isOpenModal} isEditGroup={true} setIsOpenModal={setIsOpenModal} />
    </>
  );
};
