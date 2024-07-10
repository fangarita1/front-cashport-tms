import { Dispatch, SetStateAction, useState } from "react";
import { Flex, message, Modal, Typography } from "antd";
import { useForm } from "react-hook-form";
import { InputForm } from "@/components/atoms/inputs/InputForm/InputForm";
import { ClientsProjectTable } from "@/components/molecules/tables/ClientsProjectTable/ClientsProjectTable";
import { createGroup, updateGroup } from "@/services/groupClients/groupClients";

import "./modalClientsGroup.scss";
import { IClient } from "@/types/clients/IClients";
import { useAppStore } from "@/lib/store/store";
import { groupInfo } from "@/components/organisms/projects/ClientsGroupsProjectView/ClientsGroupsProjectView";

const { Text } = Typography;

interface CreateGroupProps {
  isOpen: boolean;
  isEditGroup?: boolean;
  setIsOpenModal: Dispatch<SetStateAction<boolean>>;
  selectedGroupInfo?: groupInfo;
}

export type NameType = {
  name: string;
};

export const ModalClientsGroup = ({
  isOpen,
  setIsOpenModal,
  isEditGroup,
  selectedGroupInfo
}: CreateGroupProps) => {
  const [groupName, setGroupName] = useState("");
  const { ID } = useAppStore((state) => state.selectProject);
  const [selectedRows, setSelectedRows] = useState<IClient[]>([]);
  const [messageApi, contextHolder] = message.useMessage();
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
      messageApi.open({ type: "warning", content: "Selecciona clientes para añadir al grupo" });
      return;
    }
    if (selectedRows.length > 0) {
      try {
        const group = {
          name: groupName,
          clients: selectedRows.map((client: IClient) => client.nit)
        };
        createGroup(group, ID);
      } catch (error) {
        console.warn(error);
      }
    }

    setIsOpenModal(false);
    setGroupName("");
    setSelectedRows([]);
  };

  const onUpdateGroup = () => {
    console.log("selectedRowsMOdla", selectedRows);
    if (selectedRows.length > 0 && selectedGroupInfo?.groupId) {
      try {
        const group = {
          group_id: selectedGroupInfo?.groupId,
          clients: selectedRows.map((client: IClient) => client.nit.toString())
        };
        updateGroup(group);
      } catch (error) {
        console.warn(error);
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
          {contextHolder}
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
          title={isEditGroup ? selectedGroupInfo?.groupName : groupName}
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
              selectedClientsKeys={selectedGroupInfo?.clientsIds}
              messageContext={contextHolder}
            />
          </Flex>
        </Modal>
      )}
    </>
  );
};
