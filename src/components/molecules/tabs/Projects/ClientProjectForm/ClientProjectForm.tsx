import {
  Dispatch,
  JSXElementConstructor,
  ReactElement,
  SetStateAction,
  useEffect,
  useState
} from "react";
import { useParams } from "next/navigation";
import { Button, Col, Flex, Input, Row, Spin, Typography } from "antd";
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
import {
  createClient,
  deleteClientById,
  getClientById,
  updateClient
} from "@/services/clients/clients";
import { IClient } from "@/types/clients/IClients";
import { SelectRisks } from "@/components/molecules/selects/clients/SelectRisks/SelectRisks";
import { SelectDocumentTypes } from "@/components/molecules/selects/clients/SelectDocumentTypes/SelectDocumentTypes";
import { SelectClientTypes } from "@/components/molecules/selects/clients/SelectClientTypes/SelectClientTypes";
import { SelectRadicationTypes } from "@/components/molecules/selects/clients/SelectRadicationTypes/SelectRadicationTypes";
import { SelectPaymentConditions } from "@/components/molecules/selects/clients/SelectPaymentConditions/SelectPaymentCondition";
import { SelectHoldings } from "@/components/molecules/selects/clients/SelectHoldings/SelectHoldings";
import { IBillingPeriodForm } from "@/types/billingPeriod/IBillingPeriod";
import { createLocation } from "@/services/locations/locations";
import { stringBasedOnDocumentType } from "@/utils/utils";
import { MessageInstance } from "antd/es/message/interface";

const { Title } = Typography;

export type ClientFormType = {
  infoClient: {
    address: string;
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
    billing_period: string;
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
  messageApi: MessageInstance;
  messageContext?: ReactElement<any, string | JSXElementConstructor<any>>;
}
export const ClientProjectForm = ({
  onGoBackTable,
  isViewDetailsClient,
  setIsViewDetailsClient,
  setIsCreateClient,
  messageApi,
  messageContext
}: Props) => {
  const [isCreateShipTo, setIsCreateShipTo] = useState(false);
  const [isUploadDocument, setIsUploadDocument] = useState(false);
  const [isBillingPeriodOpen, setIsBillingPeriodOpen] = useState(false);
  const [isModalStatus, setIsModalStatus] = useState({ status: false, remove: false });
  const [isEditAvailable, setIsEditAvailable] = useState(false);
  const [dataClient, setDataClient] = useState({
    data: {},
    isLoading: false
  } as { data: IClient; isLoading: boolean });
  const [billingPeriod, setBillingPeriod] = useState<IBillingPeriodForm | undefined>();
  const [clientDocuments, setClientDocuments] = useState<File[] | any[]>([]);
  // const [messageApi, contextHolder] = message.useMessage();

  const { id: idProject } = useParams<{ id: string }>();

  const dataToDataForm = (data: any) => {
    return {
      infoClient: {
        address:
          Array.isArray(data?.locations) && data.locations.length > 0
            ? data?.locations[0]?.address
            : undefined,
        city:
          Array.isArray(data?.locations) && data.locations.length > 0
            ? data.locations[0]?.city
            : undefined,
        document_type: stringBasedOnDocumentType(data.document_type),
        nit: data.nit,
        client_name: data.client_name,
        business_name: data.business_name,
        client_type: `${data.client_type_id} - ${data.cliet_type}`,
        holding_name: data.holding_id ? `${data.holding_id} - ${data.holding_name}` : undefined,
        phone: data.phone,
        email: data.email,
        locations: data.locations,
        risk: data.risk,
        radication_type: `${data.radication_type} - ${data.radication_type_name}`,
        condition_payment: `${data.condition_payment_id} - ${data.condition_payment} días`,
        billing_period: data.billing_period,
        documents: data.documents
      }
    };
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<ClientFormType>({
    disabled: !isEditAvailable,
    values: isViewDetailsClient?.active ? dataToDataForm(dataClient.data) : ({} as any)
  });

  useEffect(() => {
    // UseEffect para actualizar el valor de billingPeriod
    if (!billingPeriod) {
      setValue("infoClient.billing_period", dataClient.data.billing_period);
      return;
    }

    const formattedBillingPeriod = billingPeriod.day_flag
      ? `El dia ${billingPeriod.day} del mes`
      : `El ${billingPeriod.order} ${billingPeriod.day_of_week} del mes`;

    // Establecer el valor formateado al string de billing period
    setValue("infoClient.billing_period", formattedBillingPeriod, { shouldValidate: true });
  }, [billingPeriod, setValue, dataClient.data.billing_period]);

  useEffect(() => {
    // UseEffect para dar un valor a dataClient, para pintar el form
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
      setClientDocuments(finalData.documents);
    })();
  }, [isViewDetailsClient, idProject]);

  const onSubmitHandler = async (data: any) => {
    // Si hay un client id estamos editando un cliente de lo contrario estamos creando un cliente
    if (isViewDetailsClient?.id) {
      const locationResponse = await createLocation(data.infoClient, isViewDetailsClient?.id);
      const response = await updateClient(
        idProject,
        isViewDetailsClient?.id,
        data,
        locationResponse,
        billingPeriod
      );

      if (response.status === 200 || response.status === 202) {
        setIsEditAvailable(false);
        messageApi.open({
          type: "success",
          content: `El cliente fue editado exitosamente.`
        });
      } else if (response.response.status === 400) {
        messageApi.open({
          type: "error",
          content: "Algo salio mal con los datos subidos."
        });
      } else {
        messageApi.open({
          type: "error",
          content: "Oops ocurrio un error."
        });
      }
    } else {
      const locationResponse = await createLocation(data.infoClient, isViewDetailsClient?.id);

      if (billingPeriod) {
        const response = await createClient(
          idProject,
          data,
          billingPeriod,
          clientDocuments,
          locationResponse
        );

        if (response.status === 200) {
          setIsCreateClient(false);

          messageApi.open({
            type: "success",
            content: `El cliente fue creado exitosamente.`
          });
        } else {
          messageApi.open({
            type: "error",
            content: "Oops ocurrió un error."
          });
        }
      }
    }
  };

  const onDeleteClient = async () => {
    if (isViewDetailsClient?.id) {
      await deleteClientById(isViewDetailsClient?.id, idProject, messageApi, () =>
        setIsViewDetailsClient({ active: false, id: 0 })
      );
    }
  };

  return (
    <>
      {messageContext}
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
                    setIsEditAvailable(!isEditAvailable);
                  }}
                  className="buttonOutlined"
                  htmlType="button"
                  icon={<Pencil size={"1.45rem"} />}
                >
                  {isEditAvailable ? "Cancelar" : "Editar Cliente"}
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
                  disabled={isViewDetailsClient.id && isEditAvailable ? true : false}
                />
                <InputForm
                  titleInput="Razon Social"
                  control={control}
                  nameInput="infoClient.client_name"
                  error={errors.infoClient?.client_name}
                  disabled={isViewDetailsClient.id && isEditAvailable ? true : false}
                />
                <InputForm
                  titleInput="Nombre de la compañía"
                  control={control}
                  nameInput="infoClient.business_name"
                  error={errors.infoClient?.business_name}
                  disabled={isViewDetailsClient.id && !isEditAvailable ? true : false}
                />
                <Flex vertical className="inputContainer">
                  <Title className="inputContainer__title" level={5}>
                    Tipo de cliente
                  </Title>
                  <Controller
                    name="infoClient.client_type"
                    control={control}
                    rules={{ required: true, minLength: 1 }}
                    disabled={isViewDetailsClient.id && isEditAvailable ? true : false}
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
                <InputForm
                  titleInput="Ciudad"
                  control={control}
                  nameInput="infoClient.city"
                  error={errors.infoClient?.city}
                />
                <InputForm
                  titleInput="Dirección"
                  control={control}
                  nameInput="infoClient.address"
                  error={errors.infoClient?.address}
                />
                <Flex vertical className="inputContainer">
                  <Title className="inputContainer__title" level={5}>
                    Riesgo
                  </Title>
                  <Controller
                    name="infoClient.risk"
                    control={control}
                    rules={{ required: true, minLength: 1 }}
                    disabled={isViewDetailsClient.id && isEditAvailable ? true : false}
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
                  <Controller
                    name="infoClient.billing_period"
                    control={control}
                    rules={{ required: true, minLength: 1 }}
                    render={({ field, fieldState: { error } }) => (
                      <>
                        <Input
                          disabled={!isEditAvailable}
                          variant="borderless"
                          className={error ? "inputError" : "input"}
                          placeholder="Segundo miércoles del mes"
                          onClick={() => setIsBillingPeriodOpen(true)}
                          {...field}
                          value={
                            billingPeriod
                              ? billingPeriod.day_flag
                                ? `El dia ${billingPeriod.day} del mes`
                                : `El ${billingPeriod.order} ${billingPeriod.day_of_week} del mes`
                              : dataClient.data.billing_period
                                ? dataClient.data.billing_period
                                : undefined
                          }
                        />
                        {error && (
                          <Typography.Text className="textError">
                            El Periodo de facturacion es obligatorio *
                          </Typography.Text>
                        )}
                      </>
                    )}
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
                <Row className="clientDocuments" gutter={16}>
                  {clientDocuments?.map((document, index) => (
                    <Col key={`${index}${document.name}`} span={6}>
                      <DocumentButton fileName={document.name} fileSize={document.size} disabled />
                    </Col>
                  ))}
                </Row>
                {!isViewDetailsClient.id && isEditAvailable ? (
                  <Button
                    size="large"
                    type="text"
                    className="buttonUploadDocument"
                    onClick={() => setIsUploadDocument(true)}
                    icon={<Plus weight="bold" size={15} />}
                  >
                    Cargar Documento
                  </Button>
                ) : null}
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
        onRemove={onDeleteClient}
      />
    </>
  );
};
