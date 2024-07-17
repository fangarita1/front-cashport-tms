import { useState } from "react";
import { CommunicationsTable } from "@/components/molecules/tables/CommunicationsTable/CommunicationsTable";

type showCommunicationDetails = {
  communicationId: number;
  showDetails: boolean;
};

export const CommunicationsProjectView = () => {
  const [showCommunicationDetails, setShowCommunicationDetails] =
    useState<showCommunicationDetails>({} as showCommunicationDetails);

  const goBackToCommunicationsTable = () => {
    setShowCommunicationDetails({} as showCommunicationDetails);
  };

  return (
    <>
      {showCommunicationDetails.showDetails ? (
        <p>WIP</p>
      ) : (
        <CommunicationsTable setShowCommunicationDetails={setShowCommunicationDetails} />
      )}
    </>
  );
};
