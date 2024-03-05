import { Dispatch, SetStateAction, useState } from "react";
import { Button, Flex, Typography } from "antd";
import { useForm } from "react-hook-form";
import { ArrowLineDown, ArrowLineUp, CaretLeft, Plus } from "phosphor-react";

import { InputForm } from "@/components/atoms/InputForm/InputForm";
// import { ModalChangeStatus } from "@/components/molecules/modals/ModalChangeStatus/ModalChangeStatus";

// import { ModalRemove } from "@/components/molecules/modals/ModalRemove/ModalRemove";

import "./clientprojectform.scss";
import { DocumentButton } from "@/components/atoms/DocumentButton/DocumentButton";
import { DividerCustom } from "@/components/atoms/DividerCustom/DividerCustom";
import { ShipToProjectTable } from "@/components/molecules/tables/ShipToProjectTable/ShipToProjectTable";
import { ModalCreateShipTo } from "@/components/molecules/modals/ModalCreateShipTo/ModalCreateShipTo";

const { Title } = Typography;

export type ClientType = {
  infoClient: {
    typeOfDocument: "NIT" | "Cedula" | "Pasaporte";
    idDocument: string;
    socialReason: string;
    companyName: string;
    typeOfClient: "NIT" | "Cedula" | "Pasaporte";
    holding: "NIT" | "Cedula" | "Pasaporte";
    phone: string;
    email: string;
    city: string;
    risk: string;
    periodBilling: string;
    typeRadication: string;
    conditionPay: string;
    address: string;
  };
};

interface Props {
  isViewDetailsUser?: {
    active: boolean;
    id: number;
  };
  onGoBackTable: () => void;
  setIsCreateUser: Dispatch<SetStateAction<boolean>>;
  setIsViewDetailsUser: Dispatch<
    SetStateAction<{
      active: boolean;
      id: number;
    }>
  >;
}
export const ClientProjectForm = ({
  // isViewDetailsUser,
  onGoBackTable
}: Props) => {
  // const [messageApi, contextHolder] = message.useMessage();
  // const [isEditAvailable, setIsEditAvailable] = useState(isViewDetailsUser?.active);
  const [isCreateShipTo, setisCreateShipTo] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<ClientType>({
    defaultValues: {}
    // disabled: isEditAvailable,
  });

  const onSubmitHandler = () => {};

  return (
    <>
      {/* {contextHolder} */}
      <form className="newClientProjectForm" onSubmit={handleSubmit(onSubmitHandler)}>
        <Flex vertical style={{ height: "100%" }}>
          <Flex component={"header"} className="headerNewUserProyectsForm">
            {/* -------------------left buttons------------------------ */}
            <Button
              type="text"
              size="large"
              onClick={onGoBackTable}
              className="buttonGoBack"
              icon={<CaretLeft size={"1.45rem"} />}
            >
              Ver Clientes
            </Button>
          </Flex>
          <Flex vertical component={"main"} className="mainClientForm">
            <Title level={4}>Información del usuario</Title>
            {/* -----------------------------------Informacion del Usuario--------------------------------------- */}
            <Flex component={"section"} className="generalProject">
              <InputForm
                titleInput="Tipo de Documento"
                control={control}
                nameInput="infoClient.typeOfDocument"
                error={errors.infoClient?.typeOfDocument}
              />
              <InputForm
                titleInput="No. de documento"
                control={control}
                nameInput="infoClient.idDocument"
                error={errors.infoClient?.idDocument}
              />
              <InputForm
                titleInput="Razon Social"
                control={control}
                nameInput="infoClient.socialReason"
                error={errors.infoClient?.socialReason}
              />
              <InputForm
                titleInput="Nombre de la compañía"
                control={control}
                nameInput="infoClient.socialReason"
                error={errors.infoClient?.socialReason}
              />
              <InputForm
                titleInput="Tipo de Cliente"
                control={control}
                nameInput="infoClient.typeOfClient"
                error={errors.infoClient?.typeOfClient}
              />
              <InputForm
                titleInput="Holding"
                control={control}
                nameInput="infoClient.holding"
                error={errors.infoClient?.holding}
              />
              <InputForm
                titleInput="Teléfono"
                control={control}
                nameInput="infoClient.phone"
                error={errors.infoClient?.phone}
              />
              <InputForm
                titleInput="Correo electrónico"
                control={control}
                nameInput="infoClient.email"
                error={errors.infoClient?.email}
              />
              <InputForm
                titleInput="Ciudad"
                control={control}
                nameInput="infoClient.city"
                error={errors.infoClient?.city}
              />
              <InputForm
                titleInput="Riesgo"
                control={control}
                nameInput="infoClient.risk"
                error={errors.infoClient?.risk}
              />
              <InputForm
                titleInput="Período de facturación"
                control={control}
                nameInput="infoClient.periodBilling"
                error={errors.infoClient?.periodBilling}
              />
              <InputForm
                titleInput="Tipo de radicación"
                control={control}
                nameInput="infoClient.periodBilling"
                error={errors.infoClient?.periodBilling}
              />
              <InputForm
                titleInput="Condición de pago"
                control={control}
                nameInput="infoClient.conditionPay"
                error={errors.infoClient?.conditionPay}
              />
              <InputForm
                titleInput="Ingresar dirección"
                control={control}
                nameInput="infoClient.address"
                error={errors.infoClient?.address}
              />
              {/* <InputForm
                                    titleInput="Cargo"
                                    control={control}
                                    nameInput="info.cargo"
                                    error={errors.info?.cargo}
                                />
                                <InputForm
                                    typeInput="email"
                                    titleInput="Correo electrónico"
                                    control={control}
                                    nameInput="info.email"
                                    error={errors.info?.email}
                                />
                                <InputForm
                                    typeInput="phone"
                                    titleInput="Telefono"
                                    control={control}
                                    nameInput="info.phone"
                                    error={errors.info?.phone}
                                /> */}
            </Flex>
            {/* -----------------------------------Experiencia----------------------------------- */}
            <Title level={4}>Documentos</Title>
            <Flex wrap="wrap" gap={"1rem"}>
              {[1, 23, 45, 6, 7, 8, 9].map((document) => (
                <DocumentButton key={document} fileName="Archivo1.pdf" fileSize="200KB" />
              ))}
            </Flex>
            <DividerCustom />
            <ShipToProjectTable setIsCreateShipTo={setisCreateShipTo} />
            <DividerCustom />
            <Flex gap={"1rem"} justify="flex-end">
              <Button
                type="primary"
                className="buttonOutlined"
                size="large"
                // onClick={onCreateClient}
                icon={<ArrowLineDown weight="bold" size={15} />}
              >
                Descargar plantilla
              </Button>
              <Button
                type="primary"
                className="buttonOutlined"
                size="large"
                // onClick={onCreateClient}
                icon={<ArrowLineUp weight="bold" size={15} />}
              >
                Cargar excel
              </Button>
              <Button
                type="primary"
                className="buttonNewProject"
                size="large"
                // onClick={onCreateClient}
                icon={<Plus weight="bold" size={15} />}
              >
                Registrar Usuario
              </Button>
            </Flex>
          </Flex>
          {/* ) : (
                        <Spin />
                    )} */}
        </Flex>
      </form>
      <ModalCreateShipTo isOpen={isCreateShipTo} />
    </>
  );
};
