import { useState } from "react";
import { CommunicationsTable } from "@/components/molecules/tables/CommunicationsTable/CommunicationsTable";
import { CommunicationProjectForm } from "@/components/molecules/tabs/Projects/CommunicationProjectForm/CommunicationProjectForm";

type showCommunicationDetails = {
  communicationId: number;
  active: boolean;
};

export const CommunicationsProjectView = () => {
  const [isCreateCommunication, setIsCreateCommunication] = useState(false);
  const [showCommunicationDetails, setShowCommunicationDetails] =
    useState<showCommunicationDetails>({} as showCommunicationDetails);

  const goBackToCommunicationsTable = () => {
    setShowCommunicationDetails({} as showCommunicationDetails);
    setIsCreateCommunication(false);
  };

  const onCreateCommunication = () => {
    setIsCreateCommunication(true);
  };

  return (
    <>
      {isCreateCommunication || showCommunicationDetails.active ? (
        <CommunicationProjectForm
          onGoBackTable={goBackToCommunicationsTable}
          showCommunicationDetails={showCommunicationDetails}
        />
      ) : (
        <CommunicationsTable
          setShowCommunicationDetails={setShowCommunicationDetails}
          onCreateCommunication={onCreateCommunication}
        />
      )}
    </>
  );
};
