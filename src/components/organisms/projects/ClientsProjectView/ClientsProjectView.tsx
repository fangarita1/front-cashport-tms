import { useState } from "react";
import { ClientsProjectTable } from "@/components/molecules/tables/ClientsProjectTable/ClientsProjectTable";
import { ClientProjectForm } from "@/components/molecules/tabs/Projects/ClientProjectForm/ClientProjectForm";

export const ClientsProjectView = () => {
  const [isCreateUser, setIsCreateUser] = useState(false);
  return (
    <>
      {isCreateUser ? (
        <ClientProjectForm />
      ) : (
        <ClientsProjectTable setIsCreateUser={setIsCreateUser} />
      )}
    </>
  );
};
