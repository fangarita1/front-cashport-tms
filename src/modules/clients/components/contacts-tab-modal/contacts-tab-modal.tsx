import { Dispatch, SetStateAction } from "react";
import { Flex, Modal } from "antd";
import { IContactForm } from "@/types/contacts/IContacts";
import SecondaryButton from "@/components/atoms/buttons/secondaryButton/SecondaryButton";
import PrincipalButton from "@/components/atoms/buttons/principalButton/PrincipalButton";

import { Controller, useForm } from "react-hook-form";
import { SelectContactRole } from "@/components/molecules/selects/contacts/SelectContactRole";
import "./contacts-tab-modal.scss";
import { InputForm } from "@/components/atoms/inputs/InputForm/InputForm";
import { SelectContactIndicative } from "@/components/molecules/selects/contacts/SelectContactIndicative";

type showContactModalType = {
  isOpen: boolean;
  contactId: number;
};

interface PropsInvoicesTable {
  showContactModal: showContactModalType;
  setShowContactModal: Dispatch<SetStateAction<showContactModalType>>;
}

const ContactsTabModal = ({ showContactModal, setShowContactModal }: PropsInvoicesTable) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<IContactForm>({
    mode: "onChange"
    // values: showContactModal.contactId ? selectedShipToData : undefined
  });

  const onSubmitForm = (data: IContactForm) => {
    console.log("submitted data:", data);
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
          <h2 className="contactModalContainer__header__title">Crear nuevo contacto</h2>
          <p className="contactModalContainer__header__info">
            Ingresa la información para crear un nuevo contacto
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
          <SecondaryButton>Cancelar</SecondaryButton>
          <PrincipalButton fullWidth disabled={!isValid} onClick={handleSubmit(onSubmitForm)}>
            Crear contacto
          </PrincipalButton>
        </div>
      </Flex>
    </Modal>
  );
};

export default ContactsTabModal;
