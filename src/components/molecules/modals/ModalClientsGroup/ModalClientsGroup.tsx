import { Dispatch, SetStateAction, useState } from "react";
import { Flex, Modal, Typography } from "antd";
import { useForm } from "react-hook-form";
import { InputForm } from "@/components/atoms/inputs/InputForm/InputForm";
import { ClientsProjectTable } from "@/components/molecules/tables/ClientsProjectTable/ClientsProjectTable";
import { createGroup, updateGroup } from "@/services/groupClients/groupClients";

import "./modalClientsGroup.scss";
import { IClient } from "@/types/clients/IClients";

const { Text } = Typography;

interface CreateGroupProps {
  isOpen: boolean;
  isEditGroup?: boolean;
  setIsOpenModal: Dispatch<SetStateAction<boolean>>;
}

export type NameType = {
  name: string;
};

export const ModalClientsGroup = ({ isOpen, setIsOpenModal, isEditGroup }: CreateGroupProps) => {
  const [groupName, setGroupName] = useState("");
  const [selectedRows, setSelectedRows] = useState<any>([]);

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<NameType>({
    defaultValues: { name: "" }
  });

  const onSubmitName = (data: NameType) => {
    setGroupName(data.name);
  };

  const onCancel = () => {
    setIsOpenModal(false);
    setGroupName("");
  };

  const onCreateGroup = () => {
    if (selectedRows.length <= 0) {
      alert("Selecciona clientes para añadir al grupo");
      return;
    }
    if (selectedRows.length > 0) {
      try {
        const group = {
          name: groupName,
          clients: selectedRows.map((client: IClient) => client.nit)
        };
        createGroup(group);
      } catch (error) {
        console.log(error);
      }
    }

    setIsOpenModal(false);
    setGroupName("");
    setSelectedRows([]);
  };

  const onUpdateGroup = () => {
    if (selectedRows.length > 0) {
      try {
        const group = {
          group_id: 3,
          clients: selectedRows.map((client: IClient) => client.nit)
        };
        updateGroup(group);
      } catch (error) {
        console.log(error);
      }
    }

    setIsOpenModal(false);
    setGroupName("");
    setSelectedRows([]);
  };

  return (
    <>
      {groupName === "" && !isEditGroup ? (
        <Modal
          title="Nuevo Grupo de Clientes"
          open={isOpen}
          onCancel={onCancel}
          okButtonProps={{
            className: "buttonOk"
          }}
          cancelButtonProps={{
            className: "buttonCancel"
          }}
          okText="Continuar"
          cancelText="Cancelar"
          className="modalCreateClientsGroup"
          onOk={() => {
            handleSubmit(onSubmitName)();
          }}
        >
          <Flex vertical>
            <Text>Ingresa el nombre del grupo de clientes</Text>
            <form className="inputcreatezone">
              <InputForm
                titleInput="Nombre del grupo"
                control={control}
                nameInput="name"
                error={errors.name}
                customStyle={{
                  width: "96%",
                  backgroundColor: "transparent !important",
                  border: "1px solid white",
                  borderRadius: ".8rem"
                }}
                placeholder="Nombre"
              />
            </form>
          </Flex>
        </Modal>
      ) : (
        <Modal
          width={900}
          title={isEditGroup ? "Nombre grupo a editar" : groupName}
          open={isOpen}
          onCancel={onCancel}
          okButtonProps={{
            className: "buttonOk"
          }}
          cancelButtonProps={{
            className: "buttonCancel"
          }}
          okText={isEditGroup ? "Actualizar grupo" : "Crear Grupo"}
          cancelText="Cancelar"
          className="modalCreateClientsGroup"
          onOk={() => {
            isEditGroup ? onUpdateGroup() : onCreateGroup();
          }}
        >
          <Flex vertical>
            <Text>
              {isEditGroup
                ? "Selecciona los clientes para añadir/quitar del grupo"
                : "Selecciona los clientes para añadir al grupo"}
            </Text>
            <ClientsProjectTable
              placedIn="modal"
              setSelectedRows={setSelectedRows}
              selectedClientsKeys={["0347623472-5643", "4347623472-5643"]}
            />
          </Flex>
        </Modal>
      )}
    </>
  );
};
