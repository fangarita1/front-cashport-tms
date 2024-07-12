import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Flex, Modal } from "antd";
import { IContact, IContactForm } from "@/types/contacts/IContacts";
import SecondaryButton from "@/components/atoms/buttons/secondaryButton/SecondaryButton";
import PrincipalButton from "@/components/atoms/buttons/principalButton/PrincipalButton";
import { Controller, useForm } from "react-hook-form";
import { SelectContactRole } from "@/components/molecules/selects/contacts/SelectContactRole";
import { InputForm } from "@/components/atoms/inputs/InputForm/InputForm";
import { SelectContactIndicative } from "@/components/molecules/selects/contacts/SelectContactIndicative";
import { MessageType, useMessageApi } from "@/context/MessageContext";
import { getContact } from "@/services/contacts/contacts";
import "./contacts-tab-modal.scss";

type showContactModalType = {
  isOpen: boolean;
  contactId: number;
};

interface PropsInvoicesTable {
  showContactModal: showContactModalType;
  setShowContactModal: Dispatch<SetStateAction<showContactModalType>>;
  createContact: (
    // eslint-disable-next-line no-unused-vars
    contactInfo: IContactForm,
    // eslint-disable-next-line no-unused-vars
    showMessage: (type: MessageType, content: string) => void
  ) => Promise<void>;
  updateContact: (
    // eslint-disable-next-line no-unused-vars
    contactInfo: IContactForm,
    // eslint-disable-next-line no-unused-vars
    contactId: number,
    // eslint-disable-next-line no-unused-vars
    showMessage: (type: MessageType, content: string) => void
  ) => Promise<void>;
  clientId: number;
}

const ContactsTabModal = ({
  showContactModal,
  setShowContactModal,
  createContact,
  updateContact,
  clientId
}: PropsInvoicesTable) => {
  const { showMessage } = useMessageApi();
  const [contactDetails, setContactDetails] = useState<IContact>();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<IContactForm>({
    mode: "onChange",
    values: contactDetails ? dataToForm(contactDetails) : undefined
  });

  useEffect(() => {
    const fetchData = async () => {
      if (showContactModal.contactId) {
        const response = await getContact(clientId, showContactModal.contactId);
        setContactDetails(response.data[0]);
      }
    };

    fetchData();
  }, [showContactModal.contactId]);

  const onSubmitForm = (data: IContactForm) => {
    if (showContactModal.contactId) {
      updateContact(data, showContactModal.contactId, showMessage);
    } else {
      createContact(data, showMessage);
    }

    setShowContactModal({ isOpen: false, contactId: 0 });
  };

  return (
    <Modal
      width={"50%"}
      destroyOnClose
      open={showContactModal.isOpen}
      className="contactModalContainer"
      footer={false}
      onCancel={() => {
        setShowContactModal({ isOpen: false, contactId: 0 });
      }}
    >
      <Flex vertical gap={24}>
        <div className="contactModalContainer__header">
          <h2 className="contactModalContainer__header__title">
            {showContactModal.contactId ? "Datos de contacto" : "Crear nuevo contacto"}
          </h2>
          <p className="contactModalContainer__header__info">
            Ingresa la información
            {showContactModal.contactId
              ? " para editar un contacto existente"
              : " para crear un nuevo contacto"}
          </p>
        </div>

        <div className="contactModalContainer__content">
          <InputForm titleInput="Nombres" control={control} nameInput="name" error={errors.name} />
          <InputForm
            titleInput="Apellidos"
            control={control}
            nameInput="lastname"
            error={errors.lastname}
          />
          <InputForm
            titleInput="Cargo"
            control={control}
            nameInput="position"
            error={errors.position}
          />
          <div className="inputContainer">
            <h5 className="inputContainer__title">Rol</h5>
            <Controller
              name="role"
              control={control}
              rules={{ required: true }}
              render={({ field }) => <SelectContactRole errors={errors.role} field={field} />}
            />
          </div>
          <div className="inputContainer">
            <h5 className="inputContainer__title">Indicativo</h5>
            <Controller
              name="indicative"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <SelectContactIndicative errors={errors.indicative} field={field} />
              )}
            />
          </div>
          <InputForm
            titleInput="Teléfono"
            control={control}
            nameInput="phone"
            error={errors.phone}
          />
          <InputForm titleInput="Email" control={control} nameInput="email" error={errors.email} />
        </div>

        <div className="contactModalContainer__footer">
          <SecondaryButton onClick={() => setShowContactModal({ isOpen: false, contactId: 0 })}>
            Cancelar
          </SecondaryButton>
          <PrincipalButton disabled={!isValid} onClick={handleSubmit(onSubmitForm)}>
            {showContactModal.contactId ? "Editar contacto" : "Crear contacto"}
          </PrincipalButton>
        </div>
      </Flex>
    </Modal>
  );
};

export default ContactsTabModal;

const dataToForm = (data: IContact): IContactForm => {
  return {
    name: data.contact_name,
    lastname: data.contact_lastname,
    position: data.name_position,
    role: { label: data.contact_position, value: data.contact_position_id },
    indicative: {
      label: `${data.country_calling_code} ${data.country_name}`,
      value: data.country_calling_code_id
    },
    phone: data.contact_phone,
    email: data.contact_email
  };
};
