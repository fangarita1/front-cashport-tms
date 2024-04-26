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
import { ModalBillingPeriod } from "@/components/molecules/modals/ModalBillingPeriod/ModalBillingPeriod";
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
import { SelectPaymentConditions } from "@/components/molecules/selects/clients/SelectPaymentConditions/SelectPaymentCondition";
import { SelectHoldings } from "@/components/molecules/selects/clients/SelectHoldings/SelectHoldings";
import { IBillingPeriodForm } from "@/types/billingPeriod/IBillingPeriod";

const { Title } = Typography;

export type ClientFormType = {
  infoClient: {
    document_type: string;
    nit: string;
    client_name: string;
    business_name: string;
    client_type: string;
    holding_name: string;
    phone: string;
    email: string;
    locations: any[];
    city: string;
    risk: string;
    radication_type: string;
    condition_payment: string;
    billing_period: string | IBillingPeriodForm;
  };
};
interface FileObject {
  docReference: string;
  file: File;
}

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
  const [isBillingPeriodOpen, setIsBillingPeriodOpen] = useState(false);
  const [isModalStatus, setIsModalStatus] = useState({ status: false, remove: false });
  const [isEditAvailable, setIsEditAvailable] = useState(false);
  const [dataClient, setDataClient] = useState({
    data: {},
    isLoading: false
  } as { data: IClient; isLoading: boolean });
  const [billingPeriod, setBillingPeriod] = useState<IBillingPeriodForm>();
  const [clientDocuments, setClientDocuments] = useState<FileObject[] | any[]>([]);

  const { id: idProject } = useParams<{ id: string }>();

  const dataToDataForm = (data: any) => {
    return {
      infoClient: {
        document_type: data.document_type,
        nit: data.nit,
        client_name: data.client_name,
        business_name: data.business_name,
        client_type: data.cliet_type,
        holding_name: data.holding_name || "",
        phone: data.phone,
        email: data.email,
        locations: data.locations,
        risk: data.risk,
        radication_type: data.radication_type_name,
        condition_payment: data.condition_payment,
        billing_period: data.billing_period
      }
    };
  };

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<ClientFormType>({
    disabled: !isEditAvailable,
    values: isViewDetailsClient?.active ? dataToDataForm(dataClient.data) : ({} as any)
  });

  useEffect(() => {
    (async () => {
      if (isViewDetailsClient?.id === 0) {
        setIsEditAvailable(true);
        return;
      }
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
    //   :
    //ACA HACER POST DE LA UBICACION Y CUANDO ESTÉ
    //CREADA LA UBICACION HACER POST DEL CLIENTE
    //FALSEAR LOCATION
    //await createClient(data);
    console.log(
      "Form data - billingPeriod - documents: ",
      data,
      " - ",
      billingPeriod,
      " - ",
      clientDocuments
    );
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
                      <SelectDocumentTypes
                        errors={errors.infoClient?.document_type}
                        field={field}
                      />
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
                    name="infoClient.client_type"
                    control={control}
                    rules={{ required: true, minLength: 1 }}
                    render={({ field }) => (
                      <SelectClientTypes errors={errors.infoClient?.client_type} field={field} />
                    )}
                  />
                </Flex>
                <Flex vertical className="inputContainer">
                  <Title className="inputContainer__title" level={5}>
                    Holding
                  </Title>
                  <Controller
                    name="infoClient.holding_name"
                    control={control}
                    rules={{ required: false, minLength: 1 }}
                    render={({ field }) => (
                      <SelectHoldings errors={errors.infoClient?.holding_name} field={field} />
                    )}
                  />
                </Flex>
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
                    // QWERTY
                    disabled={!isEditAvailable}
                    variant="borderless"
                    className="input"
                    placeholder="Segundo miércoles del mes"
                    onClick={() => setIsBillingPeriodOpen(true)}
                    value={
                      billingPeriod
                        ? billingPeriod.day_flag
                          ? `El dia ${billingPeriod.day}`
                          : `El ${billingPeriod.order} ${billingPeriod.day_of_week}`
                        : dataClient.data.billing_period
                    }
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
                <Flex vertical className="inputContainer">
                  <Title className="inputContainer__title" level={5}>
                    Condición de pago
                  </Title>
                  <Controller
                    name="infoClient.condition_payment"
                    control={control}
                    rules={{ required: true, minLength: 1 }}
                    render={({ field }) => {
                      return (
                        <SelectPaymentConditions errors={errors.infoClient?.risk} field={field} />
                      );
                    }}
                  />
                </Flex>
              </div>
              {/* -----------------------------------Experiencia----------------------------------- */}
              <Title level={4}>Documentos</Title>
              <Flex vertical align="flex-start">
                <Flex wrap="wrap" gap={"1rem"} style={{ width: "100%" }}>
                  {/* ACA PODRIA PINTAR UN DOCUMENT BUTTON POR CADA UNO DE LOS QUE LLEGA DEL BACK Y LOS SUBIDOS? */}
                  {[1, 23, 45].map((document) => (
                    <DocumentButton
                      key={document}
                      fileName="Archivo Subido"
                      fileSize="NA"
                      disabled
                    />
                  ))}
                </Flex>
                {isEditAvailable && (
                  <Button
                    size="large"
                    type="text"
                    className="buttonUploadDocument"
                    onClick={() => setIsUploadDocument(true)}
                    icon={<Plus weight="bold" size={15} />}
                  >
                    Cargar Documento
                  </Button>
                )}
              </Flex>
              <DividerCustom />
              <ShipToProjectTable setIsCreateShipTo={setIsCreateShipTo} />
              <DividerCustom />
              {isEditAvailable && (
                <Flex gap={"1rem"} justify="flex-end">
                  <Button
                    type="primary"
                    className="buttonNewProject"
                    htmlType={isEditAvailable ? "submit" : "button"}
                    size="large"
                    icon={<Plus weight="bold" size={15} />}
                  >
                    {isViewDetailsClient?.id ? "Actualizar cliente" : "Registrar cliente"}
                  </Button>
                </Flex>
              )}
            </Flex>
          )}
        </Flex>
      </form>
      <ModalCreateShipTo isOpen={isCreateShipTo} setIsCreateShipTo={setIsCreateShipTo} />
      <ModalUploadDocument
        isOpen={isUploadDocument}
        setIsOpenUpload={setIsUploadDocument}
        setClientDocuments={setClientDocuments}
      />
      <ModalBillingPeriod
        isOpen={isBillingPeriodOpen}
        setIsBillingPeriodOpen={setIsBillingPeriodOpen}
        setBillingPeriod={setBillingPeriod}
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
