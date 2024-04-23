import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Button, Flex, Input, Spin, Typography } from "antd";
import { Controller, useForm } from "react-hook-form";
import { ArrowsClockwise, CaretLeft, Pencil, Plus } from "phosphor-react";

import { InputForm } from "@/components/atoms/inputs/InputForm/InputForm";

import { DocumentButton } from "@/components/atoms/DocumentButton/DocumentButton";
import { DividerCustom } from "@/components/atoms/DividerCustom/DividerCustom";
import { ShipToProjectTable } from "@/components/molecules/tables/ShipToProjectTable/ShipToProjectTable";

import { ModalUploadDocument } from "@/components/molecules/modals/ModalUploadDocument/ModalUploadDocument";
import { ModalTimeFacturaction } from "@/components/molecules/modals/ModalTimeFacturaction/ModalTimeFacturaction";
import { ModalCreateShipTo } from "@/components/molecules/modals/ModalCreateShipTo/ModalCreateShipTo";
import { ModalStatusClient } from "@/components/molecules/modals/ModalStatusClient/ModalStatusClient";
import { ModalRemove } from "@/components/molecules/modals/ModalRemove/ModalRemove";

import "./clientprojectform.scss";
import { getClientById } from "@/services/clients/clients";
import { IClient } from "@/types/clients/IClients";
import { SelectRisks } from "@/components/molecules/selects/clients/SelectRisks/SelectRisks";
import { SelectDocumentTypes } from "@/components/molecules/selects/clients/SelectDocumentTypes/SelectDocumentTypes";
import { SelectClientTypes } from "@/components/molecules/selects/clients/SelectClientTypes/SelectClientTypes";
import { SelectRadicationTypes } from "@/components/molecules/selects/clients/SelectRadicationTypes/SelectRadicationTypes";
import { SelectLocations } from "@/components/molecules/selects/clients/SelectLocations/SelectLocations";

const { Title } = Typography;

export type ClientType = {
  infoClient: {
    document_type: "NIT" | "Cedula" | "Pasaporte";
    nit: string;
    client_name: string;
    business_name: string;
    cliet_type: string;
    holding_name: string;
    phone: string;
    email: string;
    locations: any[];
    city: string;
    risk: string;
    periodBilling: string;
    radication_type: string;
    conditionPay: string;
    address: string;
  };
};

interface Props {
  isViewDetailsClient: {
    active: boolean;
    id: number;
  };
  onGoBackTable: () => void;
  setIsViewDetailsClient: Dispatch<
    SetStateAction<{
      active: boolean;
      id: number;
    }>
  >;
  setIsCreateClient: Dispatch<SetStateAction<boolean>>;
}
export const ClientProjectForm = ({ onGoBackTable, isViewDetailsClient }: Props) => {
  const [isCreateShipTo, setIsCreateShipTo] = useState(false);
  const [isUploadDocument, setIsUploadDocument] = useState(false);
  const [isTimeFacturaction, setIsTimeFacturaction] = useState(false);
  const [isModalStatus, setIsModalStatus] = useState({ status: false, remove: false });
  const [isEditAvailable, setIsEditAvailable] = useState(false);
  const [dataClient, setDataClient] = useState({
    data: {},
    isLoading: false
  } as { data: IClient; isLoading: boolean });

  const { id: idProject } = useParams<{ id: string }>();

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<ClientType>({
    disabled: !isEditAvailable,
    values: isViewDetailsClient?.active ? { infoClient: { ...dataClient.data } } : ({} as any)
  });

  useEffect(() => {
    (async () => {
      if (isViewDetailsClient?.id === 0) return;
      setDataClient({
        isLoading: true,
        data: {} as IClient
      });
      const response = await getClientById(isViewDetailsClient.id.toString(), idProject);
      const finalData = response.data.data;

      setDataClient({
        isLoading: false,
        data: finalData
      });
    })();
  }, [isViewDetailsClient, idProject]);

  console.log("RAW dataClient: ", dataClient);

  const onSubmitHandler = async (data: any) => {
    //ACA SE HARIA EL POST DE UN NUEVO CLIENTE Y EL EDIT
    // const response = isViewDetailsClient?.id
    //   ? () => {
    //       //La funcion para hacer PUT de un cliente
    //       return null;
    //     }
    //   : await createClient(data);
    console.log("Form data: ", data);
  };

  return (
    <>
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
            {isViewDetailsClient?.id > 0 && (
              <Flex gap="1.5rem">
                <Button
                  size="large"
                  htmlType="button"
                  className="buttonOutlined"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsModalStatus({ status: true, remove: false });
                  }}
                  icon={<ArrowsClockwise size={"1.45rem"} />}
                >
                  Cambiar Estado
                </Button>
                <Button
                  size="large"
                  onClick={() => {
                    setIsEditAvailable(true);
                  }}
                  className="buttonOutlined"
                  htmlType={isEditAvailable ? "submit" : "button"}
                  icon={<Pencil size={"1.45rem"} />}
                >
                  Editar Cliente
                </Button>
              </Flex>
            )}
          </Flex>
          {dataClient.isLoading ? (
            <Spin />
          ) : (
            <Flex vertical component={"main"} className="mainClientForm">
              <Title level={4}>Información del usuario</Title>
              {/* -----------------------------------Informacion del Cliente--------------------------------------- */}
              <div className="generalProject">
                <Flex vertical className="inputContainer">
                  <Title className="inputContainer__title" level={5}>
                    Tipo de documento
                  </Title>
                  <Controller
                    name="infoClient.document_type"
                    control={control}
                    rules={{ required: true, minLength: 1 }}
                    render={({ field }) => (
                      <SelectDocumentTypes errors={errors.infoClient?.risk} field={field} />
                    )}
                  />
                </Flex>
                <InputForm
                  titleInput="No. de documento"
                  control={control}
                  nameInput="infoClient.nit"
                  error={errors.infoClient?.nit}
                />
                <InputForm
                  titleInput="Razon Social"
                  control={control}
                  nameInput="infoClient.client_name"
                  error={errors.infoClient?.client_name}
                />
                <InputForm
                  titleInput="Nombre de la compañía"
                  control={control}
                  nameInput="infoClient.business_name"
                  error={errors.infoClient?.business_name}
                />
                <Flex vertical className="inputContainer">
                  <Title className="inputContainer__title" level={5}>
                    Tipo de cliente
                  </Title>
                  <Controller
                    name="infoClient.cliet_type"
                    control={control}
                    rules={{ required: true, minLength: 1 }}
                    render={({ field }) => (
                      <SelectClientTypes errors={errors.infoClient?.risk} field={field} />
                    )}
                  />
                </Flex>
                <InputForm
                  titleInput="Holding"
                  control={control}
                  nameInput="infoClient.holding_name"
                  error={errors.infoClient?.holding_name}
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
                <Flex vertical className="inputContainer">
                  <Title className="inputContainer__title" level={5}>
                    Ciudad
                  </Title>
                  <Controller
                    name="infoClient.locations"
                    control={control}
                    rules={{ required: true, minLength: 1 }}
                    render={({ field }) => {
                      return (
                        <SelectLocations errors={errors.infoClient?.locations} field={field} />
                      );
                    }}
                  />
                </Flex>
                <Flex vertical className="inputContainer">
                  <Title className="inputContainer__title" level={5}>
                    Riesgo
                  </Title>
                  <Controller
                    name="infoClient.risk"
                    control={control}
                    rules={{ required: true, minLength: 1 }}
                    render={({ field }) => (
                      <SelectRisks errors={errors.infoClient?.risk} field={field} />
                    )}
                  />
                </Flex>
                <Flex
                  className="inputContainer"
                  vertical
                  style={{ width: "24.5%" }}
                  justify="center"
                >
                  <Title className="inputContainer__title" level={5}>
                    Período de facturación
                  </Title>
                  <Input
                    variant="borderless"
                    className="input"
                    placeholder="Segundo miércoles del mes"
                    onClick={() => setIsTimeFacturaction(true)}
                    value={dataClient.data.billing_period}
                  />
                </Flex>
                <Flex vertical className="inputContainer">
                  <Title className="inputContainer__title" level={5}>
                    Tipo de radicación
                  </Title>
                  <Controller
                    name="infoClient.radication_type"
                    control={control}
                    rules={{ required: true, minLength: 1 }}
                    render={({ field }) => (
                      <SelectRadicationTypes errors={errors.infoClient?.risk} field={field} />
                    )}
                  />
                </Flex>
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
              </div>
              {/* -----------------------------------Experiencia----------------------------------- */}
              <Title level={4}>Documentos</Title>
              <Flex vertical align="flex-start">
                <Flex wrap="wrap" gap={"1rem"} style={{ width: "100%" }}>
                  {[1, 23, 45, 6, 7, 8, 9].map((document) => (
                    <DocumentButton key={document} fileName="Archivo1.pdf" fileSize="200KB" />
                  ))}
                </Flex>
                <Button
                  size="large"
                  type="text"
                  className="buttonUploadDocument"
                  onClick={() => setIsUploadDocument(true)}
                  icon={<Plus weight="bold" size={15} />}
                >
                  Cargar Documento
                </Button>
              </Flex>
              <DividerCustom />
              <ShipToProjectTable setIsCreateShipTo={setIsCreateShipTo} />
              <DividerCustom />
              <Flex gap={"1rem"} justify="flex-end">
                <Button
                  type="primary"
                  className="buttonNewProject"
                  htmlType={isEditAvailable ? "submit" : "button"}
                  size="large"
                  icon={<Plus weight="bold" size={15} />}
                >
                  Registrar Usuario
                </Button>
              </Flex>
            </Flex>
          )}
        </Flex>
      </form>
      <ModalCreateShipTo isOpen={isCreateShipTo} setIsCreateShipTo={setIsCreateShipTo} />
      <ModalUploadDocument isOpen={isUploadDocument} setIsOpenUpload={setIsUploadDocument} />
      <ModalTimeFacturaction
        isOpen={isTimeFacturaction}
        setIsTimeFacturaction={setIsTimeFacturaction}
      />
      <ModalStatusClient isOpen={isModalStatus.status} setIsStatusClient={setIsModalStatus} />
      <ModalRemove
        name="cliente"
        isOpen={isModalStatus.remove}
        onClose={() => setIsModalStatus((s) => ({ ...s, remove: false }))}
        onRemove={() => {}}
      />
    </>
  );
};
