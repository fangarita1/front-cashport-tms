import { useState } from "react";
import { GroupTable } from "@/components/molecules/tables/GroupTable/GroupTable";
import { ClientsGroupsTable } from "@/components/molecules/tables/ClientsGroupsTable/ClientsGroupsTable";
import { ModalClientsGroup } from "@/components/molecules/modals/ModalClientsGroup/ModalClientsGroup";

export const ClientsGroupsProjectView = () => {
  const [showGroupDetails, setShowGroupDetails] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const goBackToClientsGroups = () => {
    setShowGroupDetails(false);
  };

  const openEditModal = () => {
    setIsOpenModal(true);
  };

  return (
    <>
      {showGroupDetails ? (
        <GroupTable onClickBack={goBackToClientsGroups} onClickEdit={openEditModal} />
      ) : (
        <ClientsGroupsTable setShowGroupDetails={setShowGroupDetails} />
      )}
      <ModalClientsGroup isOpen={isOpenModal} isEditGroup={true} setIsOpenModal={setIsOpenModal} />
    </>
  );
};
