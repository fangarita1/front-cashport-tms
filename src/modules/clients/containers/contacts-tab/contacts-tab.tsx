import { useState } from "react";
import { useParams } from "next/navigation";
import { Flex, Spin } from "antd";
import { Plus } from "phosphor-react";
import UiSearchInput from "@/components/ui/search-input";
import { extractSingleParam } from "@/utils/utils";
import { DotsDropdown } from "@/components/atoms/DotsDropdown/DotsDropdown";
import UiFilterDropdown from "@/components/ui/ui-filter-dropdown";

import "./contacts-tab.scss";
import PrincipalButton from "@/components/atoms/buttons/principalButton/PrincipalButton";
import ContactsTable from "../../components/contacts-table";
import { IContact } from "@/types/contacts/IContacts";
import { useClientContacts } from "@/hooks/useClientContacts";

const ContactsTab = () => {
  const [selectedRows, setSelectedRows] = useState<IContact[] | undefined>(undefined);
  const [showContactModal, setShowContactModal] = useState<{
    isOpen: boolean;
    contactId: number;
  }>({} as { isOpen: boolean; contactId: number });
  const [search, setSearch] = useState("");

  const params = useParams();
  const clientIdParam = extractSingleParam(params.clientId);
  const clientId = clientIdParam ? parseInt(clientIdParam) : 0;

  // Hacer el hook de get contacts by client
  const { data, isLoading } = useClientContacts(clientId);
  console.log("contactsData:", data);

  // const mockData = [] as IContact[];

  return (
    <>
      {isLoading ? (
        <Flex justify="center" align="center" style={{ height: "3rem" }}>
          <Spin />
        </Flex>
      ) : (
        <div className="contactsTab">
          <Flex justify="space-between" className="contactsTab__header">
            <Flex gap={"0.5rem"}>
              <UiSearchInput
                className="search"
                placeholder="Buscar"
                onChange={(event) => {
                  setTimeout(() => {
                    setSearch(event.target.value);
                  }, 1000);
                }}
              />
              <UiFilterDropdown />
              <DotsDropdown />
            </Flex>

            <PrincipalButton
              type="primary"
              // className="availableAdjustments"
              onClick={() => console.log("click crear nuevocontacto")}
            >
              Nuevo Contacto
              <Plus size={16} style={{ marginLeft: "0.5rem" }} />
            </PrincipalButton>
          </Flex>

          <ContactsTable
            dataAllContacts={data ? data.data : []}
            setSelectedRows={setSelectedRows}
            setShowContactModal={setShowContactModal}
          />
        </div>
      )}
    </>
  );
};

export default ContactsTab;
