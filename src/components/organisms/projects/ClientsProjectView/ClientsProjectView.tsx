import { useState } from "react";

import { ClientsProjectTable } from "@/components/molecules/tables/ClientsProjectTable/ClientsProjectTable";
import { ClientProjectForm } from "@/components/molecules/tabs/Projects/ClientProjectForm/ClientProjectForm";

export const ClientsProjectView = () => {
  const [isCreateClient, setIsCreateClient] = useState(false);
  const [isViewDetailsClient, setIsViewDetailsClients] = useState({
    active: false,
    id: 0
  });

  const onGoBackTableUsers = () => {
    setIsCreateClient(false);
    setIsViewDetailsClients({
      active: false,
      id: 0
    });
  };

  return (
    <>
      {isCreateClient || isViewDetailsClient.active ? (
        <ClientProjectForm
          isViewDetailsClient={isViewDetailsClient}
          setIsViewDetailsClient={setIsViewDetailsClients}
          onGoBackTable={onGoBackTableUsers}
        />
      ) : (
        <ClientsProjectTable
          setIsViewDetailsClients={setIsViewDetailsClients}
          setIsCreateClient={setIsCreateClient}
        />
      )}
    </>
  );
};
