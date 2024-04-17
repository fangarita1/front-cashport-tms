import { useState } from "react";
import { GroupTable } from "@/components/molecules/tables/GroupTable/GroupTable";
import { ClientsGroupsTable } from "@/components/molecules/tables/ClientsGroupsTable/ClientsGroupsTable";

export const ClientsGroupsProjectView = () => {
  const [showGroupDetails, setShowGroupDetails] = useState(false);

  const goBackToClientsGroups = () => {
    setShowGroupDetails(false);
  };

  return (
    <>
      {showGroupDetails ? (
        <GroupTable onClickBack={goBackToClientsGroups} />
      ) : (
        <ClientsGroupsTable setShowGroupDetails={setShowGroupDetails} />
      )}
    </>
  );
};
